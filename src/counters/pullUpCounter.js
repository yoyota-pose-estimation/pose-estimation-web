import { beep } from './utils'
import Counter from './counter'

export default class extends Counter {
  constructor(canvas) {
    super(canvas)
    this.up = 0
    this.name = 'pullUp'
  }

  upPosition() {
    return this.elbow.y < this.shoulder.y
  }

  downPostionAfterUp() {
    return this.up > this.elbow.y - this.sensitivity
  }

  done() {
    return this.wrist.y > this.elbow.y
  }

  checkPose(keypoints) {
    const {
      leftShoulder,
      rightShoulder,
      leftElbow,
      rightElbow,
      leftWrist,
      rightWrist
    } = keypoints
    this.shoulder = leftShoulder || rightShoulder
    this.elbow = leftElbow || rightElbow

    if (!this.shoulder || !this.elbow) {
      return
    }

    if (this.upPosition()) {
      this.up = Math.max(this.up, this.elbow.y)
      return
    }

    if (this.downPostionAfterUp()) {
      beep.play()
      this.count += 1
      this.up = 0
      return
    }

    this.wrist = leftWrist || rightWrist
    if (!this.wrist) {
      return
    }
    if (this.done() && this.count > 0) {
      this.alert()
      this.count = 0
    }
  }
}
