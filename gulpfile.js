import gulp from 'gulp'
import { path } from './gulp/config/path.js'
import { plugins } from './gulp/config/plugins.js'
import { copy } from './gulp/tasks/copy.js'
import { reset } from './gulp/tasks/reset.js'
import { html } from './gulp/tasks/html.js'
import { server } from './gulp/tasks/server.js'
import { scss } from './gulp/tasks/scss.js'
import { js } from './gulp/tasks/js.js'
import { images } from './gulp/tasks/images.js'
import {
	convertToTtf,
	convertToWoff,
	copyWoffAndWoff2,
	generateFontStyles,
} from './gulp/tasks/fonts.js'
import { zip } from './gulp/tasks/zip.js'

global.app = {
	path: path,
	gulp: gulp,
	plugins: plugins,
}

function watcher() {
	gulp.watch(path.watch.files, copy)
	gulp.watch(path.watch.html, html)
	gulp.watch(path.watch.scss, scss)
	gulp.watch(path.watch.js, js)
	gulp.watch(path.watch.images, images)
}

const processFonts = gulp.series(
	convertToTtf,
	convertToWoff,
	copyWoffAndWoff2,
	generateFontStyles
)

const mainTasks = gulp.series(
	processFonts,
	gulp.parallel(copy, html, scss, js, images)
)

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))

const deployZIP = gulp.series(reset, mainTasks, zip)

gulp.task('default', dev)

export { deployZIP }
