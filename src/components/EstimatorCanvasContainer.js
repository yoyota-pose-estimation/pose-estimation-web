import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import to from 'await-to-js'
import getCounter from '../counters'
import { drawKeypoints, uploadMultiPersonImage } from './utils'
import EstimatorCanvas from './EstimatorCanvas'

function getCtx(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  return ctx
}

function processKeypoints({ keypoints, width, height }) {
  const filteredKeypoints = keypoints.filter(({ score }) => score > 0.9)
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

export default function({ net, loading, imageElement }) {
  const canvasRef = useRef()

  const [distance, setDistance] = useState(0)
  const [intervalDealy, setIntervalDelay] = useState(250)
  const [ctx, setCtx] = useState(getCtx(document.createElement('canvas')))
  const [poses, setPoses] = useState([{ keypoints: [] }])
  const [counters, setCounters] = useState([])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const { width, height } = imageElement
    canvas.width = width
    canvas.height = height
    setCounters(getCounter({ canvas, setDistance }))
    setCtx(getCtx(canvas))
  }, [imageElement])

  useEffect(() => {
    async function estimatePose() {
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
    const intervalId = setInterval(() => {
      estimatePose()
    }, intervalDealy)
    return () => {
      clearInterval(intervalId)
    }
  }, [net, imageElement, intervalDealy])

  useLayoutEffect(() => {
    const { width, height } = imageElement
    function drawImage() {
      ctx.drawImage(imageElement, 0, 0, width, height)
    }
    function drawStatusText() {
      ctx.font = '20px Verdana'
      ctx.fillStyle = 'aqua'
      ctx.fillText(`distance: ${distance}`, 100, 30)
      counters.forEach(({ name, count }, index) => {
        const text = `${name}: ${count}`
        ctx.fillText(text, 100, 30 * (index + 2))
      })
    }
    async function checkPose(pose) {
      const { keypoints } = pose
      const processedKeypoints = processKeypoints({ keypoints, width, height })
      counters.forEach((counter) => counter.checkPose(processedKeypoints))
    }
    drawImage()
    if (poses.length > 1) {
      uploadMultiPersonImage(canvasRef.current)
      poses.forEach(({ keypoints }) => {
        drawKeypoints(keypoints, ctx)
      })
      return
    }
    poses.forEach(checkPose)
    drawStatusText()
    poses.forEach(({ keypoints }) => {
      drawKeypoints(keypoints, ctx)
    })
  }, [ctx, poses, counters, distance, imageElement])

  return (
    <EstimatorCanvas
      loading={loading}
      canvasRef={canvasRef}
      intervalDealy={intervalDealy}
      setIntervalDelay={setIntervalDelay}
    />
  )
}
