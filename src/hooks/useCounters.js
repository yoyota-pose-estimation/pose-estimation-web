import { useState, useEffect } from "react"
import getCounter from "../counters"
import useMergedStore from "./useMergedStore"

export default function({ setDistance }) {
  const {
    canvas: { canvas }
  } = useMergedStore()
  const [counters, setCounters] = useState([])
  useEffect(() => {
    setCounters(getCounter({ canvas, setDistance }))
  }, [canvas, setDistance])
  return counters
}
