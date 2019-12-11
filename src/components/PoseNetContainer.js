import React, { useState, useCallback } from "react"
import PoseNet from "posenet-react"
import useKeypoints from "../hooks/useKeypoints"
import CounterContainer from "./CounterContainer"

const width = 300
const height = 250

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
    prev[curr.part] = curr.position
    return prev
  }, {})
}

export default function() {
  const [keypoints, setKeypoints] = useState({})

  const onChange = useCallback(poses => {
    if (poses.length !== 1) {
      return
    }
    setKeypoints(processKeypoints(poses[0]))
  }, [])

  return (
    <>
      <CounterContainer keypoints={keypoints} />
      <PoseNet
        id="canvas"
        className="vh-100"
        onChange={onChange}
        width={width}
        height={height}
      />
    </>
  )
}
