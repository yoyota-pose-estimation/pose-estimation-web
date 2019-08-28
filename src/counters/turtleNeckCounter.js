/* eslint-disable class-methods-use-this */
import Counter from './counter'

export default class extends Counter {
  constructor() {
    super()
    this.name = 'turtleNeck'
    this.deque = []
    this.maxlen = 200
  }

  dequePush(item) {
    if (this.deque.length === this.maxlen) {
      this.deque.pop()
    }
    this.deque.unshift(item)
  }

  checkPose(keypoints) {
    const {
      nose,
      leftEar,
      rightEar,
      leftHip,
      rightHip,
      leftKnee,
      rightKnee,
      leftShoulder,
      rightShoulder
    } = keypoints
    if (leftEar && rightEar) {
      return
    }
    const ear = leftEar || rightEar
    if (!nose || !ear) {
      return
    }

    const direction = nose.x > ear.x
    const hip = direction ? rightHip : leftHip
    const knee = direction ? rightKnee : leftKnee
    const shoulder = direction ? rightShoulder : leftShoulder
    if (!hip || !knee || !shoulder) {
      return
    }
    const sit = Math.round(knee.x - hip.x) > 20
    const sensitivity = sit ? this.sensitivity + 4 : this.sensitivity
    const turtleNeck = direction
      ? shoulder.x < ear.x - sensitivity
      : shoulder.x > ear.x + sensitivity

    this.dequePush(turtleNeck)
    this.count = this.deque.filter((item) => item).length

    if (this.count > 100) {
      this.notify()
      this.deque = []
    }
  }
}
