import { useEffect, useState } from 'react'

function useWindowResize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handlerResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handlerResize)
    return () => {
      window.removeEventListener('resize', handlerResize)
    }
  }, [])

  return windowSize
}

export default useWindowResize
