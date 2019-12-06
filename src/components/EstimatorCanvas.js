import React from "react"

export default function({ intervalDelay, setIntervalDelay }) {
  return (
    <>
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
