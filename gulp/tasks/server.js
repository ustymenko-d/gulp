export const server = (done) => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.paths.dist.html}`,
		},
		notify: false,
		port: 3000,
	});
};
