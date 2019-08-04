/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState, useEffect } from 'react'
import to from 'await-to-js'
import * as posenet from '@tensorflow-models/posenet'
import CameraError from './CameraError'
import Loading from './Loading'
import { isMobile, drawKeypoints } from './utils'

const videoWidth = 600
const videoHeight = 500

function loadNet() {
  return posenet.load({
    architecture: 'ResNet50',
    outputStride: 32,
    inputResolution: 257,
    quantBytes: 2
  })
}

async function setupCamera(ref) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      'Browser API navigator.mediaDevices.getUserMedia not available'
    )
  }
  const video = ref.current
  video.width = videoWidth
  video.height = videoHeight

  const mobile = isMobile()
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: 'user',
      width: mobile ? undefined : videoWidth,
      height: mobile ? undefined : videoHeight
    }
  })
  video.srcObject = stream

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video)
    }
  })
}

async function loadVideo(ref) {
  const [err, video] = await to(setupCamera(ref))
  if (err) {
    return null
  }
  video.play()
  return video
}

async function estimatePose(ctx, net, video) {
  async function estimate() {
    const pose = await net.estimateSinglePose(video)
    ctx.drawImage(video, 0, 0, video.width, video.height)
    drawKeypoints(pose.keypoints, 0.1, ctx)
    requestAnimationFrame(estimate)
  }
  estimate()
}

export default function() {
  const videoRef = useRef()
  const canvasRef = useRef()
  const [cameraError, setCameraError] = useState(false)
  const [loading, setLoading] = useState(true)
  async function setUp() {
    const video = await loadVideo(videoRef)
    if (!video) {
      setCameraError(true)
      return
    }
    const net = await loadNet()
    setLoading(false)
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    estimatePose(ctx, net, video)
  }
  useEffect(() => {
    setUp()
  })
  if (cameraError) {
    return <CameraError />
  }
  return (
    <div>
      <Loading loading={loading} />
      <video playsInline ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} height={videoHeight} width={videoWidth} />
    </div>
  )
}
