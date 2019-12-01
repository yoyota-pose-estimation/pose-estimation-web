import { useState, useEffect, useLayoutEffect } from 'react'
import to from 'await-to-js'
import getCounter from '../counters'
import { drawKeypoints, uploadMultiPersonImage } from '../components/utils'

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

function setUp({ setCtx, canvasRef, setDistance, setCounters, imageElement }) {
  const canvas = canvasRef.current
  const { width, height } = imageElement
  canvas.width = width
  canvas.height = height
  setCounters(getCounter({ canvas, setDistance }))
  setCtx(getCtx(canvas))
}

function drawStatusText({ ctx, counters, distance }) {
  ctx.font = '20px Verdana'
  ctx.fillStyle = 'aqua'
  ctx.fillText(`distance: ${distance}`, 100, 30)
  counters.forEach(({ name, count }, index) => {
    const text = `${name}: ${count}`
    ctx.fillText(text, 100, 30 * (index + 2))
  })
}

export default function({ net, imageElement, canvasRef, intervalDelay }) {
  const [distance, setDistance] = useState(0)
  const [ctx, setCtx] = useState(getCtx(document.createElement('canvas')))
  const [poses, setPoses] = useState([{ keypoints: [] }])
  const [counters, setCounters] = useState([])

  useEffect(() => {
    setUp({ setCtx, canvasRef, setDistance, setCounters, imageElement })
  }, [imageElement, setUp])

  useEffect(() => {
    const intervalId = setInterval(() => {
      estimatePose({ net, imageElement, setPoses })
    }, intervalDelay)
    return () => {
      clearInterval(intervalId)
    }
  }, [net, imageElement, estimatePose, intervalDelay])

  useEffect(() => {
    if (poses.length > 1) {
      uploadMultiPersonImage(canvasRef.current)
      return
    }
    const { width, height } = imageElement
    poses.forEach(({ keypoints }) => {
      const processedKeypoints = processKeypoints({ keypoints, width, height })
      counters.forEach((counter) => counter.checkPose(processedKeypoints))
    })
  }, [ctx, poses, counters, imageElement])

  useEffect(() => {
    drawStatusText({ ctx, counters, distance })
  }, [ctx, counters, distance])

  useEffect(() => {
    poses.forEach(({ keypoints }) => {
      drawKeypoints(keypoints, ctx)
    })
  }, [ctx, poses])

  useLayoutEffect(() => {
    const { width, height } = imageElement
    ctx.drawImage(imageElement, 0, 0, width, height)
  }, [ctx, poses, counters, imageElement])
}
