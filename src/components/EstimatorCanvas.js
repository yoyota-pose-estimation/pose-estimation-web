import React from 'react'

export default function({ canvasRef, intervalDealy, setIntervalDelay }) {
  return (
    <>
      <div>
        <p>interval delay: {intervalDealy}</p>
        <input
          style={{ width: '100%' }}
          type="range"
          min="1"
          max="400"
          value={intervalDealy}
          onChange={(e) => setIntervalDelay(e.target.value)}
        />
      </div>
      <canvas ref={canvasRef} style={{ height: '100vh' }} />
    </>
  )
}
