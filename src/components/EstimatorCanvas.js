import React from "react"
import Select from "react-select"

export default function({
  options,
  selectOption,
  selectedOption,
  intervalDelay,
  setIntervalDelay
}) {
  return (
    <>
      <Select
        value={selectedOption}
        options={options}
        onChange={selectOption}
      />
      <p>interval delay: {intervalDelay}</p>
      <input
        style={{ width: "100%" }}
        type="range"
        min="1"
        max="400"
        value={intervalDelay}
        onChange={e => setIntervalDelay(e.target.value)}
      />
      <canvas id="canvas" style={{ height: "100vh" }} />
    </>
  )
}
