import { useEffect } from "react"

export default function({ poses, counters }) {
  useEffect(() => {
    poses.forEach(({ keypoints }) => {
      const processedKeypoints = processKeypoints({ keypoints })
      counters.forEach(counter => counter.checkPose(processedKeypoints))
    })
  }, [poses, counters])
}
