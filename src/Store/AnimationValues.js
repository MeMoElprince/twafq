const reavelAnimDowntoTop = (delay = 0) => ({
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, delay } },
})

const clipPathLeftToRight = (delay = 0, duration = 1, opacityFrom = 0, opacityTo = 0.8) => ({
  hidden: { opacity: opacityFrom, clipPath: 'inset(0 100% 0 0)' },
  visible: { opacity: opacityTo, clipPath: 'inset(0 0 0 0)', transition: { duration, delay } },
})

export {
  reavelAnimDowntoTop,
  clipPathLeftToRight
}