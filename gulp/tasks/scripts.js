import webpack from 'webpack-stream'
import webpackConfig from '../../webpack.config.js'

export const scripts = () => {
	const src = app.paths.src.scripts
	const dest = app.paths.dist.scripts

	return app.gulp
		.src(src, { allowEmpty: true })
		.pipe(webpack(webpackConfig))
		.pipe(app.gulp.dest(dest))
		.pipe(app.plugins.browsersync.stream())
}
