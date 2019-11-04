import Counter from './counter'
import { Deque } from './utils'

function getTurtleNeckKeypoints({ keypoints, direction }) {
  return {
    ear: keypoints[`${direction}Ear`],
    hip: keypoints[`${direction}Hip`],
    knee: keypoints[`${direction}Knee`],
    shoulder: keypoints[`${direction}Shoulder`]
  }
}

function getDistance({ ear, direction, comparisonTarget }) {
  if (direction === 'left') {
    return ear.x - comparisonTarget.x
  }
  return comparisonTarget.x - ear.x
}

export default class extends Counter {
  constructor(canvas) {
    super(canvas)
    this.name = 'turtleNeck'
    this.deque = new Deque(100)
    this.sensitivity = this.sensitivity ? this.sensitivity : -8
  }

  checkPose(keypoints) {
    const { leftEar, rightEar } = keypoints
    if (leftEar && rightEar) {
      return
    }
    const direction = leftEar ? 'left' : 'right'
    const turtleNeckKeypoints = getTurtleNeckKeypoints({ keypoints, direction })
    if (!Object.values(turtleNeckKeypoints).every((point) => point)) {
      return
    }
    const { ear, hip, knee, shoulder } = turtleNeckKeypoints
    const sitting = Math.round(knee.x - hip.x) > 20
    const comparisonTarget = sitting ? shoulder : hip
    const sensitivity = sitting ? this.sensitivity + 9 : this.sensitivity
    const distance = getDistance({ ear, direction, comparisonTarget })
    const turtleNeck = distance + sensitivity < 0
    const label = `${sitting ? 'sit' : 'stand'}_${turtleNeck.toString()}`
    this.uploadImage({ label, distance })
    this.deque.insert(turtleNeck)
    this.count = this.deque.trueCount()
    // this.writeMeasurement()
    // this.writeMeasurement('turtleNeckDistance', { distance })
  }
}
