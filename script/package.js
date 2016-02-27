'use strict';

require('shelljs/global');
const version = require('./version').version;

exec(`electron-packager . Nocturn --arch=x64 --out=packages/v${version} --platform=darwin,linux,win32 --version=0.33.3 --ignore=.DS_Store --ignore=accounts.json --ignore=packages/* --ignore=node_modules/bower --ignore=node_modules/electron-prebuilt --ignore=node_modules/electron-packager --ignore=node_modules/gulp --ignore=node_modules/gulp-bower --ignore=node_modules/gulp-haml --ignore=node_modules/gulp-ruby-sass`)
