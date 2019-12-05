import to from "await-to-js"
import { useState } from "react"

export default function(net) {
  const [poses, setPoses] = useState([])
  async function estimatePoses(img) {
    const [err, ret] = await to(
      net.estimateMultiplePoses(img, {
        maxDetections: 2,
        scoreThreshold: 0.2
      })
    )
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      window.location.reload()
      return
    }
    setPoses(ret)
  }
  return [poses, estimatePoses]
}
