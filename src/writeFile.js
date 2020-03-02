import path from 'path'
import fs from 'fs'

function writeFile (data, filePath) {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }

  fs.writeFileSync(filePath, data)
}

export default writeFile
