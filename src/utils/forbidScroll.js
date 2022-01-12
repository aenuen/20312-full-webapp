export const forbidScroll = (elem) => {
  let flag = false

  elem.addEventListener('touchstart', (evt) => {
    flag = !!elem.contains(evt.target)
  }, false)
  elem.addEventListener('touchmove', (evt) => {
    evt.prop = flag
  })
}

const handler = (evt) => {
  if (evt.prop) {
    evt.preventDefault()
  }
}

document.body.removeEventListener('touchmove', handler, { passive: false })
document.body.addEventListener('touchmove', handler, { passive: false })
