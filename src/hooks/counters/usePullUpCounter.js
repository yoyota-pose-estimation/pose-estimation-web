import { useState, useEffect } from "react"
import { beep } from "./utils"

export default function(keypoints) {
  const [down, setDown] = useState(false)
  const [count, setCount] = useState(0)
  const [distance, setDistance] = useState(0)
  useEffect(() => {
    const {
      leftShoulder,
      rightShoulder,
      leftElbow,
      rightElbow,
      leftWrist,
      rightWrist
    } = keypoints
    const shoulder = leftShoulder || rightShoulder
    const elbow = leftElbow || rightElbow

    if (!shoulder || !elbow) {
      return
    }

    setDistance(elbow.y - shoulder.y)
    const up = distance > 0
    if (down && up) {
      beep.play()
      setCount(count + 1)
    }
    setDown(!up)

    const wrist = leftWrist || rightWrist
    if (!wrist) {
      return
    }
    const rest = wrist.y > elbow.y
    if (rest) {
      setDistance(shoulder.y - wrist.y)
      setCount(0)
    }
  }, [keypoints, down, count, distance])
  return { count, distance }
}
