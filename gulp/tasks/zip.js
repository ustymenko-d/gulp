export const zip = async () => {
	const { rootFolder, distFolder } = app.paths

	await app.plugins.deleteAsync(`./${rootFolder}.zip`)

	return app.gulp
		.src(`${distFolder}/**/*.*`, { base: distFolder })
		.pipe(app.plugins.zipPlugin(`${rootFolder}.zip`))
		.pipe(app.gulp.dest('./'))
}
