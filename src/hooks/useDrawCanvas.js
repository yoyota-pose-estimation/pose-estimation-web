import { useEffect, useLayoutEffect } from "react"
import useMergedStore from "./useMergedStore"
import { drawKeypoints } from "../utils"

function drawStatusText({ ctx, counters, distance }) {
  ctx.font = "20px Verdana"
  ctx.fillStyle = "aqua"
  ctx.fillText(`distance: ${distance}`, 100, 30)
  counters.forEach(({ name, count }, index) => {
    const text = `${name}: ${count}`
    ctx.fillText(text, 100, 30 * (index + 2))
  })
}

export default function({ poses, distance, counters }) {
  const {
    ctx: { ctx },
    imageElement: { imageElement }
  } = useMergedStore()
  useLayoutEffect(() => {
    const { width, height } = imageElement
    ctx.drawImage(imageElement, 0, 0, width, height)
  }, [ctx, poses, counters, imageElement])

  useEffect(() => {
    drawStatusText({ ctx, counters, distance })
  }, [ctx, counters, distance])

  useEffect(() => {
    poses.forEach(({ keypoints }) => {
      drawKeypoints(keypoints, ctx)
    })
  }, [ctx, poses])
}
