import pug from 'gulp-pug'
import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'
import path from 'path'

export const html = () => {
	const pugFiles = app.gulp
		.src(path.join(app.paths.srcFolder, '*.pug'), { allowEmpty: true })
		.pipe(app.plugins.newer(app.paths.dist.html))
		.pipe(pug({ pretty: true, doctype: 'html', basedir: app.paths.srcFolder }))

	const htmlFiles = app.gulp
		.src(path.join(app.paths.srcFolder, '*.html'), { allowEmpty: true })
		.pipe(app.plugins.newer(app.paths.dist.html))

	return app.plugins
		.mergeStream(pugFiles, htmlFiles)
		.pipe(webpHtmlNosvg())
		.pipe(
			versionNumber({
				value: '%DT%',
				append: {
					key: '_v',
					cover: 0,
					to: ['css', 'js'],
				},
			})
		)
		.pipe(app.gulp.dest(app.paths.dist.html))
		.pipe(app.plugins.browsersync.stream())
}
