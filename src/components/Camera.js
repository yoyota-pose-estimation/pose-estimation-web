/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState, useEffect } from 'react'
import to from 'await-to-js'
import CameraError from './CameraError'
import { isMobile } from './utils'
import Webcam from './Webcam'

const videoWidth = 300
const videoHeight = 250

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

export default function() {
  const ref = useRef()
  const [cameraError, setCameraError] = useState(false)
  async function loadVideo() {
    const [err, video] = await to(setupCamera(ref))
    if (err) {
      setCameraError(true)
      return
    }
    video.play()
  }
  useEffect(() => {
    loadVideo()
  })
  if (cameraError) {
    return (
      <React.Fragment>
        <CameraError />
        <Webcam />
      </React.Fragment>
    )
  }
  return (
    <video
      id="input"
      playsInline
      ref={ref}
      style={{
        display: 'none'
      }}
    />
  )
}
