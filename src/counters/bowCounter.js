import { beep } from './utils'
import Counter from './counter'

export default class extends Counter {
  constructor() {
    super()
    this.name = 'bow'
    this.bow = false
    this.sensitivity = this.sensitivity ? this.sensitivity : 60
  }

  checkPose(keypoints) {
    const { leftKnee, leftEar } = keypoints
    const knee = leftKnee
    const ear = leftEar
    if (!ear || !knee) {
      return
    }

    const bow = Math.abs(knee.y - ear.y) < this.sensitivity

    if (!this.bow && bow) {
      this.count += 1
      this.bow = true
      beep.play()
    }

    this.bow = bow
  }
}
