import { beep } from './utils'
import Counter from './counter'

export default class extends Counter {
  constructor(canvas) {
    super(canvas)
    this.name = 'bow'
    this.stand = true
    this.down = false
    this.sensitivity = this.sensitivity ? this.sensitivity : 5
    this.captured = false
  }

  captureTrueImage() {
    if (!this.captured) {
      this.captured = true
      this.captureImage('true')
    }
  }

  checkPose(keypoints) {
    const { rightEar, rightHip, rightKnee } = keypoints
    const ear = rightEar
    const hip = rightHip
    const knee = rightKnee
    if (!ear || !hip || !knee) {
      return
    }

    const down = hip.y < ear.y + this.sensitivity

    if (down) {
      this.down = true
      this.uploadImage('true')
      this.captureTrueImage()
      return
    }

    const up = Math.round(knee.x - hip.x) < 10
    if (this.down && up) {
      this.count += 1
      this.down = false
      this.uploadImage('false')
      this.captureImage('false')
      this.captured = false
      beep.play()
    }
  }
}
