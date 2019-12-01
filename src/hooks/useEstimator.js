import { useState, useEffect } from 'react'
import to from 'await-to-js'
import useCanvas from './useCanvas'
import getCounter from '../counters'
import useCheckPose from './useCheckPose'
import useDrawCanvas from './useDrawCanvas'

function getCtx(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  return ctx
}

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
  const ctx = getCtx(canvas)
  const counters = getCounter({ canvas, setDistance })

  useEffect(() => {
    const intervalId = setInterval(() => {
      estimatePose({ net, imageElement, setPoses })
    }, intervalDelay)
    return () => {
      clearInterval(intervalId)
    }
  }, [net, setPoses, imageElement, intervalDelay])

  useCheckPose({ ctx, poses, counters, imageElement })
  useDrawCanvas({ ctx, poses, counters, distance, imageElement })
}
