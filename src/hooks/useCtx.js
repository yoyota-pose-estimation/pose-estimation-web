import { useState, useEffect } from 'react'

function getCtx(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  return ctx
}

export default function({ canvas }) {
  const [ctx, setCtx] = useState(canvas.getContext('2d'))
  useEffect(() => {
    setCtx(getCtx(canvas))
  }, [canvas])
  return ctx
}
