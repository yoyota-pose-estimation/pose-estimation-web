import React, { useRef, useState, useEffect } from 'react'
import { loadNet, drawKeypoints } from './utils'
import PullUpCounter from '../counters/pullUpCounter'
import TurtleNeckCounter from '../counters/turtleNeckCounter'
import Loading from './Loading'
import Webcam from './Webcam'

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
  const counters = [new PullUpCounter(), new TurtleNeckCounter()]
  async function estimate() {
    const pose = await net.estimateSinglePose(img)
    const confidentKeypoints = filterConfidentPart(img, pose.keypoints, 0.5)
    counters.forEach((counter) => counter.checkPose(confidentKeypoints))
    ctx.drawImage(img, 0, 0, img.width, img.height)
    drawKeypoints(pose.keypoints, 0.1, ctx)
  }
  setInterval(estimate, 100)
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
      <Webcam />
      <canvas ref={canvasRef} />
    </React.Fragment>
  )
}
