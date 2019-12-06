import { useState, useLayoutEffect } from "react"
import { width, height } from "../utils"

export default function(id = "canvas") {
  const [canvasState, setCanvas] = useState(document.createElement("canvas"))
  useLayoutEffect(() => {
    const canvas = document.getElementById(id)
    if (!canvas) {
      return
    }
    canvas.width = width
    canvas.height = height
    setCanvas(canvas)
  }, [id])
  return canvasState
}
