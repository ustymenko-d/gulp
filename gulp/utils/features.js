import path from 'path'
import glob from 'glob'

const detectScss = () => {
	const scssFiles = glob.sync(path.join('src/css/**/*.scss'))
	return scssFiles.length > 0
}

export const isScss = detectScss()
