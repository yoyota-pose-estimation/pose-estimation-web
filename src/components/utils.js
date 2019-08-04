function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function isMobile() {
  return isAndroid() || isiOS()
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
