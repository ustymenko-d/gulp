import fs from 'fs'
import fonter from 'gulp-fonter'
import rename from 'gulp-rename'
import ttf2woff2 from 'gulp-ttf2woff2'

const removeFontsPrefix = (fontPath) => {
	return fontPath.replace(/^fonts[\\/]/, '')
}

export const convertToTtf = () =>
	app.gulp
		.src(`${app.path.src.fonts}*.otf`)
		.pipe(
			fonter({
				formats: ['ttf'],
			})
		)
		.pipe(
			rename((path) => {
				path.dirname = '.'
				path.basename = removeFontsPrefix(path.basename)
			})
		)
		.pipe(app.gulp.dest(`${app.path.src.fonts}`))

export const convertToWoff = () =>
	app.gulp
		.src(`${app.path.src.fonts}*.ttf`)
		.pipe(
			fonter({
				formats: ['woff'],
			})
		)
		.pipe(
			rename((path) => {
				path.dirname = '.'
				path.basename = removeFontsPrefix(path.basename)
			})
		)
		.pipe(app.gulp.dest(`${app.path.src.fonts}`))
		.pipe(app.gulp.src(`${app.path.src.fonts}*.ttf`))
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(`${app.path.src.fonts}`))

export const copyWoffAndWoff2 = () =>
	app.gulp
		.src(`${app.path.src.fonts}*.{woff,woff2}`)
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))

export const generateFontStyles = () => {
	let fontsStylesFile = `${app.path.srcFolder}/scss/fonts.scss`

	const fontWeightMapping = {
		thin: 100,
		extralight: 200,
		light: 300,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		heavy: 800,
		black: 900,
	}

	const getFontWeight = (fontFileName) => {
		const sortedKeys = Object.keys(fontWeightMapping).sort(
			(a, b) => b.length - a.length
		)

		const weightKey = sortedKeys.find((key) =>
			fontFileName.toLowerCase().includes(key)
		)

		return weightKey ? fontWeightMapping[weightKey] : 400
	}

	const writeFontFace = (fontName, fontFileName, fontWeight) => {
		const fontFace = `@font-face {
				font-family: '${fontName}';
				font-display: swap;
				src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
				font-weight: ${fontWeight};
				font-style: normal;
		}\r\n`
		fs.appendFile(fontsStylesFile, fontFace, () => {})
	}

	fs.readdir(app.path.build.fonts, (error, fontsFiles) => {
		if (error) {
			console.error('Error reading fonts directory:', error)
			return
		}

		if (fontsFiles && fontsFiles.length > 0) {
			if (!fs.existsSync(fontsStylesFile)) {
				fs.writeFileSync(fontsStylesFile, '')

				let processedFonts = new Set()

				fontsFiles.forEach((file) => {
					const fontFileName = file.split('.')[0]

					if (!processedFonts.has(fontFileName)) {
						const fontWeight = getFontWeight(fontFileName)
						writeFontFace(fontFileName, fontFileName, fontWeight)
						processedFonts.add(fontFileName)
					}
				})
			} else {
				console.log(
					'The scss/fonts.scss file already exists. Delete it to regenerate.'
				)
			}
		}
	})

	return app.gulp.src(`${app.path.srcFolder}`)
}
