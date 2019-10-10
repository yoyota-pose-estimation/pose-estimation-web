import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import to from 'await-to-js'
import getCounter from '../counters'
import { drawKeypoints } from './utils'
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

function getCtx(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  return ctx
}

export default function({ net, loading, imageElement }) {
  const canvasRef = useRef()

  const [ctx, setCtx] = useState(getCtx(document.createElement('canvas')))
  const [pose, setPose] = useState({ keypoints: [] })
  const [counters, setCounters] = useState([])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const { width, height } = imageElement
    canvas.width = width
    canvas.height = height
    setCounters(getCounter(canvas))
    setCtx(getCtx(canvas))
  }, [imageElement])

  useEffect(() => {
    async function estimatePose() {
      const [err, ret] = await to(net.estimateSinglePose(imageElement))
      if (err) {
        window.location.reload()
        return
      }
      setPose(ret)
    }
    const intervalId = setInterval(() => {
      estimatePose()
    }, 200)
    return () => {
      clearInterval(intervalId)
    }
  }, [net, imageElement])

  useLayoutEffect(() => {
    function drawImage() {
      const { width, height } = imageElement
      ctx.drawImage(imageElement, 0, 0, width, height)
    }
    function drawStatusText() {
      ctx.font = '12px Verdana'
      ctx.fillStyle = 'red'
      counters.forEach(({ name, count }, index) => {
        const text = `${name}: ${count}`
        ctx.fillText(text, 80, 10 * (index + 1))
      })
    }
    async function checkPose() {
      const { keypoints } = pose
      const confidentKeypoints = filterConfidentPart(keypoints, 0.5)
      counters.forEach((counter) => counter.checkPose(confidentKeypoints))
    }
    drawImage()
    checkPose()
    drawStatusText()
    drawKeypoints(pose.keypoints, 0.1, ctx)
  }, [ctx, pose, counters, imageElement])

  return <EstimatorCanvas loading={loading} canvasRef={canvasRef} />
}
