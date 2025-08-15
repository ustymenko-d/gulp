import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminSvgo from 'imagemin-svgo'
import imageminGifsicle from 'imagemin-gifsicle'

export const images = () => {
	const { gulp, plugins, paths } = app
	const { newer, browsersync } = plugins

	return gulp
		.src(paths.src.images)
		.pipe(newer(paths.dist.images))
		.pipe(webp({ quality: 80, method: 6 }))
		.pipe(gulp.dest(paths.dist.images))
		.pipe(gulp.src(paths.src.images))
		.pipe(newer(paths.dist.images))
		.pipe(
			imagemin([
				imageminMozjpeg({ quality: 80, progressive: true }),
				imageminPngquant({ quality: [0.7, 0.9] }),
				imageminSvgo({ plugins: [{ removeViewBox: false }] }),
				imageminGifsicle({ interlaced: true }),
			])
		)
		.pipe(gulp.dest(paths.dist.images))
		.pipe(browsersync.stream())
}
