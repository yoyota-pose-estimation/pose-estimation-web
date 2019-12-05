import useCtx from "./useCtx"
import useRequestAnimationFrame from "./useRequestAnimationFrame"

export default function({ label, count }) {
  const ctx = useCtx()
  useRequestAnimationFrame(() => {
    ctx.font = "20px Verdana"
    ctx.fillStyle = "aqua"
    const text = `${label}: ${count}`
    ctx.fillText(text, 100, 30)
  })
}
