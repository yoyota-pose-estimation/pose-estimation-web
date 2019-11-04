import { beep } from './utils'
import Counter from './counter'

export default class extends Counter {
  constructor(canvas) {
    super(canvas)
    this.name = 'squat'
    this.sit = false
    this.sensitivity = this.sensitivity ? this.sensitivity : 40
  }

  checkPose(keypoints) {
    const { leftHip, leftKnee } = keypoints
    const hip = leftHip
    const knee = leftKnee
    if (!hip || !knee) {
      return
    }
    const sit = Math.abs(knee.x - hip.x) > this.sensitivity

    // if (!sit) {
    // }

    if (!this.sit && sit) {
      this.count += 1
      this.sit = true
      beep.play()
    }

    this.sit = sit
  }
}
