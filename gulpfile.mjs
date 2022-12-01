import gulp from 'gulp'
import terser from 'gulp-terser'
import rename from 'gulp-rename'

function minifyJS() {
    return gulp.src("./public/js/app.js").pipe(terser()).pipe(rename({suffix: ".min"})).pipe(gulp.dest("./public/js"))
}

function watchJS() {
    gulp.watch("./public/js/app.js", minifyJS)
}

export const watch = watchJS
export default minifyJS