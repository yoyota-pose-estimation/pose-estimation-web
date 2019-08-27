import { beep } from './utils'

export default class {
  constructor() {
    this.name = 'pull up'
    this.up = 0
    this.down = 0
    this.count = 0
    this.nose = null
    this.neck = null
    this.shoulder = null
    this.elbow = null
    this.wrist = null
    this.ear = null
    this.eye = null
  }

  upPosition() {
    return this.elbow.y < this.shoulder.y
  }

  downPostionAfterUp() {
    return this.up > this.elbow.y - 2
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
      this.count = 0
    }
  }
}
