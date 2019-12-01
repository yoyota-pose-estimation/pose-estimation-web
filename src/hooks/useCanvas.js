import { useState, useLayoutEffect } from 'react'

export default function({ canvasRef, imageElement }) {
  const [canvas, setCanvas] = useState(document.createElement('canvas'))
  useLayoutEffect(() => {
    const { current } = canvasRef
    if (!current) {
      return
    }
    const { width, height } = imageElement
    current.width = width
    current.height = height
    setCanvas(current)
  }, [canvasRef, imageElement])
  return canvas
}
