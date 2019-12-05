import useCtx from "./useCtx"
import useRequestAnimationFrame from "./useRequestAnimationFrame"

export default function(img) {
  const ctx = useCtx()
  function drawFrame() {
    const { width, height } = img
    ctx.drawImage(img, 0, 0, width, height)
  }
  useRequestAnimationFrame(drawFrame)
}
