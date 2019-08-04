import React, { useRef, useState, useEffect } from 'react'
import { loadNet, drawKeypoints } from './utils'
import Loading from './Loading'

async function estimatePose(ctx, net, img) {
  async function estimate() {
    const pose = await net.estimateSinglePose(img)
    ctx.drawImage(img, 0, 0, img.width, img.height)
    drawKeypoints(pose.keypoints, 0.1, ctx)
    requestAnimationFrame(estimate)
  }
  requestAnimationFrame(estimate)
}

function getCtx(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  return ctx
}

export default function() {
  const canvasRef = useRef()
  const [loading, setLoading] = useState(true)
  async function setUp() {
    const net = await loadNet()
    setLoading(false)
    const img = document.getElementById('input')
    const canvas = canvasRef.current
    canvas.width = img.width
    canvas.height = img.height
    const ctx = getCtx(canvas)
    estimatePose(ctx, net, img)
  }
  useEffect(() => {
    setUp()
  }, [])
  return (
    <React.Fragment>
      <Loading loading={loading} />
      <canvas ref={canvasRef} />
    </React.Fragment>
  )
}
