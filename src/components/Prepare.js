import React from "react"

export default function(params) {
  const { net, inputImage } = params
  return (
    <>
      <p>{net ? "" : "loading posenet model.."}</p>
      <p>
        {inputImage
          ? ""
          : "this browser does not support video capture, or this device does not have a camera"}
      </p>
    </>
  )
}
