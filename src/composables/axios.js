import axios from 'axios'
import { useUserStore } from '@/store/user'

const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})

apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  config.headers.Authorization = 'Bearer ' + user.token
  return config
})

apiAuth.interceptors.response.use((res) => {
  return res
}, (error) => {
  if (error.response) {
    if (error.response.data.message === 'JWT 過期' && error.config.url !== '/users/extend') {
      const user = useUserStore()
      return apiAuth.patch('/users/extend')
        .then(({ data }) => {
          user.token = data.result
          error.config.headers.Authorization = 'Bearer ' + user.token
          return axios(error.config)
        })
        .catch(() => {
          user.logout()
          return Promise.reject(error)
        })
    }
  }
  return Promise.reject(error)
})

export const useApi = () => {
  return { api, apiAuth }
}
