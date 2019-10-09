import React, { useState, useEffect } from 'react'
import { getNet, getInput } from './utils'
import Prepare from './Prepare'

export default function({ setNet, setImageElement }) {
  const [loading, setLoading] = useState(true)
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    async function loadNet() {
      const net = await getNet()
      setNet(net)
      setLoading(false)
    }

    async function loadImageElement() {
      const img = await getInput()
      if (!img) {
        setErrorText(`this browser does not support video capture,
         or this device does not have a camera`)
        return
      }
      setImageElement(img)
    }
    loadNet()
    loadImageElement()
  }, [setNet, setImageElement])

  return <Prepare loading={loading} errorText={errorText} />
}
