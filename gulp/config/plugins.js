import newer from 'gulp-newer'
import rename from 'gulp-rename'
import replace from 'gulp-replace'
import browsersync from 'browser-sync'
import mergeStream from 'merge-stream'
import { deleteAsync } from 'del'
import zipPlugin from 'gulp-zip'

export const plugins = { newer, rename, replace, mergeStream, browsersync, deleteAsync, zipPlugin }
