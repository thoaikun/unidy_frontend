import api from "@/service/api"
import api_v2 from "@/service/api-v2"
import { AxiosRequestConfig } from "axios"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"

// type Method = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'

const useApi = <T>(path: string, config: AxiosRequestConfig, autoload: boolean = true, numRetries: number = 1, version: number = 1) => {
  const [params, setParams] = useState(config.params)
  const available = useRef<boolean>(autoload)
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const instance = (() => {
    switch (version) {
      case 1:
        return api
      case 2:
        return api_v2
      default:
        return api
    }
  })()

  const getData = useCallback(async () => {
    for (let turn = 0; turn < numRetries; turn += 1) {
      try {
        const response = await instance.get(path, { ...config, params })
        setData(response.data)
        setIsLoading(false)
        return response.data
      }
      catch (error: any) {
        toast.error(error?.data?.error)
      }
    }
  }, [numRetries, instance, path, config, params])

  useEffect(() => {
    (async () => {
      if (available.current) {
        setIsLoading(true)
        await getData()
      }
      else {
        available.current = true
      }
    })()
  }, [params])

  return {
    isLoading,
    data,
    getData,
    params,
    setParams,
  }
}

export default useApi