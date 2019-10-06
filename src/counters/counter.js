import queryString from 'query-string'
import {
  captureImageToMinio,
  saveToInfluxDb,
  sendSlackMessage,
  uploadImageToMinio
} from './utils'

const { sensitivity } = queryString.parse(window.location.search)

export default class {
  constructor(canvas) {
    this.canvas = canvas
    this.name = ''
    this.count = 0
    this.ear = null
    this.eye = null
    this.nose = null
    this.neck = null
    this.elbow = null
    this.wrist = null
    this.shoulder = null
    this.sensitivity = parseInt(sensitivity, 10) || 0
  }

  alert() {
    sendSlackMessage(`${this.name}: ${this.count}`)
  }

  writeMeasurement(count = this.count) {
    saveToInfluxDb(this.name, count)
  }

  captureImage(label) {
    return captureImageToMinio(this.name, label)
  }

  uploadImage(label) {
    if (!this.canvas) {
      return
    }
    this.canvas.toBlob((file) => {
      const data = new FormData()
      data.append('image', file, `browser-${new Date().toISOString()}.jpg`)
      return uploadImageToMinio(this.name, label, data)
    }, 'image/jpeg')
  }
}
