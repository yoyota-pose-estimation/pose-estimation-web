import React from 'react'
import LoadingText from './LoadingText'

export default function({ loading, errorText }) {
  return (
    <>
      <p>{errorText}</p>
      <LoadingText loading={loading} />
    </>
  )
}
