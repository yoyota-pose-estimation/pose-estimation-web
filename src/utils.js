import to from "await-to-js"
import queryString from "query-string"

export const width = 300
export const height = 250

function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function isMobile() {
  return isAndroid() || isiOS()
}

async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      "Browser API navigator.mediaDevices.getUserMedia not available"
    )
  }
  const video = document.createElement("video")
  video.width = width
  video.height = height

  const mobile = isMobile()
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      width: mobile ? undefined : width,
      height: mobile ? undefined : height
    }
  })
  video.srcObject = stream
  video.playsInline = true

  return new Promise(resolve => {
    video.onloadedmetadata = () => {
      resolve(video)
    }
  })
}

export async function getInput() {
  const { camUrl } = queryString.parse(window.location.search)
  if (camUrl) {
    const img = new Image(width, height)
    img.crossOrigin = "Anonymous"
    img.src = camUrl
    return img
  }
  const [err, video] = await to(setupCamera())
  if (err) {
    return null
  }
  video.play()
  return video
}

// export function uploadMultiPersonImage(canvas) {
//   canvas.toBlob((file) => {
//     const data = new FormData()
//     data.append('image', file, `${new Date().toISOString()}-browser.jpg`)
//     return uploadImageToMinio({ section: 'multiPerson', label: 'true', data })
//   }, 'image/jpeg')
// }
