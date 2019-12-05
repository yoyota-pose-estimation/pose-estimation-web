import { useEffect } from "react"
import useMergedStore from "./useMergedStore"

function getCtx(canvas) {
  const ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  return ctx
}

export default function() {
  const {
    ctx: { setCtx }
  } = useMergedStore()
  useEffect(() => {
    const canvas = document.getElementById("canvas")
    setCtx(getCtx(canvas))
  }, [setCtx])
}
