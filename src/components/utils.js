import axios from 'axios'
import to from 'await-to-js'
import queryString from 'query-string'
import * as posenet from '@tensorflow-models/posenet'

const width = 300
const height = 250

export function sendSlackMessage(text) {
  const { slackUrl } = queryString.parse(window.location.search)
  axios.post(slackUrl, {
    text,
    username: 'poseNet'
  })
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function isMobile() {
  return isAndroid() || isiOS()
}

export function loadNet() {
  if (isMobile()) {
    return posenet.load()
  }
  return posenet.load({
    architecture: 'ResNet50',
    outputStride: 32,
    inputResolution: 257,
    quantBytes: 2
  })
}

function drawPoint(ctx, y, x, r, color = 'aqua') {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.fillStyle = color
  ctx.fill()
}

export function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  // eslint-disable-next-line no-undef
  const parts = {
    // nose: true,
    rightEar: true,
    rightAnkle: true,
    rightShoulder: true
    // leftEar: true,
    // leftWrist: true,
    // leftKnee: true
    // leftHip: true,
    // rightHip: true,
    // rightKnee: true,
    // rightEye: true,
    // rightElbow: true
    // rightWrist: true
  }
  const confidentKeypoints = keypoints.filter(
    ({ score, part }) => score > minConfidence && part in parts
  )
  confidentKeypoints.forEach((keypoint) => {
    const { y, x } = keypoint.position
    drawPoint(ctx, y * scale, x * scale, 3)
  })
}

async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      'Browser API navigator.mediaDevices.getUserMedia not available'
    )
  }
  const video = document.createElement('video')
  video.width = width
  video.height = height

  const mobile = isMobile()
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: 'user',
      width: mobile ? undefined : width,
      height: mobile ? undefined : height
    }
  })
  video.srcObject = stream
  video.playsInline = true

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video)
    }
  })
}

export async function getInput() {
  const { camUrl } = queryString.parse(window.location.search)
  if (camUrl) {
    const img = new Image(width, height)
    img.crossOrigin = 'Anonymous'
    img.src = camUrl
    return img
  }
  const [err, video] = await to(setupCamera())
  if (err) {
    return null
  }
  video.play()
  return video
}
