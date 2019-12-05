import to from "await-to-js"
import { useState, useEffect } from "react"
import * as posenet from "@tensorflow-models/posenet"
import { isMobile } from "../utils"

function getNet() {
  if (isMobile()) {
    return posenet.load()
  }
  return posenet.load({
    architecture: "ResNet50",
    outputStride: 32,
    inputResolution: 257,
    quantBytes: 2
  })
}

const initialNet = {
  estimateSinglePose() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ keypoints: [] })
      })
    })
  },
  estimateMultiplePoses() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([{ keypoints: [] }])
      })
    })
  }
}

export default function() {
  const [net, setNet] = useState(null)
  useEffect(() => {
    async function loadNet() {
      const [err, poseNet] = await to(getNet())
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        setNet(err)
        return
      }
      setNet(poseNet)
    }
    loadNet()
  }, [setNet])
  return net
}
