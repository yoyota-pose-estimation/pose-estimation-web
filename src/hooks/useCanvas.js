import { useLayoutEffect } from "react"
import useMergedStore from "./useMergedStore"

export default function(canvasRef) {
  const {
    canvas: { setCanvas },
    imageElement: { imageElement }
  } = useMergedStore()
  useLayoutEffect(() => {
    const { current } = canvasRef
    if (!current) {
      return
    }
    const { width, height } = imageElement
    current.width = width
    current.height = height
    setCanvas(current)
  }, [canvasRef, setCanvas, imageElement])
}
