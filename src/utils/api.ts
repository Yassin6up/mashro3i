'use client'

import { API_BASE_URL } from '@/lib/utils'
import { authStorage, storage } from '@/utils/helpers'
import { STORAGE_KEYS } from '@/constants'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: any
  isFormData?: boolean
  auth?: boolean
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`
  const headers: Record<string, string> = options.headers ? { ...options.headers } : {}

  if (options.auth) {
    const token = authStorage.getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  let body: BodyInit | undefined
  if (options.isFormData && options.body instanceof FormData) {
    body = options.body
  } else if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(options.body)
  }

  let res: Response
  try {
    res = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body,
      credentials: 'omit',
      mode: 'cors'
    })
  } catch (networkErr: any) {
    // Surface more helpful diagnostics during development
    // eslint-disable-next-line no-console
    console.error('Network error when calling API:', { url, method: options.method || 'GET', headers, isFormData: !!options.isFormData, auth: !!options.auth, error: networkErr?.message })
    throw new Error(`Failed to connect to API. Please check your internet, API_BASE_URL, and CORS. (${networkErr?.message || 'network error'})`)
  }

  if (!res.ok) {
    let errText = 'Request failed'
    try {
      const data = await res.json()
      errText = data?.message || data?.error || errText
    } catch {
      try {
        const text = await res.text()
        if (text) errText = text
      } catch {}
    }
    throw new Error(errText)
  }

  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return (await res.json()) as T
  }
  // @ts-expect-error allow unknown response type
  return undefined
}

export const authApi = {
  login: async (email: string, password: string) => {
    type LoginResponse = { success: boolean; message?: string; data?: { user: any; token: string } }
    const resp = await request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: { email, password }
    })

    if (!resp?.success || !resp?.data?.token) throw new Error(resp?.message || 'Login failed')

    authStorage.setToken(resp.data.token)
    storage.set(STORAGE_KEYS.USER_DATA, resp.data.user)
    return resp.data
  },

  profile: async () => {
    type ProfileResponse = { success: boolean; data: any }
    const resp = await request<ProfileResponse>('/auth/profile', { auth: true })
    if (!resp?.success) throw new Error('Failed to load profile')
    storage.set(STORAGE_KEYS.USER_DATA, resp.data)
    return resp.data
  },

  updateProfile: async (formData: FormData) => {
    type UpdateResponse = { success: boolean; data: any; message?: string }
    const resp = await request<UpdateResponse>('/auth/profile', {
      method: 'PUT',
      isFormData: true,
      body: formData,
      auth: true
    })
    if (!resp?.success) throw new Error(resp?.message || 'Failed to update profile')
    storage.set(STORAGE_KEYS.USER_DATA, resp.data)
    return resp.data
  },

  registerSeller: async (payload: {
    full_name: string
    phone: string
    email: string
    password: string
    programming_skills: string[]
    self_description: string
    country: string
    profile_picture?: File | null
  }) => {
    const fd = new FormData()
    fd.append('full_name', payload.full_name)
    fd.append('phone', payload.phone)
    fd.append('email', payload.email)
    fd.append('password', payload.password)
    fd.append('country', payload.country)
    fd.append('self_description', payload.self_description)
    // Many backends expect repeated keys without []
    payload.programming_skills.forEach(skill => fd.append('programming_skills', skill))
    if (payload.profile_picture) fd.append('profile_picture', payload.profile_picture)

    type RegisterResponse = { success: boolean; message?: string; data?: { user: any; token: string } }
    const resp = await request<RegisterResponse>('/auth/register/seller', {
      method: 'POST',
      isFormData: true,
      body: fd
    })
    if (!resp?.success || !resp?.data?.token) throw new Error(resp?.message || 'Registration failed')
    authStorage.setToken(resp.data.token)
    storage.set(STORAGE_KEYS.USER_DATA, resp.data.user)
    return resp.data
  },

  registerCustomer: async (payload: {
    full_name: string
    phone: string
    email: string
    password: string
    programming_interests: string[]
    country: string
    profile_picture?: File | null
  }) => {
    const fd = new FormData()
    fd.append('full_name', payload.full_name)
    fd.append('phone', payload.phone)
    fd.append('email', payload.email)
    fd.append('password', payload.password)
    fd.append('country', payload.country)
    // Many backends expect repeated keys without []
    payload.programming_interests.forEach(s => fd.append('programming_interests', s))
    if (payload.profile_picture) fd.append('profile_picture', payload.profile_picture)

    type RegisterResponse = { success: boolean; message?: string; data?: { user: any; token: string } }
    const resp = await request<RegisterResponse>('/auth/register/customer', {
      method: 'POST',
      isFormData: true,
      body: fd
    })
    if (!resp?.success || !resp?.data?.token) throw new Error(resp?.message || 'Registration failed')
    authStorage.setToken(resp.data.token)
    storage.set(STORAGE_KEYS.USER_DATA, resp.data.user)
    return resp.data
  },

  logout: () => {
    authStorage.clear()
  }
}

export const projectsApi = {
  create: async (formData: FormData) => {
    type CreateProjectResponse = { success: boolean; message?: string; data?: any }
    const resp = await request<CreateProjectResponse>('/projects', {
      method: 'POST',
      isFormData: true,
      body: formData,
      auth: true
    })
    if (!resp?.success) throw new Error(resp?.message || 'Failed to create project')
    return resp.data
  },

  getAll: async (filters?: { category?: string; min_price?: number; max_price?: number; is_profitable?: boolean; search?: string }) => {
    const params = new URLSearchParams()
    if (filters?.category) params.append('category', filters.category)
    if (filters?.min_price) params.append('min_price', filters.min_price.toString())
    if (filters?.max_price) params.append('max_price', filters.max_price.toString())
    if (filters?.is_profitable !== undefined) params.append('is_profitable', filters.is_profitable.toString())
    if (filters?.search) params.append('search', filters.search)
    
    const queryString = params.toString() ? `?${params.toString()}` : ''
    type ProjectsResponse = { success: boolean; data: any[] }
    const resp = await request<ProjectsResponse>(`/projects${queryString}`)
    if (!resp?.success) throw new Error('Failed to load projects')
    return resp.data
  },

  getById: async (id: string | number) => {
    type ProjectResponse = { success: boolean; data: any }
    const resp = await request<ProjectResponse>(`/projects/${id}`)
    if (!resp?.success) throw new Error('Failed to load project')
    return resp.data
  },

  update: async (id: string | number, formData: FormData) => {
    type UpdateProjectResponse = { success: boolean; message?: string; data?: any }
    const resp = await request<UpdateProjectResponse>(`/projects/${id}`, {
      method: 'PUT',
      isFormData: true,
      body: formData,
      auth: true
    })
    if (!resp?.success) throw new Error(resp?.message || 'Failed to update project')
    return resp.data
  },

  delete: async (id: string | number) => {
    type DeleteProjectResponse = { success: boolean; message?: string }
    const resp = await request<DeleteProjectResponse>(`/projects/${id}`, {
      method: 'DELETE',
      auth: true
    })
    if (!resp?.success) throw new Error(resp?.message || 'Failed to delete project')
    return resp
  },

  getMyProjects: async () => {
    type MyProjectsResponse = { success: boolean; data: any[] }
    const resp = await request<MyProjectsResponse>('/projects/seller/my-projects', {
      auth: true
    })
    if (!resp?.success) throw new Error('Failed to load your projects')
    return resp.data
  }
}

export type { RequestOptions }

