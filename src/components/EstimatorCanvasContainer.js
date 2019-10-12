import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import to from 'await-to-js'
import getCounter from '../counters'
import { drawKeypoints, uploadMultiPersonImage } from './utils'
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
  const [poses, setPoses] = useState([{ keypoints: [] }])
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
      const [err, ret] = await to(net.estimateMultiplePoses(imageElement))
      if (err) {
        window.location.reload()
        return
      }
      setPoses(ret)
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
      ctx.font = '20px Verdana'
      ctx.fillStyle = 'aqua'
      counters.forEach(({ name, count }, index) => {
        const text = `${name}: ${count}`
        ctx.fillText(text, 100, 30 * (index + 1))
      })
    }
    async function checkPose(pose) {
      const { keypoints } = pose
      const confidentKeypoints = filterConfidentPart(keypoints, 0.1)
      counters.forEach((counter) => counter.checkPose(confidentKeypoints))
    }
    drawImage()
    if (poses.length > 1) {
      uploadMultiPersonImage(canvasRef.current)
      poses.forEach(({ keypoints }) => {
        drawKeypoints(keypoints, 0.1, ctx)
      })
      return
    }
    poses.forEach(checkPose)
    drawStatusText()
    poses.forEach(({ keypoints }) => {
      drawKeypoints(keypoints, 0.3, ctx)
    })
  }, [ctx, poses, counters, imageElement])

  return <EstimatorCanvas loading={loading} canvasRef={canvasRef} />
}
