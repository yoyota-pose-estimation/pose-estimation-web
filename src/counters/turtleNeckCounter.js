import Counter from './counter'

function getTurtleNeckKeypoints({ keypoints, direction }) {
  return {
    ear: keypoints[`${direction}Ear`],
    hip: keypoints[`${direction}Hip`],
    knee: keypoints[`${direction}Knee`],
    shoulder: keypoints[`${direction}Shoulder`]
  }
}

function isSitting({ hip, knee }) {
  return Math.round(knee.x - hip.x) > 20
}

function isTurtleNeck({ ear, hip, shoulder, sitting, direction, sensitivity }) {
  // const sittingSensitivity = direction === 'right' ? -1 : 0

  const sittingSensitivity = 7
  const newSensitivity = sitting
    ? sensitivity + sittingSensitivity
    : sensitivity
  const comparisonTarget = sitting ? shoulder : hip

  if (direction === 'left') {
    return comparisonTarget.x - newSensitivity > ear.x
  }
  return comparisonTarget.x < ear.x - newSensitivity
}

export default class extends Counter {
  constructor(canvas) {
    super(canvas)
    this.name = 'turtleNeck'
    this.maxlen = 100
    this.deque = new Array(this.maxlen).fill(false)
    this.turtleNeck = false
    this.sensitivity = this.sensitivity ? this.sensitivity : -8
  }

  append(item) {
    if (this.deque.length === this.maxlen) {
      this.deque.shift()
    }
    this.deque.push(item)
  }

  prepend(item) {
    if (this.deque.length === this.maxlen) {
      this.deque.pop()
    }
    this.deque.unshift(item)
  }

  provideToDeque(item) {
    if (item) {
      this.append(item)
    } else {
      this.prepend(item)
    }
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
    const sitting = isSitting(turtleNeckKeypoints)
    const turtleNeck = isTurtleNeck({
      ...turtleNeckKeypoints,
      sitting,
      direction,
      sensitivity: this.sensitivity
    })
    this.uploadImage(`${sitting ? 'sit' : 'stand'}-${turtleNeck.toString()}`)
    this.provideToDeque(turtleNeck)
    this.count = this.deque.filter((item) => item).length
    this.writeMeasurement()
  }
}
