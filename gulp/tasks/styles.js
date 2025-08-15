import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import cleanCss from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'

const sass = gulpSass(dartSass)

export const styles = () => {
	const { src, dest } = app.gulp
	const { styles: srcStyles } = app.paths.src
	const { styles: distStyles } = app.paths.dist

	let stream = src(srcStyles, { sourcemaps: true })

	if (app.isScss) {
		stream = stream
			.pipe(
				sass({
					outputStyle: 'expanded',
					includePaths: ['node_modules'],
				})
			)
			.pipe(
				autoprefixer({
					overrideBrowserslist: ['last 3 versions'],
					cascade: true,
				})
			)
	}

	return stream
		.pipe(dest(distStyles))
		.pipe(cleanCss({ level: 2 }))
		.pipe(app.plugins.rename({ suffix: '.min' }))
		.pipe(dest(distStyles))
		.pipe(app.plugins.browsersync.stream())
}
