import queryString from "query-string"
import { saveToInfluxDb, uploadImageToMinio } from "./utils"

const { sensitivity, upload = true, user = "fitness" } = queryString.parse(
  window.location.search
)

export default class {
  constructor({ canvas, setDistance }) {
    this.canvas = canvas
    this.setDistance = setDistance
    this.name = ""
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
}
