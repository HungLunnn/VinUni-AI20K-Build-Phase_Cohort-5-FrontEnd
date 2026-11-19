import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
})

// Token gắn với tài khoản; vai trò do backend kiểm tra ở API (US-13)
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('dd_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})
