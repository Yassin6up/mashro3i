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
  login: async (email: string, password: string, rememberMe: boolean = false) => {
    type LoginResponse = { success: boolean; message?: string; data?: { user: any; token: string } }
    const resp = await request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: { email, password, rememberMe }
    })

    if (!resp?.success || !resp?.data?.token) throw new Error(resp?.message || 'Login failed')

    authStorage.setToken(resp.data.token)
    storage.set(STORAGE_KEYS.USER_DATA, resp.data.user)
    
    // حفظ حالة "تذكرني" للحفاظ على الجلسة
    if (rememberMe) {
      storage.set('remember_me', true)
    } else {
      storage.remove('remember_me')
    }
    
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

export const offersApi = {
  create: async (projectId: number, amount: number, message?: string) => {
    type CreateOfferResponse = { success: boolean; message?: string; data?: any }
    const resp = await request<CreateOfferResponse>('/offers', {
      method: 'POST',
      auth: true,
      body: { project_id: projectId, amount, message }
    })
    if (!resp?.success) throw new Error(resp?.message || 'Failed to create offer')
    return resp.data
  },

  getMyOffers: async () => {
    type MyOffersResponse = { success: boolean; data: any[] }
    const resp = await request<MyOffersResponse>('/offers/my-offers', { auth: true })
    if (!resp?.success) throw new Error('Failed to load offers')
    return resp.data
  },

  getById: async (id: number) => {
    type OfferResponse = { success: boolean; data: any }
    const resp = await request<OfferResponse>(`/offers/${id}`, { auth: true })
    if (!resp?.success) throw new Error('Failed to load offer')
    return resp.data
  },

  accept: async (id: number) => {
    type AcceptResponse = { success: boolean; message?: string; data?: any }
    const resp = await request<AcceptResponse>(`/offers/${id}/accept`, {
      method: 'PUT',
      auth: true
    })
    if (!resp?.success) throw new Error(resp?.message || 'Failed to accept offer')
    return resp.data
  },

  counter: async (id: number, newAmount: number, message?: string) => {
    type CounterResponse = { success: boolean; message?: string; data?: any }
    const resp = await request<CounterResponse>(`/offers/${id}/counter`, {
      method: 'PUT',
      auth: true,
      body: { new_amount: newAmount, message }
    })
    if (!resp?.success) throw new Error(resp?.message || 'Failed to send counter offer')
    return resp.data
  },

  reject: async (id: number) => {
    type RejectResponse = { success: boolean; message?: string }
    const resp = await request<RejectResponse>(`/offers/${id}/reject`, {
      method: 'PUT',
      auth: true
    })
    if (!resp?.success) throw new Error(resp?.message || 'Failed to reject offer')
    return resp
  }
}

export const transactionsApi = {
  create: async (offerId: number, paymentMethod: string) => {
    type CreateTransactionResponse = { success: boolean; message?: string; data?: any }
    const resp = await request<CreateTransactionResponse>('/transactions', {
      method: 'POST',
      auth: true,
      body: { offer_id: offerId, payment_method: paymentMethod }
    })
    if (!resp?.success) throw new Error(resp?.message || 'Failed to create transaction')
    return resp.data
  },

  uploadFiles: async (transactionId: number, files: FormData) => {
    type UploadResponse = { success: boolean; message?: string; data?: any }
    const resp = await request<UploadResponse>(`/transactions/${transactionId}/upload-files`, {
      method: 'POST',
      auth: true,
      isFormData: true,
      body: files
    })
    if (!resp?.success) throw new Error(resp?.message || 'Failed to upload files')
    return resp.data
  },

  review: async (transactionId: number, status: string, feedback?: string) => {
    type ReviewResponse = { success: boolean; message?: string; data?: any }
    const resp = await request<ReviewResponse>(`/transactions/${transactionId}/review`, {
      method: 'POST',
      auth: true,
      body: { status, feedback }
    })
    if (!resp?.success) throw new Error(resp?.message || 'Failed to review transaction')
    return resp.data
  },

  getMyTransactions: async () => {
    type TransactionsResponse = { success: boolean; data: any[] }
    const resp = await request<TransactionsResponse>('/transactions/my-transactions', { auth: true })
    if (!resp?.success) throw new Error('Failed to load transactions')
    return resp.data
  },

  getById: async (id: number) => {
    type TransactionResponse = { success: boolean; data: any }
    const resp = await request<TransactionResponse>(`/transactions/${id}`, { auth: true })
    if (!resp?.success) throw new Error('Failed to load transaction')
    return resp.data
  }
}

