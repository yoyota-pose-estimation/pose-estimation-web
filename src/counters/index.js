import queryString from 'query-string'
import pullUpCounter from './pullUpCounter'
import turtleNeckCounter from './turtleNeckCounter'

function getCounter() {
  const parsed = queryString.parse(window.location.search)
  const allCounter = { pullUpCounter, turtleNeckCounter }

  if (!parsed.counter) {
    return Object.values(allCounter).map((V) => new V())
  }

  return parsed.counter.split(',').map((counter) => {
    return new allCounter[`${counter}Counter`]()
  })
}

const counters = getCounter()
export default counters
