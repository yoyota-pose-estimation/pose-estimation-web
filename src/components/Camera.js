/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react'
import * as posenet from '@tensorflow-models/posenet'
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
  const video = await setupCamera(ref)
  video.play()
  return video
}

async function estimatePose(videoRef, ctx) {
  const video = await loadVideo(videoRef)
  const net = await loadNet()
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
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    estimatePose(videoRef, ctx)
  })
  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} height={videoHeight} width={videoWidth} />
    </div>
  )
}
