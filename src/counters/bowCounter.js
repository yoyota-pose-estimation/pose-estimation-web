import { beep } from './utils'
import Counter from './counter'

export default class extends Counter {
  constructor(canvas) {
    super(canvas)
    this.name = 'bow'
    this.stand = true
    this.down = false
    this.sensitivity = this.sensitivity ? this.sensitivity : 10
  }

  checkPose(keypoints) {
    const { rightEar, rightHip, rightKnee, rightAnkle } = keypoints
    const ear = rightEar
    const hip = rightHip
    const knee = rightKnee
    const ankle = rightAnkle
    if (!ear || !hip || !knee || !ankle) {
      return
    }

    const down = hip.y < ear.y + this.sensitivity

    if (down) {
      if (!this.down) {
        beep.play()
      }
      this.down = true
      this.uploadImage('true')
      return
    }

    const up = Math.round(ankle.y - ear.y) > 145
    if (up) {
      this.uploadImage('false')
    }

    if (this.down && up) {
      this.count += 1
      this.down = false
      beep.play()
    }
  }
}
