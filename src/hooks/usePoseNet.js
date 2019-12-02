import { useState } from 'react'
import useCtx from './useCtx'
import useCanvas from './useCanvas'
import useCheckPose from './useCheckPose'
import useDrawCanvas from './useDrawCanvas'
import useInterval from './useInterval'
import useCounters from './useCounters'
import useEstimator from './useEstimator'
import useMergedStore from './useMergedStore'

export default function(canvasRef) {
  const {
    intervalDelay: { intervalDelay }
  } = useMergedStore()
  const [distance, setDistance] = useState(0)
  useCanvas(canvasRef)
  useCtx()
  const counters = useCounters({ setDistance })
  const estimatePose = useEstimator()

  useInterval({
    intervalDelay,
    fn: () => estimatePose()
  })
  useCheckPose({ counters })
  useDrawCanvas({ counters, distance })
}
