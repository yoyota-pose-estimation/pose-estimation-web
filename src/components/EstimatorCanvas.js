import React from "react"
import { width, height } from "../utils"

export default function({ intervalDelay, setIntervalDelay }) {
  return (
    <>
      <div>
        <p>interval delay: {intervalDelay}</p>
        <input
          style={{ width: "100%" }}
          type="range"
          min="1"
          max="400"
          value={intervalDelay}
          onChange={e => setIntervalDelay(e.target.value)}
        />
      </div>
      <canvas
        id="canvas"
        width={width}
        height={height}
        style={{ height: "100vh" }}
      />
    </>
  )
}
