import { useEffect } from "react"
import { width, height } from "../utils"

function processKeypoints({ keypoints }) {
  const filteredKeypoints = keypoints.filter(({ score }) => score > 0.5)
  const normalizedKeypoints = filteredKeypoints.map(keypoint => {
    const { position } = keypoint
    const { x, y } = position
    return {
      ...keypoint,
      position: {
        x: x / width,
        y: y / height
      }
    }
  })
  return normalizedKeypoints.reduce((prev, curr) => {
    // eslint-disable-next-line no-param-reassign
    prev[curr.part] = curr.position
    return prev
  }, {})
}

export default function({ poses, counters }) {
  useEffect(() => {
    if (poses.length > 1) {
      return
    }
    poses.forEach(({ keypoints }) => {
      const processedKeypoints = processKeypoints({ keypoints })
      counters.forEach(counter => counter.checkPose(processedKeypoints))
    })
  }, [poses, counters])
}
