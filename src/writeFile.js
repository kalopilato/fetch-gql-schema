import { ensureDirSync } from '../utils/ensureDirSync'
import path from 'path'
import fs from 'fs'

function writeFile (data, filePath) {
  ensureDirSync(path.dirname(filePath))
  fs.writeFileSync(filePath, data)
}

export default writeFile
