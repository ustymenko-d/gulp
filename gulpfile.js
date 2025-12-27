import gulp from 'gulp'

// Configs
import { paths } from './gulp/config/paths.js'
import { plugins } from './gulp/config/plugins.js'
import { isScss } from './gulp/utils/features.js'

// Tasks
import { copy } from './gulp/tasks/copy.js'
import { html } from './gulp/tasks/html.js'
import { styles } from './gulp/tasks/styles.js'
import { scripts } from './gulp/tasks/scripts.js'
import { images } from './gulp/tasks/images.js'
import { reset } from './gulp/tasks/reset.js'
import { watcher } from './gulp/tasks/watcher.js'
import { server } from './gulp/tasks/server.js'
import {
	convertToTtf,
	convertToWoff,
	copyWoffAndWoff2,
	generateFontStyles,
} from './gulp/tasks/fonts.js'
import { zip } from './gulp/tasks/zip.js'

global.app = { gulp, paths, plugins, isScss }

const processFonts = gulp.series(convertToTtf, convertToWoff, copyWoffAndWoff2, generateFontStyles)

const mainTasks = gulp.series(processFonts, gulp.parallel(copy, html, styles, scripts, images))

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const deployZIP = gulp.series(reset, mainTasks, zip)

export default dev
export { deployZIP as zip }
