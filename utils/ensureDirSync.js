const fs = require('fs')

const ensureDirSync = (dirpath) => {
  try {
    fs.mkdirSync(dirpath, { recursive: true })
  } catch (err) {
    if (err.code !== "EEXIST") throw err
  }
}

module.exports = {
  ensureDirSync
}