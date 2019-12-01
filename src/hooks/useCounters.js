import { useState, useEffect } from 'react'
import getCounter from '../counters'

export default function({ canvas, setDistance }) {
  const [counters, setCounters] = useState([])
  useEffect(() => {
    setCounters(getCounter({ canvas, setDistance }))
  }, [canvas, setDistance])
  return counters
}
