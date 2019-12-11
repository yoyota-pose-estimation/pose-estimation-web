export default function({ keypoints, counter }) {
  const useCounter = counter
  const count = useCounter(keypoints)
  return count
}
