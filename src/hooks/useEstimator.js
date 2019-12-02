import to from 'await-to-js'
import useMergedStore from './useMergedStore'

export default function() {
  const {
    net: { net },
    imageElement: { imageElement },
    poses: { setPoses }
  } = useMergedStore()

  return async () => {
    const [err, ret] = await to(
      net.estimateMultiplePoses(imageElement, {
        maxDetections: 2,
        scoreThreshold: 0.2
      })
    )
    if (err) {
      window.location.reload()
      return
    }
    setPoses(ret)
  }
}
