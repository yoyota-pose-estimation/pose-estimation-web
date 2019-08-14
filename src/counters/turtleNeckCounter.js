/* eslint-disable class-methods-use-this */
import queryString from 'query-string'
import axios from 'axios'

export default class {
  constructor() {
    this.name = 'turtle neck'
    this.count = 0
    this.deque = []
    this.maxlen = 200
  }

  dequePush(item) {
    if (this.deque.length === this.maxlen) {
      this.deque.pop()
    }
    this.deque.unshift(item)
  }

  checkPose(keypoints) {
    const { nose, leftShoulder, rightShoulder, leftEar, rightEar } = keypoints
    if (leftEar && rightEar) {
      return
    }
    const ear = leftEar || rightEar
    if (!nose || !ear) {
      return
    }
    const shoulder = nose.x > ear.x ? rightShoulder : leftShoulder
    if (!shoulder) {
      return
    }

    const sensitivity = 4
    const turtleNeck =
      nose.x > ear.x
        ? shoulder.x < ear.x - sensitivity
        : shoulder.x > ear.x + sensitivity
    this.dequePush(turtleNeck)
    this.count = this.deque.filter((item) => item).length

    if (this.count > 100) {
      this.deque = []

      const { slackUrl } = queryString.parse(window.location.search)
      axios.post(slackUrl, {
        username: 'test',
        text: 'turtle neck'
      })
    }
  }
}
