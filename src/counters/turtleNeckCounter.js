/* eslint-disable class-methods-use-this */
import Counter from './counter'
import { saveToInfluxDb, captureImageToMinio } from './utils'

export default class extends Counter {
  constructor(canvas) {
    super(canvas)
    this.name = 'turtleNeck'
    this.turtleNeckDeque = []
    this.normalDeque = []
    this.maxlen = 200
    this.turtleNeck = false
  }

  dequePush(item, q) {
    if (q.length === this.maxlen) {
      q.pop()
    }
    q.unshift(item)
  }

  checkPose(keypoints) {
    const {
      nose,
      leftEar,
      rightEar,
      leftHip,
      rightHip,
      leftKnee,
      rightKnee
    } = keypoints
    if (leftEar && rightEar) {
      return
    }
    // const ear = leftEar || rightEar
    const ear = rightEar
    if (!nose || !ear) {
      return
    }

    // const direction = nose.x > ear.x
    const direction = true
    const hip = direction ? rightHip : leftHip
    const knee = direction ? rightKnee : leftKnee
    if (!hip || !knee) {
      return
    }
    const sit = Math.round(knee.x - hip.x) > 20
    const sensitivity = sit ? this.sensitivity - 2 : this.sensitivity
    const turtleNeck = direction
      ? hip.x < ear.x - sensitivity
      : hip.x > ear.x + sensitivity

    this.dequePush(turtleNeck, this.turtleNeckDeque)
    this.count = this.turtleNeckDeque.filter((item) => item).length

    if (this.count > 100) {
      this.captureImage('true')
      this.uploadImage('true')
      this.notify()
      this.turtleNeckDeque = []
      this.turtleNeck = true
      return
    }

    this.dequePush(this.count < 1, this.normalDeque)
    const normalCount = this.normalDeque.filter((item) => item).length
    if (normalCount > 100) {
      this.captureImage('false')
      this.uploadImage('false')
      this.normalDeque = []
      saveToInfluxDb(this.name, 1)
    }
  }
}
