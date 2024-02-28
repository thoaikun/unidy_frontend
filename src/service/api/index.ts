import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const access_token = getCookie('access_token')
    if (access_token) {
      config.headers.Authorization = 'Bearer ' + access_token
    }
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

export default api