import { sendSlackMessage, save } from './utils'

export default class {
  constructor() {
    this.name = ''
    this.count = 0
    this.nose = null
    this.neck = null
    this.shoulder = null
    this.elbow = null
    this.wrist = null
    this.ear = null
    this.eye = null
  }

  notify() {
    sendSlackMessage(`${this.name}: ${this.count}`)
    save(this.name, this.count)
  }
}
