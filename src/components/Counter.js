import React, { useEffect } from "react"
import axios from "axios"
import useCanvas from "../hooks/useCanvas"
import useCounter from "../hooks/useCounter"

function uploadImageToMinio({ section, data }) {
  return axios.post(
    `https://multipart-to-minio.dudaji.org/upload/${section}`,
    data
  )
}

function uploadImage({ canvas, section, distance }) {
  const user = "yoyota"
  if (!canvas) {
    return
  }
  const date = new Date().toISOString()
  canvas.toBlob(file => {
    const data = new FormData()
    data.append("image", file, `${date}_browser_${user}_${distance}.jpg`)
    uploadImageToMinio({ data, section })
  }, "image/jpeg")
}

export default function({ keypoints, label, counter }) {
  const canvas = useCanvas()
  const { distance } = useCounter({ keypoints, counter })
  useEffect(() => {
    if (!distance) {
      return
    }
    console.log("date 2: ", new Date().getTime())
    uploadImage({ canvas, distance, section: label })
  }, [canvas, distance, label])
  return <></>
}
