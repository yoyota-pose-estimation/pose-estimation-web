import React, { useState, useEffect } from 'react'
import Prepare from './Prepare'
import { getInput } from '../utils'
import useMergedStore from '../hooks/useMergedStore'

export default function() {
  const [loading, setLoading] = useState(true)
  const [errorText, setErrorText] = useState('')
  const {
    imageElement: { setImageElement }
  } = useMergedStore()

  useEffect(() => {
    async function loadImageElement() {
      const img = await getInput()
      if (!img) {
        setErrorText(`this browser does not support video capture,
         or this device does not have a camera`)
        return
      }
      setImageElement(img)
      setLoading(false)
    }
    loadImageElement()
  }, [setImageElement])

  return <Prepare loading={loading} errorText={errorText} />
}
