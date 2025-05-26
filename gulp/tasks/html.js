import pug from 'gulp-pug'
import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'

export const html = () =>
	app.gulp
		.src(app.path.src.html)
		.pipe(pug({ pretty: true, doctype: 'html', basedir: app.path.srcFolder }))
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
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
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream())
