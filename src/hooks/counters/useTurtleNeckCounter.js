import { useState, useEffect } from "react"

function getTurtleNeckKeypoints({ keypoints, direction }) {
  return {
    ear: keypoints[`${direction}Ear`],
    hip: keypoints[`${direction}Hip`]
  }
}

function calculateDistance({ ear, direction, hip }) {
  if (direction === "left") {
    return ear.x - hip.x
  }
  return hip.x - ear.x
}

function getDirection(keypoints) {
  const { leftEar, rightEar } = keypoints
  if (leftEar && rightEar) {
    return "front"
  }
  return leftEar ? "left" : "right"
}

export default function(keypoints) {
  console.log("useTurtleNeck")
  const [distance, setDistance] = useState()
  useEffect(() => {
    const direction = getDirection(keypoints)
    if (direction === "front") {
      setDistance(null)
      return
    }
    const turtleNeckKeypoints = getTurtleNeckKeypoints({ keypoints, direction })
    if (!Object.values(turtleNeckKeypoints).every(point => point)) {
      setDistance(null)
      return
    }
    const { ear, hip } = turtleNeckKeypoints
    const earToHipDistance = calculateDistance({ ear, direction, hip })
    setDistance(earToHipDistance)

    // this.uploadImage({ distance })
    // this.writeMeasurement("turtleNeckDistance", { distance })
  }, [setDistance, keypoints])
  return { distance }
}

// import { Deque } from './utils'
// this.sensitivity = this.sensitivity ? this.sensitivity : -8
// this.deque = new Deque(100)
// this.deque.insert(turtleNeck)
// this.count = this.deque.trueCount()
// this.writeMeasurement()
// this.writeMeasurement('turtleNeckDistance', { distance })
