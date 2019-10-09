import React from 'react'

export default function({ canvasRef }) {
  return (
    <>
      <canvas ref={canvasRef} style={{ width: '100%' }} />
    </>
  )
}