export const withdrawalsApi = {
  getBalance: async () => {
    type BalanceResponse = { success: boolean; data: any }
    const resp = await request<BalanceResponse>('/withdrawals/balance', { auth: true })
    if (!resp?.success) throw new Error('Failed to load balance')
    return resp.data
  },

  requestWithdrawal: async (amount: number, methodId: number, accountDetails: string) => {
    type WithdrawalResponse = { success: boolean; message?: string; data?: any }
    const resp = await request<WithdrawalResponse>('/withdrawals/request', {
      method: 'POST',
      auth: true,
      body: { amount, withdrawal_method_id: methodId, account_details: accountDetails }
    })
    if (!resp?.success) throw new Error(resp?.message || 'Failed to request withdrawal')
    return resp.data
  },

  getMyWithdrawals: async () => {
    type WithdrawalsResponse = { success: boolean; data: any[] }
    const resp = await request<WithdrawalsResponse>('/withdrawals/my-withdrawals', { auth: true })
    if (!resp?.success) throw new Error('Failed to load withdrawals')
    return resp.data
  },

  getMethods: async () => {
    type MethodsResponse = { success: boolean; data: any[] }
    const resp = await request<MethodsResponse>('/withdrawals/methods', { auth: true })
    if (!resp?.success) throw new Error('Failed to load withdrawal methods')
    return resp.data
  }
}

export const notificationsApi = {
  getNotifications: async () => {
    type NotificationsResponse = { success: boolean; data: any[] }
    const resp = await request<NotificationsResponse>('/notifications', { auth: true })
    if (!resp?.success) throw new Error('Failed to load notifications')
    return resp.data
  },

  getUnreadCount: async () => {
    type CountResponse = { success: boolean; data: { count: number } }
    const resp = await request<CountResponse>('/notifications/unread-count', { auth: true })
    if (!resp?.success) throw new Error('Failed to load unread count')
    return resp.data
  },

  markAsRead: async (id: number) => {
    type ReadResponse = { success: boolean; data: any }
    const resp = await request<ReadResponse>(`/notifications/${id}/read`, {
      method: 'PUT',
      auth: true
    })
    if (!resp?.success) throw new Error('Failed to mark notification as read')
    return resp.data
  },

  markAllAsRead: async () => {
    type ReadAllResponse = { success: boolean; message: string }
    const resp = await request<ReadAllResponse>('/notifications/mark-all-read', {
      method: 'PUT',
      auth: true
    })
    if (!resp?.success) throw new Error('Failed to mark all notifications as read')
    return resp
  },

  deleteNotification: async (id: number) => {
    type DeleteResponse = { success: boolean; message: string }
    const resp = await request<DeleteResponse>(`/notifications/${id}`, {
      method: 'DELETE',
      auth: true
    })
    if (!resp?.success) throw new Error('Failed to delete notification')
    return resp
  }
}

export const messagesApi = {
  getConversations: async () => {
    type ConversationsResponse = { success: boolean; data: any[] }
    const resp = await request<ConversationsResponse>('/chat/conversations', { auth: true })
    if (!resp?.success) throw new Error('Failed to load conversations')
    return resp.data
  },

  getMessages: async (otherUserId: number) => {
    type MessagesResponse = { success: boolean; data: any[] }
    const resp = await request<MessagesResponse>(`/chat/messages/${otherUserId}`, { auth: true })
    if (!resp?.success) throw new Error('Failed to load messages')
    return resp.data
  },

  sendMessage: async (receiver_id: number, message: string, transaction_id?: number) => {
    type SendResponse = { success: boolean; data: any }
    const resp = await request<SendResponse>('/chat/send', {
      method: 'POST',
      body: { receiver_id, message, transaction_id },
      auth: true
    })
    if (!resp?.success) throw new Error('Failed to send message')
    return resp.data
  }
}

export type { RequestOptions }

