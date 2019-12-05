import React, { useRef } from "react"
import EstimatorCanvas from "./EstimatorCanvas"
import usePoseNet from "../hooks/usePoseNet"
import useMergedStore from "../hooks/useMergedStore"

export default function() {
  const {
    intervalDelay: { intervalDelay, setIntervalDelay }
  } = useMergedStore()
  usePoseNet()

  return (
    <EstimatorCanvas
      intervalDelay={intervalDelay}
      setIntervalDelay={setIntervalDelay}
    />
  )
}
