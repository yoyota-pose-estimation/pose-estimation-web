import React from 'react'
import Estimator from './components/Estimator'
// import Camera from './components/Camera'
import Webcam from './components/Webcam'

function App() {
  return (
    <React.Fragment>
      {/* <Camera /> */}
      <Webcam />
      <Estimator />
    </React.Fragment>
  )
}

export default App
