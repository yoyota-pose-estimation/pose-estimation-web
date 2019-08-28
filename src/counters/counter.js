import queryString from 'query-string'
import { sendSlackMessage, save } from './utils'

const { sensitivity } = queryString.parse(window.location.search)

export default class {
  constructor() {
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
    save(this.name, this.count)
  }
}
