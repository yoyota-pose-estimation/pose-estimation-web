import React, { useState } from 'react'
import PrepareContainer from './components/PrepareContainer'
import EstimatorCanvasContainer from './components/EstimatorCanvasContainer'

function App() {
  const [net, setNet] = useState()
  const [imageElement, setImageElement] = useState(new Image(50, 50))
  const props = {
    net,
    imageElement
  }
  const setProps = {
    setNet,
    setImageElement
  }
  return (
    <>
      <PrepareContainer {...setProps} />
      <EstimatorCanvasContainer {...props} />
    </>
  )
}

export default App
