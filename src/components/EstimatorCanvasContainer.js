import React, { useState, useEffect } from "react"
import useCtx from "../hooks/useCtx"
import options from "../hooks/counters"
import useInterval from "../hooks/useInterval"
import EstimatorCanvas from "./EstimatorCanvas"
import useDrawKeypoints from "../hooks/useDrawKeypoints"
import usePoseEstimator from "../hooks/usePoseEstimator"
import useCounter from "../hooks/useCounter"
import useDrawStatus from "../hooks/useDrawStatus"
import useDrawImage from "../hooks/useDrawImage"

export default function({ net, inputImage }) {
  const [intervalDelay, setIntervalDelay] = useState(200)
  const [selectedOption, selectOption] = useState(options[0])
  const [poses, estimatePoses] = usePoseEstimator(net)
  useInterval({
    intervalDelay,
    fn: () => estimatePoses(inputImage)
  })
  useDrawImage(inputImage)
  const count = useCounter({ poses, counter: selectedOption.value })
  useDrawStatus({ label: selectedOption.label, count })
  useDrawKeypoints(poses)
  return (
    <>
      <EstimatorCanvas
        selectOption={selectOption}
        intervalDelay={intervalDelay}
        selectedOption={selectedOption}
        setIntervalDelay={setIntervalDelay}
        options={options}
      />
    </>
  )
}
