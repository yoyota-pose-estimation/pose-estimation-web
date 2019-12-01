import React, { useRef, useState } from 'react'
import useEstimator from '../hooks/useEstimator'
import EstimatorCanvas from './EstimatorCanvas'

export default function({ net, loading, imageElement }) {
  const canvasRef = useRef()
  const [intervalDelay, setIntervalDelay] = useState(250)
  useEstimator({ net, imageElement, canvasRef, intervalDelay })

  return (
    <EstimatorCanvas
      loading={loading}
      canvasRef={canvasRef}
      intervalDelay={intervalDelay}
      setIntervalDelay={setIntervalDelay}
    />
  )
}
