import { useState, useLayoutEffect } from "react"

export default function(id = "canvas") {
  const [canvasState, setCanvas] = useState(document.createElement("canvas"))
  useLayoutEffect(() => {
    const canvas = document.getElementById(id)
    if (!canvas) {
      return
    }
    setCanvas(canvas)
  }, [id])
  return canvasState
}
