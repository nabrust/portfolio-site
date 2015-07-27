var gulp = require("gulp"),
	browserSync = require("browser-sync");

gulp.task("server", function () {
	browserSync({
		port: 9000,
		server: {
			baseDir: "app"
		}
	});
});

gulp.task("watch", function() {
	gulp.watch([
		"app/*.html",
		"app/js/**/*.js",
		"app/css/**/*.css",
		"app/my_work/*.html",
		"app/my_work/js/**/*.js",
		"app/my_work/css/**/*.css",
		"app/contact_me/*.html",
		"app/contact_me/js/**/*.js",
		"app/contact_me/css/**/*.css",
		"app/login/*.html",
		"app/login/js/**/*.js",
		"app/login/css/**/*.css"
	]) .on("change", browserSync.reload);
});

gulp.task("default", ["server", "watch"]);