import { useState, useEffect } from "react"
import { beep } from "./utils"

export default function(keypoints) {
  const [up, setUp] = useState(0)
  const [count, setCount] = useState(0)
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

    if (elbow.y < shoulder.y) {
      setUp(Math.max(this.up, this.elbow.y))
      return
    }

    if (up > elbow.y) {
      beep.play()
      setCount(count + 1)
      setUp(0)
      return
    }

    const wrist = leftWrist || rightWrist
    if (!wrist) {
      return
    }
    if (wrist.y > elbow.y && count > 0) {
      setCount(0)
    }
  }, [count, keypoints, up])
}
