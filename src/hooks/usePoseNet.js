import { useState } from "react"
import useCtx from "./useCtx"
import useCheckPose from "./useCheckPose"
import useDrawCanvas from "./useDrawCanvas"
import useInterval from "./useInterval"
import useCounters from "./useCounters"
import usePoseEstimator from "./usePoseEstimator"
import useMergedStore from "./useMergedStore"

export default function() {
  const {
    imageElement: { imageElement },
    intervalDelay: { intervalDelay }
  } = useMergedStore()
  const [distance, setDistance] = useState(0)
  useCtx()
  const counters = useCounters({ setDistance })
  const [poses, estimatePose] = usePoseEstimator()

  useInterval({
    intervalDelay,
    fn: () => estimatePose(imageElement)
  })
  useCheckPose({ poses, counters })
  useDrawCanvas({ poses, counters, distance })
}
