import { copy } from './copy.js'
import { html } from './html.js'
import { images } from './images.js'
import { js } from './js.js'
import { css } from './css.js'

export const watcher = () => {
	const { watch } = app.gulp
	const { path } = app

	watch(path.watch.files, copy)
	watch(path.watch.html, html)
	watch(path.watch.css, css)
	watch(path.watch.js, js)
	watch(path.watch.images, images)
}
