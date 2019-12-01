export const net = {
  state: {
    net: {
      estimateSinglePose() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ keypoints: [] })
          })
        })
      },
      estimateMultiplePoses() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([{ keypoints: [] }])
          })
        })
      }
    }
  },
  reducers: {
    setNet(_, payload) {
      return { net: payload }
    }
  }
}

export const imageElement = {
  state: {
    imageElement: new Image(300, 250)
  },
  reducers: {
    setImageElement(_, payload) {
      return { imageElement: payload }
    }
  }
}

export const intervalDelay = {
  state: {
    intervalDelay: 200
  },
  reducers: {
    setIntervalDelay(_, payload) {
      return { intervalDelay: payload }
    }
  }
}

export const poses = {
  state: {
    poses: []
  },
  reducers: {
    setPoses(_, payload) {
      return { poses: payload }
    }
  }
}

export const canvas = {
  state: {
    canvas: document.createElement('canvas')
  },
  reducers: {
    setCanvas(_, payload) {
      return { canvas: payload }
    }
  }
}

export const ctx = {
  state: {
    ctx: document.createElement('canvas').getContext('2d')
  },
  reducers: {
    setCtx(_, payload) {
      return { ctx: payload }
    }
  }
}
