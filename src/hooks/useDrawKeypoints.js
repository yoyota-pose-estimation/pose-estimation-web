import { useLayoutEffect } from "react"
import useCtx from "./useCtx"

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
  useLayoutEffect(() => {
    poses.forEach(({ keypoints }) => {
      drawKeypoints(keypoints, ctx)
    })
  }, [ctx, poses])
}
