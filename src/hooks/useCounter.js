import useKeypoints from "./useKeypoints"

export default function({ poses, counter }) {
  const keypoints = useKeypoints(poses)
  const useCounter = counter
  const count = useCounter(keypoints)

  return count
}
