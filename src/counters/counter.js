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

  notify() {
    sendSlackMessage(`${this.name}: ${this.count}`)
    saveToInfluxDb(this.name, this.count)
  }

  captureImage(label) {
    captureImageToMinio(this.name, label)
  }

  uploadImage(label) {
    if (!this.canvas) {
      return
    }
    this.canvas.toBlob((file) => {
      const data = new FormData()
      data.append('image', file, `browser-${new Date().toUTCString()}.jpg`)
      uploadImageToMinio(this.name, label, data)
    }, 'image/jpeg')
  }
}
