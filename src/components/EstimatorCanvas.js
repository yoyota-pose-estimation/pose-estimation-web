import React from 'react'
import Loading from './Loading'

export default function({ errorText, loading, canvasRef }) {
  return (
    <React.Fragment>
      <p>{errorText}</p>
      <Loading loading={loading} />
      <canvas ref={canvasRef} style={{ height: '100%' }} />
    </React.Fragment>
  )
}
