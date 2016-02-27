'use strict';

require('shelljs/global');
const fs = require('fs');

let json = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`));
exports.version = json['version'];
