import fs from 'fs'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

export const copyWoffAndWoff2 = () => {
	return app.gulp
		.src(`${app.path.srcFolder}/fonts/*.{woff,woff2}`, {})
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const otfToTtf = () => {
	return app.gulp
		.src(`${app.path.srcFolder}/fonts/*.otf`, {})
		.pipe(
			fonter({
				formats: ['ttf'],
			})
		)
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
	return app.gulp
		.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
		.pipe(
			fonter({
				formats: ['woff'],
			})
		)
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		.pipe(ttf2woff2())
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const generateFontStyles = () => {
	let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`

	const getFontWeight = (weight) => {
		const weightMap = {
			thin: 100,
			extralight: 200,
			light: 300,
			regular: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
			extrabold: 800,
			black: 900,
		}
		return weightMap[weight.toLowerCase()] || 400
	}

	fs.readdir(app.path.build.fonts, function (error, fontFiles) {
		if (error) {
			console.error('Error reading font files:', error)
			done(error)
			return
		}

		if (fontFiles) {
			if (!fs.existsSync(fontsFile)) {
				fs.writeFileSync(fontsFile, '')
				let loggedFonts = new Set()

				fontFiles.forEach((file) => {
					const baseName = file.split('.')[0]
					const [fontName, fontWeightRaw] = baseName.split('-')
					const fontWeight = getFontWeight(fontWeightRaw || 'regular')

					if (!loggedFonts.has(baseName)) {
						fs.appendFileSync(
							fontsFile,
							`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${baseName}.woff2") format("woff2"), url("../fonts/${baseName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`
						)
						loggedFonts.add(baseName)
					}
				})
			} else {
				console.log('scss/fonts.scss already exists. Delete it to regenerate.')
			}
		}
	})
	return app.gulp.src(`${app.path.srcFolder}`)
}
