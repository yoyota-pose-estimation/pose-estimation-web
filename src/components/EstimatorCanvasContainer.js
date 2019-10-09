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
  function getCanvas() {
    const canvas = canvasRef.current
    const { width, height } = imageElement
    canvas.width = width
    canvas.height = height
    return canvas
  }

  const [ctx, setCtx] = useState(getCtx(document.createElement('canvas')))
  const [pose, setPose] = useState({ keypoints: [] })
  const [counters, setCounters] = useState([])

  useLayoutEffect(() => {
    const canvas = getCanvas(canvasRef, imageElement)
    setCounters(getCounter(canvas))
    setCtx(getCtx(canvas))
  }, [imageElement])

  async function estimatePose() {
    const [err, ret] = await to(net.estimateSinglePose(imageElement))
    if (err) {
      window.location.reload()
      return
    }
    setPose(ret)
  }

  useEffect(() => {
    if (!net) {
      return () => {}
    }
    const intervalId = setInterval(() => {
      estimatePose(net, imageElement)
    }, 200)
    return () => {
      clearInterval(intervalId)
    }
  }, [net])

  async function checkPose() {
    if (!pose) {
      return
    }
    const { keypoints } = pose
    const confidentKeypoints = filterConfidentPart(keypoints, 0.5)
    counters.forEach((counter) => counter.checkPose(confidentKeypoints))
  }

  useLayoutEffect(() => {
    const { width, height } = imageElement
    ctx.drawImage(imageElement, 0, 0, width, height)
    checkPose()
    drawKeypoints(pose.keypoints, 0.1, ctx)
  }, [pose])

  return <EstimatorCanvas loading={loading} canvasRef={canvasRef} />
}
