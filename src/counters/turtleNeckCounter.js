import Counter from './counter'

export default class extends Counter {
  constructor(canvas) {
    super(canvas)
    this.name = 'turtleNeck'
    this.q = []
    this.maxlen = 200
    this.turtleNeck = false
  }

  push(item) {
    if (this.q.length === this.maxlen) {
      this.q.pop()
    }
    this.q.unshift(item)
  }

  checkPose(keypoints) {
    const {
      leftEar,
      rightEar,
      rightHip,
      rightKnee,
      rightAnkle,
      rightShoulder
    } = keypoints
    if (!rightAnkle) {
      return
    }
    if (leftEar && rightEar) {
      return
    }
    const ear = rightEar
    const hip = rightHip
    const knee = rightKnee
    const shoulder = rightShoulder
    if (!ear || !hip || !knee || !shoulder) {
      return
    }

    const sit = Math.round(knee.x - hip.x) > 20
    const turtleNeck = sit
      ? shoulder.x < ear.x - this.sensitivity + -1
      : hip.x < ear.x - this.sensitivity
    this.uploadImage(`${sit ? 'sit' : 'stand'}-${turtleNeck.toString()}`)
    this.push(turtleNeck)
    this.count = this.q.filter((item) => item).length
    this.writeMeasurement()

    if (this.count > 100) {
      this.alert()
      this.q = []
    }
  }
}
