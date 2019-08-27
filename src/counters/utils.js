import axios from 'axios'
import queryString from 'query-string'

export const beep = new Audio('https://www.soundjay.com/button/beep-07.mp3')

const { slackUrl } = queryString.parse(window.location.search)
export function sendSlackMessage(text) {
  if (!slackUrl) {
    return
  }
  axios.post(slackUrl, {
    text,
    username: 'poseNet'
  })
}
