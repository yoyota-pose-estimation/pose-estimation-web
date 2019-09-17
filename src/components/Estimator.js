import React, { useRef, useState, useEffect } from 'react'
import to from 'await-to-js'
import { loadNet, getInput, drawKeypoints } from './utils'
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
  const [err, pose] = await to(net.estimateSinglePose(img))
  if (err) {
    window.location.reload()
    return
  }
  const confidentKeypoints = filterConfidentPart(img, pose.keypoints, 0.5)
  counters.forEach((counter) => counter.checkPose(confidentKeypoints))
  ctx.drawImage(img, 0, 0, img.width, img.height)
  ctx.font = '15px Verdana'
  ctx.fillStyle = 'black'
  counters.forEach(({ name, count }, index) => {
    const text = `${name}: ${count}`
    ctx.fillText(text, 5, 20 * (index + 1))
  })
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
  const [errorText, setErrorText] = useState('')
  async function setUp() {
    const net = await loadNet()
    const canvas = canvasRef.current
    const img = await getInput()
    setLoading(false)
    if (!img) {
      setErrorText(`this browser does not support video capture,
         or this device does not have a camera`)
      return
    }
    canvas.width = img.width
    canvas.height = img.height
    const ctx = getCtx(canvas)
    intervalId = setInterval(() => {
      estimatePose(ctx, net, img)
    }, 100)
  }
  useEffect(() => {
    setUp()
    return () => {
      clearInterval(intervalId)
    }
  }, [])
  return (
    <React.Fragment>
      <p>{errorText}</p>
      <Loading loading={loading} />
      <canvas ref={canvasRef} style={{ height: '100%', width: '100%' }} />
    </React.Fragment>
  )
}
