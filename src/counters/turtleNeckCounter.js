import Counter from './counter'

export default class extends Counter {
  constructor(canvas) {
    super(canvas)
    this.name = 'turtleNeck'
    this.maxlen = 100
    this.deque = new Array(this.maxlen).fill(false)
    this.turtleNeck = false
    this.sensitivity = -2
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
    const { leftEar, rightEar, rightHip, rightKnee, rightShoulder } = keypoints
    if (leftEar && rightEar) {
      return
    }
    const ear = rightEar
    const hip = rightHip
    const knee = rightKnee
    const shoulder = rightShoulder
    if (!ear || !hip || !shoulder) {
      return
    }

    const sit = knee ? Math.round(knee.x - hip.x) > 20 : true
    const turtleNeck = sit
      ? shoulder.x < ear.x - this.sensitivity - 2
      : hip.x < ear.x - this.sensitivity
    this.uploadImage(`${sit ? 'sit' : 'stand'}-${turtleNeck.toString()}`)
    this.provideToDeque(turtleNeck)
    this.count = this.deque.filter((item) => item).length
    this.writeMeasurement()
  }
}
