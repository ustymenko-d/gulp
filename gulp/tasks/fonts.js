import fs from 'fs'
import path from 'path'
import glob from 'glob'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

const removeFontsPrefix = fontPath => fontPath.replace(/^fonts[\\/]/, '')

const normalizeDir = dir => dir.replace(/\\/g, '/').replace(/^fonts\//, '')

const fontWeightMapping = {
	thin: 100,
	extralight: 200,
	light: 300,
	regular: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
	extrabold: 800,
	heavy: 800,
	black: 900,
}

const getFontWeight = fontFileName => {
	if (fontFileName.toLowerCase().includes('variable')) return 'variable'
	const sortedKeys = Object.keys(fontWeightMapping).sort((a, b) => b.length - a.length)
	const foundKey = sortedKeys.find(key => fontFileName.toLowerCase().includes(key))
	return fontWeightMapping[foundKey] || 400
}

const getFontStyle = fileName => (/italic|oblique/i.test(fileName) ? 'italic' : 'normal')

const writeFontFace = (fontsStylesFile, fontName, fontFileName, weight, style) => {
	const weightCSS = weight === 'variable' ? '' : `\n  font-weight: ${weight};`
	const styleCSS = style === 'normal' ? '' : `\n  font-style: ${style};`

	const fontFace = `@font-face {
	font-family: '${fontName}';
	font-display: swap;
	src: url("../fonts/${fontFileName}.woff2") format("woff2"),
		url("../fonts/${fontFileName}.woff") format("woff");${weightCSS}${styleCSS}\n}\n\n`

	fs.appendFileSync(fontsStylesFile, fontFace)
}

export const convertToTtf = () =>
	app.gulp
		.src(`${app.paths.src.fonts}/**/*.otf`)
		.pipe(fonter({ formats: ['ttf'] }))
		.pipe(
			app.plugins.rename(path => {
				path.dirname = '.'
				path.basename = removeFontsPrefix(path.basename)
			})
		)
		.pipe(app.gulp.dest(`${app.paths.src.fonts}`))

export const convertToWoff = () =>
	app.gulp
		.src(`${app.paths.src.fonts}/**/*.ttf`)
		.pipe(fonter({ formats: ['woff'] }))
		.pipe(
			app.plugins.rename(filePath => {
				filePath.dirname = normalizeDir(filePath.dirname)
				filePath.basename = filePath.basename.replace(/\\/g, '/')
			})
		)
		.pipe(app.gulp.dest(app.paths.src.fonts))
		.pipe(app.gulp.src(`${app.paths.src.fonts}/**/*.ttf`))
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(app.paths.src.fonts))

export const copyWoffAndWoff2 = () =>
	app.gulp
		.src(`${app.paths.src.fonts}/**/*.{woff,woff2}`)
		.pipe(app.gulp.dest(`${app.paths.dist.fonts}`))

export const generateFontStyles = done => {
	const ext = app.isScss ? 'scss' : 'css'
	const fontsStylesFile = path.join(app.paths.srcFolder, 'css', `fonts.${ext}`)

	const fontFiles = glob.sync(`${app.paths.dist.fonts}/**/*.{woff,woff2}`)

	if (fontFiles.length === 0) {
		console.log('No fonts found to generate styles.')
		done()
		return
	}

	if (fs.existsSync(fontsStylesFile)) {
		console.log('fonts.scss already exists. Delete the file to regenerate font styles.')
		done()
		return
	}

	fs.writeFileSync(fontsStylesFile, '')

	const processedFonts = new Set()

	fontFiles.forEach(file => {
		const parsed = path.parse(file)
		const relDir = path.relative(app.paths.dist.fonts, parsed.dir).replace(/\\/g, '/')
		const fontFileName = path.join(relDir, parsed.name).replace(/\\/g, '/')
		const fontName = parsed.name

		if (!processedFonts.has(fontFileName)) {
			const weight = getFontWeight(fontName)
			const style = getFontStyle(fontName)
			writeFontFace(fontsStylesFile, fontName, fontFileName, weight, style)
			processedFonts.add(fontFileName)
		}
	})

	done()
}
