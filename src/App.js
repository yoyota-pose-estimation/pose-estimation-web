import React from "react"
import Prepare from "./components/Prepare"
import EstimatorCanvasContainer from "./components/EstimatorCanvasContainer"
import useInputImage from "./hooks/useInputImage"
import useLoadPoseNet from "./hooks/useLoadPoseNet"

export default function() {
  const inputImage = useInputImage()
  const net = useLoadPoseNet()

  if (!net || !inputImage) {
    return <Prepare net={net} inputImage={inputImage} />
  }

  return (
    <>
      <EstimatorCanvasContainer net={net} inputImage={inputImage} />
    </>
  )
}
