import queryString from "query-string"
import pullUpCounter from "./pullUpCounter"
import turtleNeckCounter from "./turtleNeckCounter"
import squatCounter from "./squatCounter"
import bowCounter from "./bowCounter"

function getCounter({ canvas, setDistance }) {
  const parsed = queryString.parse(window.location.search)
  const allCounter = {
    pullUpCounter,
    turtleNeckCounter,
    squatCounter,
    bowCounter
  }

  if (!parsed.counter) {
    return Object.values(allCounter).map(V => new V({ canvas, setDistance }))
  }

  return parsed.counter.split(",").map(counter => {
    return new allCounter[`${counter}Counter`]({ canvas, setDistance })
  })
}

export default getCounter
