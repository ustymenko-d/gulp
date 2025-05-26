import webpack from 'webpack-stream'

export const js = () => {
	const src = app.path.src.js
	const dest = app.path.build.js

	const copyJs = app.gulp.src(src).pipe(app.gulp.dest(dest))

	const buildJs = app.gulp
		.src(src)
		.pipe(
			webpack({
				mode: 'production',
				devtool: false,
				output: { filename: 'index.min.js' },
				module: {
					rules: [
						{
							test: /\.(sass|less|css)$/,
							use: ['style-loader', 'css-loader', 'sass-loader'],
						},
						{
							test: /\.js$/,
							exclude: /node_modules/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: ['@babel/preset-env'],
									plugins: ['@babel/plugin-transform-runtime'],
								},
							},
						},
					],
				},
				optimization: { minimize: true },
				resolve: { extensions: ['.js'] },
			})
		)
		.pipe(app.gulp.dest(dest))

	return app.plugins
		.mergeStream(copyJs, buildJs)
		.pipe(app.plugins.browsersync.stream())
}
