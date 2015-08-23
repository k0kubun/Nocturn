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
  Dir.glob('src/*.scss').each do |path|
    IO.popen("bundle exec sass #{path}", 'r+') do |css|
      src_path = path.gsub(/\.scss$/, '.css')
      File.write(src_path, css.read)
    end
  end
  puts " done! (#{"%d" % ((Time.now - start) * 1000.0)}ms)"

  print 'Compiling coffee sources...'
  start = Time.now
  %w[
    src/main.coffee
  ].each do |path|
    js = CoffeeScript.compile(File.read(path))
    src_path = path.gsub(/\.coffee$/, '.js')
    File.write(src_path, js)
  end
  puts " done! (#{"%d" % ((Time.now - start) * 1000.0)}ms)"
end

desc 'Start with Electron.app'
task start: :compile do
  system('/Applications/Electron.app/Contents/MacOS/Electron .')
end

task default: :start
