require 'coffee_script'
require 'open-uri'
require 'openssl'

desc 'Compile all haml templates into html'
task :compile do
  print 'Compiling haml sources...'
  start = Time.now
  Dir.glob('**/*.haml').each do |path|
    IO.popen("bundle exec hamlit #{path}", 'r+') do |html|
      File.write(path.gsub(/\.haml$/, '.html'), html.read)
    end
  end
  puts " done! (#{"%d" % ((Time.now - start) * 1000.0)}ms)"

  print 'Compiling sass sources...'
  start = Time.now
  Dir.glob('assets/**/*.scss').each do |path|
    IO.popen("bundle exec sass #{path}", 'r+') do |css|
      src_path = path.
        gsub(%r{^assets/stylesheets}, 'src').
        gsub(/\.scss$/, '.css')
      File.write(src_path, css.read)
    end
  end
  puts " done! (#{"%d" % ((Time.now - start) * 1000.0)}ms)"

  print 'Compiling coffee script sources...'
  start = Time.now
  prefix = "window.jQuery = window.$ = require('../jquery');"
  Dir.glob('assets/**/*.coffee').each do |path|
    js = CoffeeScript.compile(File.read(path))
    src_path = path.
      gsub(%r{^assets/javascripts}, 'src').
      gsub(/\.coffee$/, '.js')
    File.write(src_path, prefix + js)
  end
  puts " done! (#{"%d" % ((Time.now - start) * 1000.0)}ms)"

  jquery = open(
    'https://code.jquery.com/jquery-2.1.4.min.js',
    ssl_verify_mode: OpenSSL::SSL::VERIFY_NONE,
  ).read
  File.write('src/jquery.js', jquery)
end

desc 'Start with Electron.app'
task start: :compile do
  system('/Applications/Electron.app/Contents/MacOS/Electron .')
end

task default: :start
