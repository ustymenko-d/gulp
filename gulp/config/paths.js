import path from 'path'

const rootFolder = path.basename(path.resolve())
const srcFolder = 'src'
const distFolder = 'dist'

const buildPath =
	base =>
	(...segments) =>
		path.join(base, ...segments)

const src = buildPath(srcFolder)
const dist = buildPath(distFolder)
const watch = buildPath(srcFolder)

// prettier-ignore
export const paths = {
	src: {
		html:    src('*.pug'),
		styles:  src('css',   'index.{scss,css}'),
		scripts: src('js',    'index.js'),
		images:  src('img',   '**', '*.{jpg,jpeg,png,gif,webp}'),
		svg:     src('img',   '**', '*.svg'),
		fonts:   src('fonts', '**', '*.{woff,woff2,ttf,otf}'),
		files:   src('files', '**', '*.*'),
	},

	dist: {
		html:    dist('/'),
		styles:  dist('css'),
		scripts: dist('js'),
		images:  dist('img'),
		fonts:   dist('fonts'),
		files:   dist('files'),
	},

	watch: {
		html:    watch('**', '*.pug'),
		styles:  watch('css',   '**', '*.{scss,css}'),
		scripts: watch('js',    '**', '*.js'),
		images:  watch('img',   '**', '*.{jpg,jpeg,png,gif,webp,svg}'),
		files:   watch('files', '**', '*.*'),
	},

	srcFolder,
	distFolder,
	rootFolder,
	clean: distFolder,
}
