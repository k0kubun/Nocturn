var glob  = require('glob');
var decaf = require('decafjs');
var fs    = require('fs');
var path  = require('path');

glob.sync('src/**/*.coffee').forEach(_path => {
  var coffeeSrc = fs.readFileSync(_path).toString();
  try {
    var js = decaf.compile(coffeeSrc);
    fs.writeFileSync(_path.replace('.coffee', '.js'), js);
    fs.unlinkSync(_path);
  } catch(e) {
    console.log('fail:', _path);
    console.log(e);
  }
});
