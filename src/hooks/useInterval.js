import { useEffect } from 'react'

export default function({ fn, intervalDelay }) {
  useEffect(() => {
    const intervalId = setInterval(fn, intervalDelay)
    return () => {
      clearInterval(intervalId)
    }
  }, [fn, intervalDelay])
}
