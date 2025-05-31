import fs from 'fs'
import path from 'path'
import fonter from 'gulp-fonter'
import rename from 'gulp-rename'
import ttf2woff2 from 'gulp-ttf2woff2'

const removeFontsPrefix = (fontPath) => fontPath.replace(/^fonts[\\/]/, '')

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
	const foundKey = sortedKeys.find((key) =>
		fontFileName.toLowerCase().includes(key)
	)
	return fontWeightMapping[foundKey] || 400
}

const writeFontFace = (fontsStylesFile, fontName, fontFileName, fontWeight) => {
	const fontFace = `@font-face {
	font-family: '${fontName}';
	font-display: swap;
	src: url("../fonts/${fontFileName}.woff2") format("woff2"),
		 url("../fonts/${fontFileName}.woff") format("woff");
	font-weight: ${fontWeight};
	font-style: normal;
}\n`
	fs.appendFileSync(fontsStylesFile, fontFace)
}

export const convertToTtf = () =>
	app.gulp
		.src(`${app.path.src.fonts}*.otf`)
		.pipe(fonter({ formats: ['ttf'] }))
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
		.pipe(fonter({ formats: ['woff'] }))
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

export const generateFontStyles = (done) => {
	const fontsStylesFile = path.join(app.path.srcFolder, 'css', 'fonts.scss')

	fs.readdir(app.path.build.fonts, (err, fontFiles) => {
		if (err) {
			console.error('Error reading fonts directory:', err)
			done()
			return
		}

		if (!fontFiles || fontFiles.length === 0) {
			console.log('No fonts found to generate styles.')
			done()
			return
		}

		if (fs.existsSync(fontsStylesFile)) {
			console.log(
				'fonts.scss already exists. Delete the file to regenerate font styles.'
			)
			done()
			return
		}

		fs.writeFileSync(fontsStylesFile, '')

		const processedFonts = new Set()

		fontFiles.forEach((file) => {
			const fontFileName = path.parse(file).name
			if (!processedFonts.has(fontFileName)) {
				const weight = getFontWeight(fontFileName)
				writeFontFace(fontsStylesFile, fontFileName, fontFileName, weight)
				processedFonts.add(fontFileName)
			}
		})

		done()
	})
}
