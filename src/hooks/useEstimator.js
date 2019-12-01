import { useState } from 'react'
import to from 'await-to-js'
import useCtx from './useCtx'
import useCanvas from './useCanvas'
import useCheckPose from './useCheckPose'
import useDrawCanvas from './useDrawCanvas'
import useInterval from './useInterval'
import useCounters from './useCounters'

async function estimatePose({ net, imageElement, setPoses }) {
  const [err, ret] = await to(
    net.estimateMultiplePoses(imageElement, {
      maxDetections: 2,
      scoreThreshold: 0.2
    })
  )
  if (err) {
    window.location.reload()
    return
  }
  setPoses(ret)
}

export default function({ net, imageElement, canvasRef, intervalDelay }) {
  const [poses, setPoses] = useState([{ keypoints: [] }])
  const [distance, setDistance] = useState(0)
  const canvas = useCanvas({ canvasRef, imageElement })
  const ctx = useCtx({ canvas })
  const counters = useCounters({ canvas, setDistance })

  useInterval({
    intervalDelay,
    fn: () => estimatePose({ net, setPoses, imageElement })
  })
  useCheckPose({ ctx, poses, counters, imageElement })
  useDrawCanvas({ ctx, poses, counters, distance, imageElement })
}
