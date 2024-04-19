import axios from "axios";
import { getCookie } from "cookies-next";

const api_v2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_V2,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api_v2.interceptors.request.use(
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

api_v2.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

export default api_v2