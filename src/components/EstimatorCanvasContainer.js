import React, { useState, useLayoutEffect } from "react"
import useCtx from "../hooks/useCtx"
import useInterval from "../hooks/useInterval"
import useCounters from "../hooks/useCounters"
import useDrawStatus from "../hooks/useDrawStatus"
import EstimatorCanvas from "./EstimatorCanvas"
import useCheckPose from "../hooks/useCheckPose"
import useDrawKeypoints from "../hooks/useDrawKeypoints"
import usePoseEstimator from "../hooks/usePoseEstimator"

export default function({ net, inputImage }) {
  const ctx = useCtx()
  const [intervalDelay, setIntervalDelay] = useState(200)
  const [poses, estimatePoses] = usePoseEstimator(net)
  useInterval({
    intervalDelay,
    fn: () => estimatePoses(inputImage)
  })
  useLayoutEffect(() => {
    const { width, height } = inputImage
    ctx.drawImage(inputImage, 0, 0, width, height)
  }, [ctx, inputImage, poses])
  useDrawKeypoints(poses)
  const counters = useCounters()
  useCheckPose({ poses, counters })
  useDrawStatus({ counters, poses })
  return (
    <>
      <EstimatorCanvas
        intervalDelay={intervalDelay}
        setIntervalDelay={setIntervalDelay}
      />
    </>
  )
}
