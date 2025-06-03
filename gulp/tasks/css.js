import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'
import cleanCss from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'

const sass = gulpSass(dartSass)

export const css = () =>
	app.gulp
		.src(app.path.src.css, { sourcemaps: true })
		.pipe(
			sass({
				outputStyle: 'expanded',
				includePaths: ['./node_modules'],
			})
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 3 versions'],
				cascade: true,
			})
		)
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(
			cleanCss({
				level: { 2: { removeDuplicateRules: true } },
			})
		)
		.pipe(rename({ suffix: '.min' }))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream())
