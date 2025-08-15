import pug from 'gulp-pug'
import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'

export const html = () =>
	app.gulp
		.src(app.paths.src.html)
		.pipe(app.plugins.newer(app.paths.dist.html))
		.pipe(pug({ pretty: true, doctype: 'html', basedir: app.paths.srcFolder }))
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
