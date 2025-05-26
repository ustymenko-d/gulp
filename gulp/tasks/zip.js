import { deleteAsync } from 'del'
import zipPlugin from 'gulp-zip'

export const zip = async () => {
	await deleteAsync(`./${app.path.rootFolder}.zip`)

	return app.gulp
		.src(`${app.path.buildFolder}/**/*.*`, { base: app.path.buildFolder })
		.pipe(zipPlugin(`${app.path.rootFolder}.zip`))
		.pipe(app.gulp.dest('./'))
}
