import { useState, useEffect } from "react"
import useCanvas from "./useCanvas"

function getCtx(canvas) {
  const ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  return ctx
}

export default function() {
  const canvas = useCanvas()
  const [ctx, setCtx] = useState(getCtx(canvas))
  useEffect(() => {
    setCtx(getCtx(canvas))
  }, [canvas, ctx])
  return ctx
}
