import useCtx from "./useCtx"
import useRequestAnimationFrame from "./useRequestAnimationFrame"

function drawPoint(ctx, y, x, r, color = "aqua") {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.fillStyle = color
  ctx.fill()
}

function drawKeypoints(keypoints, ctx, scale = 1) {
  keypoints.forEach(keypoint => {
    const { y, x } = keypoint.position
    drawPoint(ctx, y * scale, x * scale, 2)
  })
}

export default function(poses) {
  const ctx = useCtx()
  useRequestAnimationFrame(() => {
    poses.forEach(({ keypoints }) => {
      drawKeypoints(keypoints, ctx)
    })
  })
}
