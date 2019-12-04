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

export const canvas = {
  state: {
    canvas: document.createElement("canvas")
  },
  reducers: {
    setCanvas(_, payload) {
      return { canvas: payload }
    }
  }
}

export const ctx = {
  state: {
    ctx: document.createElement("canvas").getContext("2d")
  },
  reducers: {
    setCtx(_, payload) {
      return { ctx: payload }
    }
  }
}
