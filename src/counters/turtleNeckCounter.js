import Counter from './counter'
import { Deque } from './utils'

function getTurtleNeckKeypoints({ keypoints, direction }) {
  return {
    ear: keypoints[`${direction}Ear`],
    hip: keypoints[`${direction}Hip`]
  }
}

function getDistance({ ear, direction, hip }) {
  if (direction === 'left') {
    return ear.x - hip.x
  }
  return hip.x - ear.x
}

function getDirection(keypoints) {
  const { leftEar, rightEar } = keypoints
  if (leftEar && rightEar) {
    return 'front'
  }
  return leftEar ? 'left' : 'right'
}

export default class extends Counter {
  constructor(canvas) {
    super(canvas)
    this.name = 'turtleNeck'
    this.deque = new Deque(100)
    this.sensitivity = this.sensitivity ? this.sensitivity : -8
  }

  checkPose(keypoints) {
    const direction = getDirection(keypoints)
    if (direction === 'front') {
      return
    }
    const turtleNeckKeypoints = getTurtleNeckKeypoints({ keypoints, direction })
    if (!Object.values(turtleNeckKeypoints).every((point) => point)) {
      return
    }
    const { ear, hip } = turtleNeckKeypoints
    const distance = getDistance({ ear, direction, hip })
    const turtleNeck = distance + this.sensitivity < 0
    this.uploadImage({ label: turtleNeck.toString(), distance })
    this.deque.insert(turtleNeck)
    this.count = this.deque.trueCount()
    // this.writeMeasurement()
    // this.writeMeasurement('turtleNeckDistance', { distance })
  }
}
