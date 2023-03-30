import moment from 'moment'
import { useEffect, useState } from 'react'
import { request } from 'services'
/* 
    fetchProps is a Object 
    If missing key or fetchProps, hook will return null
*/
function useLocalData(key, fetchProps) {
  const [data, setData] = useState(null)
  useEffect(() => {
    if ((key, fetchProps)) {
      const dataLocal = localStorage.getItem(key)
      const currentTime = moment().valueOf()
      if (dataLocal && currentTime - dataLocal.createdAt <= 5 * 60 * 1000) {
        setData(dataLocal.data)
      } else {
        fetchData(currentTime)
      }
    }
  }, [key, fetchProps])

  const fetchData = async (currentTime) => {
    let res = await request.request(fetchProps)
    if (res.errorCode !== 0) return
    localStorage.setItem(
      key,
      JSON.stringify({
        data: res.data,
        createdAt: currentTime,
      })
    )
    setData(res.data)
  }

  return data
}

export default useLocalData
