import queryString from 'query-string'
import pullUpCounter from './pullUpCounter'
import turtleNeckCounter from './turtleNeckCounter'

const { counters } = queryString.parse(window.location.search)
const allCounter = { pullUpCounter, turtleNeckCounter }

export default counters.split(',').map((counter) => {
  return new allCounter[`${counter}Counter`]()
})
