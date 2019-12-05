import { useEffect } from "react"

export default function(fn) {
  useEffect(() => {
    function animateFrame() {
      fn()
      requestAnimationFrame(animateFrame)
    }
    requestAnimationFrame(animateFrame)
  }, [fn])
}
