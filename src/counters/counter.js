import queryString from 'query-string'
import { saveToInfluxDb, sendSlackMessage, uploadImageToMinio } from './utils'

const { sensitivity, upload } = queryString.parse(window.location.search)

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

  uploadImage(label) {
    if (!upload) {
      return
    }
    if (!this.canvas) {
      return
    }
    this.canvas.toBlob((file) => {
      const data = new FormData()
      data.append('image', file, `${new Date().toISOString()}-browser.jpg`)
      return uploadImageToMinio(this.name, label, data)
    }, 'image/jpeg')
  }
}
