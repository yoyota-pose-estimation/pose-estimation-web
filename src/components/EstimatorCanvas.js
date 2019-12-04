import React from "react"

export default function({ canvasRef, intervalDelay, setIntervalDelay }) {
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
      <canvas ref={canvasRef} style={{ height: "100vh" }} />
    </>
  )
}
