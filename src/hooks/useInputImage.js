import { useState, useEffect } from "react"
import { getInput } from "../utils"

export default function() {
  const [inputImage, setInputImage] = useState(null)
  useEffect(() => {
    async function loadImageElement() {
      const img = await getInput()
      setInputImage(img)
    }
    loadImageElement()
  }, [])
  return inputImage
}
