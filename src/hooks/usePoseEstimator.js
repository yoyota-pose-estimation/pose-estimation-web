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
  const [net, setNet] = useState(initialNet)
  const [poses, setPoses] = useState([])
  useEffect(() => {
    async function loadNet() {
      setNet(await getNet())
    }
    loadNet()
  }, [setNet])

  async function estimatePoses(imageElement) {
    const [err, ret] = await to(
      net.estimateMultiplePoses(imageElement, {
        maxDetections: 2,
        scoreThreshold: 0.2
      })
    )
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      // window.location.reload()
      return
    }
    setPoses(ret)
  }
  return [poses, estimatePoses]
}
