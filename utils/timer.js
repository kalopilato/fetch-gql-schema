let startTime, endTime

const timer = {
  start: () => { startTime = new Date() },
  stop: () => { endTime = new Date() },
  elapsed: () => (endTime - startTime) / 1000,
  clear: () => {
    startTime = null
    endTime = null
  }
}

export default timer
