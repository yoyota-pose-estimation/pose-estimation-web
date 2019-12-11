import React, { useState } from "react"
import useInterval from "../hooks/useInterval"
import EstimatorCanvas from "./EstimatorCanvas"
import usePoseEstimator from "../hooks/usePoseEstimator"
import useDrawImage from "../hooks/useDrawImage"
import CounterContainer from "./CounterContainer"

export default function({ net, inputImage }) {
  const [intervalDelay, setIntervalDelay] = useState(200)
  const [poses, estimatePoses] = usePoseEstimator(net)
  useInterval({
    intervalDelay,
    fn: () => estimatePoses(inputImage)
  })
  useDrawImage({ img: inputImage, poses })
  return (
    <>
      <CounterContainer poses={poses} />
      <EstimatorCanvas
        intervalDelay={intervalDelay}
        setIntervalDelay={setIntervalDelay}
      />
    </>
  )
}
