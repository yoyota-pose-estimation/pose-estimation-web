import * as posenet from '@tensorflow-models/posenet'

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
  if (isMobile) {
    return posenet.load()
  }
  return posenet.load({
    architecture: 'ResNet50',
    outputStride: 32,
    inputResolution: 257,
    quantBytes: 2
  })
}

function drawPoint(ctx, y, x, r, color = 'red') {
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
    if (keypoint.part === 'rightEar' || keypoint.part === 'rightShoulder') {
      const { y, x } = keypoint.position
      drawPoint(ctx, y * scale, x * scale, 3)
    }
  })
}
