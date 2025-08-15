import { copy } from './copy.js'
import { html } from './html.js'
import { styles } from './styles.js'
import { scripts } from './scripts.js'
import { images } from './images.js'

export const watcher = () => {
	const { watch } = app.gulp
	const { watch: watchPaths } = app.paths

	watch(watchPaths.files, copy)
	watch(watchPaths.html, html)
	watch(watchPaths.styles, styles)
	watch(watchPaths.scripts, scripts)
	watch(watchPaths.images, images)
}
