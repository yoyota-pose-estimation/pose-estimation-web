import React, { useRef, useState, useEffect } from 'react'
import { loadNet, drawKeypoints } from './utils'
import counters from '../counters'
import Loading from './Loading'

function filterConfidentPart(img, keypoints, minConfidence) {
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

async function estimatePose(ctx, net, img) {
  const pose = await net.estimateSinglePose(img)
  const confidentKeypoints = filterConfidentPart(img, pose.keypoints, 0.5)
  counters.forEach((counter) => counter.checkPose(confidentKeypoints))
  ctx.drawImage(img, 0, 0, img.width, img.height)
  const counts = counters.map((counter) => counter.count)
  ctx.fillText(String(counts), 100, 100)
  drawKeypoints(pose.keypoints, 0.1, ctx)
}

function getCtx(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  return ctx
}

export default function() {
  let intervalId
  const canvasRef = useRef()
  const [loading, setLoading] = useState(true)
  async function setUp() {
    const net = await loadNet()
    setLoading(false)
    const img = document.getElementById('input')
    console.log(img.width, img.height)
    const canvas = canvasRef.current
    if (!img) {
      return
    }
    canvas.width = img.width
    canvas.height = img.height
    const ctx = getCtx(canvas)
    intervalId = setInterval(() => {
      estimatePose(ctx, net, img)
    }, 100)
  }
  useEffect(
    () => {
      setUp()
      return () => {
        clearInterval(intervalId)
      }
    },
    [],
    []
  )
  return (
    <React.Fragment>
      <Loading loading={loading} />
      <canvas ref={canvasRef} style={{ height: '100%', width: '100%' }} />
    </React.Fragment>
  )
}
