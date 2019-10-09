import React from 'react'

export default function() {
  const cameraUrls = new Array(2).map(
    (_, i) => `https://vstarcam-${i}.dudaji.org`
  )
  return (
    <>
      {cameraUrls.map((src) => (
        <img src={src} alt="" width="300px" height="300px" />
      ))}
    </>
  )
}
