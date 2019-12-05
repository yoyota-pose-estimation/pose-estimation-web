import useKeypoints from "./useKeypoints"

export default function({ poses, counter }) {
  const keypoints = useKeypoints(poses)
  const count = counter(keypoints)
  return count
}
