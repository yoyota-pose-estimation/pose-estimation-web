import { useLayoutEffect } from "react"
import useCtx from "./useCtx"

export default function({ poses, counters }) {
  const ctx = useCtx()
  useLayoutEffect(() => {
    ctx.font = "20px Verdana"
    ctx.fillStyle = "aqua"
    // ctx.fillText(`distance: ${distance}`, 100, 30)
    counters.forEach(({ name, count }, index) => {
      const text = `${name}: ${count}`
      ctx.fillText(text, 100, 30 * (index + 2))
    })
  }, [poses, counters, ctx])
}
