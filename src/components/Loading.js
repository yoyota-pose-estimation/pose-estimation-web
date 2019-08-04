import React from 'react'

export default function({ loading }) {
  if (loading) {
    return <p>Loading model...</p>
  }
  return <div />
}
