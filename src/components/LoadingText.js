import React from 'react'

export default function({ loading }) {
  if (loading) {
    return <h1>Loading model...</h1>
  }
  return <></>
}
