'use strict';

require('shelljs/global');
const version = require('./version').version;

exec(`(which ghr > /dev/null || go get github.com/tcnksm/ghr) && ghr -u k0kubun -r Nocturn v${version} packages/v${version}`);
