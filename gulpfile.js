import gulp from 'gulp'

// Configs
import { path } from './gulp/config/path.js'
import { plugins } from './gulp/config/plugins.js'

// Tasks
import { copy } from './gulp/tasks/copy.js'
import { html } from './gulp/tasks/html.js'
import { css } from './gulp/tasks/css.js'
import { js } from './gulp/tasks/js.js'
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

global.app = { path, gulp, plugins }

const processFonts = gulp.series(
	convertToTtf,
	convertToWoff,
	copyWoffAndWoff2,
	generateFontStyles
)

const mainTasks = gulp.series(
	processFonts,
	gulp.parallel(copy, html, css, js, images)
)

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const deployZIP = gulp.series(reset, mainTasks, zip)

// gulp.task('default', dev)
// gulp.task('zip', deployZIP)

export default dev
export { deployZIP as zip }
