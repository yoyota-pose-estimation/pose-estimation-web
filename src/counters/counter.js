import queryString from 'query-string'
import { saveToInfluxDb, uploadImageToMinio } from './utils'

const { sensitivity, upload = true, user = 'unknown' } = queryString.parse(
  window.location.search
)

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
      data.append(
        'image',
        file,
        `${new Date().toISOString()}-browser-${user}.jpg`
      )
      return uploadImageToMinio(this.name, label, data)
    }, 'image/jpeg')
  }
}
