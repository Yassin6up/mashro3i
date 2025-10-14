// Placeholder hook for authentication
"use client";

import { createContext, useContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { User } from '@/types';
import { authApi } from '@/utils/api';
import { storage, authStorage } from '@/utils/helpers';
import { STORAGE_KEYS } from '@/constants';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  registerSeller: (payload: any) => Promise<any>;
  registerCustomer: (payload: any) => Promise<any>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const bootstrap = useCallback(async () => {
    try {
      const cached = storage.get<User>(STORAGE_KEYS.USER_DATA);
      if (cached) setUser(cached);
      // Refresh profile only if token exists to avoid 401 noise
      const token = authStorage.getToken();
      if (token) {
        await authApi.profile().then(setUser).catch(() => {});
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const login = useCallback(async (email: string, password: string) => {
    const { user } = await authApi.login(email, password);
    setUser(user);
    return user;
  }, []);

  const registerSeller = useCallback(async (payload: any) => {
    const { user } = await authApi.registerSeller(payload);
    setUser(user);
    return user;
  }, []);

  const registerCustomer = useCallback(async (payload: any) => {
    const { user } = await authApi.registerCustomer(payload);
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
  }, []);

  const value: AuthContextType = useMemo(() => ({ user, login, registerSeller, registerCustomer, logout, isLoading }), [user, login, registerSeller, registerCustomer, logout, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}