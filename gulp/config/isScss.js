import path from 'path'
import glob from 'glob'

const scssFiles = glob.sync(path.join('src/css/**/*.scss'))

export const isScss = scssFiles.length > 0
