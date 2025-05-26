import webp from 'gulp-webp'
import newer from 'gulp-newer'
import imagemin from 'gulp-imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminSvgo from 'imagemin-svgo'
import imageminGifsicle from 'imagemin-gifsicle'

export const images = () =>
	app.gulp
		.src(app.path.src.images)
		.pipe(newer(app.path.build.images))
		.pipe(webp({ quality: 80, method: 6 }))
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.gulp.src(app.path.src.images))
		.pipe(newer(app.path.build.images))
		.pipe(
			imagemin([
				imageminMozjpeg({ quality: 80, progressive: true }),
				imageminPngquant({ quality: [0.7, 0.9] }),
				imageminSvgo({ plugins: [{ removeViewBox: false }] }),
				imageminGifsicle({ interlaced: true }),
			])
		)
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.gulp.src(app.path.src.svg))
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.plugins.browsersync.stream())
