import { beep } from './utils'
import Counter from './counter'

function getBowKeypoints({ keypoints, direction }) {
  return {
    ear: keypoints[`${direction}Ear`],
    hip: keypoints[`${direction}Hip`],
    knee: keypoints[`${direction}Knee`]
  }
}

export default class extends Counter {
  constructor(canvas) {
    super(canvas)
    this.name = 'bow'
    this.stand = true
    this.down = false
    this.sensitivity = this.sensitivity ? this.sensitivity : 20
  }

  checkPose(keypoints) {
    const { leftEar, rightEar } = keypoints
    if (leftEar && rightEar) {
      return
    }
    const direction = leftEar ? 'left' : 'right'
    const bowKeypoints = getBowKeypoints({ keypoints, direction })
    const { ear, hip, knee } = bowKeypoints
    if (!ear || !hip) {
      return
    }

    const down = hip.y < ear.y + this.sensitivity
    if (down) {
      this.down = true
      return
    }

    if (!knee) {
      return
    }

    const up = Math.round(knee.y - ear.y) > 110
    // if (up) {
    // }

    if (this.down && up) {
      this.count += 1
      this.down = false
      beep.play()
    }
  }
}
