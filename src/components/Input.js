import React from 'react'
import queryString from 'query-string'
import Camera from './Camera'

export default function() {
  const { src } = queryString.parse(window.location.search)
  if (src) {
    return (
      <img
        id="input"
        width="300"
        height="250"
        src={src}
        alt=""
        style={{ display: 'none' }}
      />
    )
  }
  return <Camera />
}
