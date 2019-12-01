import { useState, useEffect, useLayoutEffect } from 'react'
import to from 'await-to-js'
import getCounter from '../counters'
import useDrawCanvas from './useDrawCanvas'

function getCtx(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  return ctx
}

function processKeypoints({ keypoints, width, height }) {
  const filteredKeypoints = keypoints.filter(({ score }) => score > 0.5)
  const normalizedKeypoints = filteredKeypoints.map((keypoint) => {
    const { position } = keypoint
    const { x, y } = position
    return {
      ...keypoint,
      position: {
        x: x / width,
        y: y / height
      }
    }
  })
  return normalizedKeypoints.reduce((prev, curr) => {
    // eslint-disable-next-line no-param-reassign
    prev[curr.part] = curr.position
    return prev
  }, {})
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

function useCheckPose({ ctx, poses, counters, imageElement }) {
  useEffect(() => {
    if (poses.length > 1) {
      return
    }
    const { width, height } = imageElement
    poses.forEach(({ keypoints }) => {
      const processedKeypoints = processKeypoints({ keypoints, width, height })
      counters.forEach((counter) => counter.checkPose(processedKeypoints))
    })
  }, [ctx, poses, counters, imageElement])
}

function useCanvas({ canvasRef, imageElement }) {
  const [canvas, setCanvas] = useState(document.createElement('canvas'))
  useLayoutEffect(() => {
    const { current } = canvasRef
    if (!current) {
      return
    }
    const { width, height } = imageElement
    current.width = width
    current.height = height
    setCanvas(current)
  }, [canvasRef, imageElement])
  return canvas
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
