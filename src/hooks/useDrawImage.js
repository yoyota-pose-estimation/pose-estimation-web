import { useLayoutEffect } from "react"
import useCtx from "./useCtx"

export default function({ img, poses }) {
  const ctx = useCtx()
  const { width, height } = img
  useLayoutEffect(() => {
    ctx.drawImage(img, 0, 0, width, height)
  }, [ctx, height, img, poses, width])
}
