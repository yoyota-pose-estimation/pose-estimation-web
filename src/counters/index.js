import queryString from 'query-string'
import pullUpCounter from './pullUpCounter'
import turtleNeckCounter from './turtleNeckCounter'
import squatCounter from './squatCounter'
import bowCounter from './bowCounter'

function getCounter() {
  const parsed = queryString.parse(window.location.search)
  const allCounter = {
    pullUpCounter,
    turtleNeckCounter,
    squatCounter,
    bowCounter
  }

  if (!parsed.counter) {
    return Object.values(allCounter).map((V) => new V())
  }

  return parsed.counter.split(',').map((counter) => {
    return new allCounter[`${counter}Counter`]()
  })
}

const counters = getCounter()
export default counters
