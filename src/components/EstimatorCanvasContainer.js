import React, { useRef, useState, useEffect } from 'react'
import to from 'await-to-js'
import { loadNet, getInput, drawKeypoints } from './utils'
import getCounter from '../counters'
import EstimatorCanvas from './EstimatorCanvas'

function filterConfidentPart(keypoints, minConfidence) {
  return keypoints.reduce((prev, curr) => {
    const { part, score, position } = curr
    if (score < minConfidence) {
      return prev
    }
    // eslint-disable-next-line no-param-reassign
    prev[part] = position
    return prev
  }, {})
}

function drawCanvas(ctx, img, counters, keypoints) {
  ctx.drawImage(img, 0, 0, img.width, img.height)
  ctx.font = '15px Verdana'
  ctx.fillStyle = 'black'
  counters.forEach(({ name, count }, index) => {
    const text = `${name}: ${count}`
    ctx.fillText(text, 200, 20 * (index + 1))
  })
  // drawKeypoints(keypoints, 0.1, ctx)
}

async function estimatePose(ctx, net, img, counters) {
  const [err, pose] = await to(net.estimateSinglePose(img))
  if (err) {
    window.location.reload()
    return
  }
  const { keypoints } = pose
  drawCanvas(ctx, img, counters, keypoints)
  const confidentKeypoints = filterConfidentPart(keypoints, 0.5)
  counters.forEach((counter) => counter.checkPose(confidentKeypoints))
}

function getCanvas(canvasRef, img) {
  const canvas = canvasRef.current
  canvas.width = img.width
  canvas.height = img.height
  return canvas
}

function getCtx(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  return ctx
}

function setEstimateInterval(net, img, canvasRef, setIntervalId) {
  const canvas = getCanvas(canvasRef, img)
  const ctx = getCtx(canvas)
  const counters = getCounter(canvas)
  const intervalId = setInterval(() => {
    estimatePose(ctx, net, img, counters)
  }, 100)
  setIntervalId(intervalId)
}

async function getInputImageElement(setErrorText) {
  const img = await getInput()
  if (!img) {
    setErrorText(`this browser does not support video capture,
         or this device does not have a camera`)
  }
  return img
}

export default function() {
  const canvasRef = useRef()
  const [loading, setLoading] = useState(true)
  const [errorText, setErrorText] = useState('')
  const [intervalId, setIntervalId] = useState()

  async function setUp() {
    const img = await getInputImageElement(setErrorText)
    const net = await loadNet()
    setLoading(false)
    setEstimateInterval(net, img, canvasRef, setIntervalId)
  }

  useEffect(() => {
    setUp()
    return () => {
      clearInterval(intervalId)
    }
  }, [])
  return (
    <EstimatorCanvas
      loading={loading}
      errorText={errorText}
      canvasRef={canvasRef}
    />
  )
}
