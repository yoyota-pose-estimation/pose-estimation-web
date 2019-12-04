import React, { useRef } from "react"
import EstimatorCanvas from "./EstimatorCanvas"
import usePoseNet from "../hooks/usePoseNet"
import useMergedStore from "../hooks/useMergedStore"

export default function() {
  const canvasRef = useRef()
  const {
    intervalDelay: { intervalDelay, setIntervalDelay }
  } = useMergedStore()
  usePoseNet(canvasRef)

  return (
    <EstimatorCanvas
      canvasRef={canvasRef}
      intervalDelay={intervalDelay}
      setIntervalDelay={setIntervalDelay}
    />
  )
}
