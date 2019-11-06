import queryString from 'query-string'
import { saveToInfluxDb, uploadImageToMinio } from './utils'

const { sensitivity, upload = true, user = 'fitness' } = queryString.parse(
  window.location.search
)

export default class {
  constructor({ canvas, setDistance }) {
    this.canvas = canvas
    this.setDistance = setDistance
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

  writeMeasurement(measurement = this.name, fields = { count: this.count }) {
    saveToInfluxDb(measurement, fields)
  }

  uploadImage({ label, distance }) {
    if (!upload) {
      return
    }
    if (!this.canvas) {
      return
    }
    const date = new Date().toISOString()
    this.canvas.toBlob((file) => {
      const data = new FormData()
      data.append(
        'image',
        file,
        `${date}_browser_${user}_${distance}_${label}.jpg`
      )
      uploadImageToMinio(this.name, label, data)
    }, 'image/jpeg')
  }
}
