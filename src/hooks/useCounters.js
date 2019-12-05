import { useState, useEffect } from "react"
import getCounter from "../counters"
import useCanvas from "./useCanvas"

export default function() {
  const canvas = useCanvas()
  const [counters, setCounters] = useState([])
  useEffect(() => {
    setCounters(getCounter({ canvas }))
  }, [canvas])
  return counters
}
