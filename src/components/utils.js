import axios from 'axios'
import to from 'await-to-js'
import queryString from 'query-string'
import * as posenet from '@tensorflow-models/posenet'

export const beep = new Audio('https://www.soundjay.com/button/beep-07.mp3')

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
  const confidentKeypoints = keypoints.filter(
    ({ score }) => score > minConfidence
  )
  confidentKeypoints.forEach((keypoint) => {
    const { y, x } = keypoint.position
    drawPoint(ctx, y * scale, x * scale, 3)
  })
}

const videoWidth = 300
const videoHeight = 250

async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      'Browser API navigator.mediaDevices.getUserMedia not available'
    )
  }
  const video = document.createElement('video')
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
    const img = new Image(300, 250)
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
