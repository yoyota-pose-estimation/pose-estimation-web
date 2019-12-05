import { useState, useEffect } from "react"
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

export default function(poses) {
  const [keypoints, setKeypoints] = useState([])
  useEffect(() => {
    if (poses.length !== 1) {
      setKeypoints([])
      return
    }
    const [pose] = poses
    const processedKeypoints = processKeypoints(pose)
    setKeypoints(processedKeypoints)
  }, [poses, setKeypoints])
  return keypoints
}
