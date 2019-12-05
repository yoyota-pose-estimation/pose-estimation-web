import axios from "axios"
import queryString from "query-string"

const Influx = require("influx")

export const beep = new Audio("https://www.soundjay.com/button/beep-07.mp3")

const {
  user = "fitness",
  influxdbUrl = "https://influxdb.dudaji.org:443"
} = queryString.parse(window.location.search)

export function uploadImageToMinio({ section, label, data }) {
  return axios.post(
    `https://multipart-to-minio.dudaji.org/upload/${section}/${label || ""}`,
    data
  )
}

const influx = influxdbUrl
  ? new Influx.InfluxDB(`${influxdbUrl}/${user}`)
  : null

if (influx) {
  influx
    .getDatabaseNames()
    .then(names => {
      if (!names.includes(user)) {
        influx.createDatabase(user)
      }
      return names
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

export function saveToInfluxDb(measurement, fields) {
  if (!influx) {
    return
  }
  influx.writePoints([
    {
      measurement,
      fields
    }
  ])
}

export class Deque {
  constructor(maxlen = 100) {
    this.maxlen = maxlen
    this.array = new Array(this.maxlen).fill(false)
  }

  push(item) {
    if (this.array.length === this.maxlen) {
      this.array.shift()
    }
    this.array.push(item)
  }

  unshift(item) {
    if (this.array.length === this.maxlen) {
      this.array.pop()
    }
    this.array.unshift(item)
  }

  insert(item) {
    if (item) {
      this.push(item)
    } else {
      this.unshift(item)
    }
  }

  trueCount() {
    return this.array.filter(item => item).length
  }
}
