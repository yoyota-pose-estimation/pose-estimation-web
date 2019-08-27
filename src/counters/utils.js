import axios from 'axios'
import to from 'await-to-js'
import queryString from 'query-string'

const Influx = require('influx')

export const beep = new Audio('https://www.soundjay.com/button/beep-07.mp3')

const { slackUrl, influxdb } = queryString.parse(window.location.search)
export function sendSlackMessage(text) {
  if (!slackUrl) {
    return
  }
  axios.post(slackUrl, {
    text,
    username: 'poseNet'
  })
}

const influx = influxdb ? new Influx.InfluxDB(influxdb) : null

if (influx) {
  influx
    .getDatabaseNames()
    .then((names) => {
      if (!names.includes('counts')) {
        influx.createDatabase('counts')
      }
      return names
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

export function save(measurement, count) {
  if (!influx) {
    return
  }
  influx.writePoints([
    {
      measurement,
      fields: { count }
    }
  ])
}
