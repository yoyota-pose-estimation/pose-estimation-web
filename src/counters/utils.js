import axios from 'axios'
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

export async function uploadImageToMinio(section, label, file) {
  await axios.post(
    `https://multipart-to-minio.dudaji.org/upload/${section}/${label || ''}`,
    file
  )
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

export function saveToInfluxDb(measurement, count) {
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
