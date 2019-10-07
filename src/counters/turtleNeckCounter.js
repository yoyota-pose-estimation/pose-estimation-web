import Counter from './counter'

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
      leftEar,
      rightEar,
      leftHip,
      leftKnee,
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
      ? shoulder.x < ear.x + this.sensitivity + -1
      : hip.x < ear.x + this.sensitivity
    this.uploadImage(`${sit ? 'sit' : 'stand'}-${turtleNeck.toString()}`)
    this.dequePush(turtleNeck, this.turtleNeckDeque)
    this.count = this.turtleNeckDeque.filter((item) => item).length

    if (this.count > 100) {
      this.alert()
      this.writeMeasurement()
      this.turtleNeckDeque = []
      this.turtleNeck = true
      return
    }

    this.dequePush(this.count < 1, this.normalDeque)
    const normalCount = this.normalDeque.filter((item) => item).length
    if (normalCount > 100) {
      this.normalDeque = []
      this.writeMeasurement(1)
    }
  }
}
