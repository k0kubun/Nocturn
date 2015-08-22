desc 'Compile all haml templates into html'
task :compile do
  print 'Compiling haml templates...'
  start = Time.now
  Dir.glob('**/*.haml').each do |path|
    IO.popen("bundle exec hamlit #{path}", 'r+') do |html|
      File.write(path.gsub(/\.haml$/, '.html'), html.read)
    end
  end
  puts "done! (#{"%d" % ((Time.now - start) * 1000.0)}ms)"

  print 'Compiling sass templates...'
  start = Time.now
  Dir.glob('assets/**/*.scss').each do |path|
    IO.popen("bundle exec sass #{path}", 'r+') do |css|
      File.write(path.gsub(/^assets/, 'src').gsub(/\.scss$/, '.css'), css.read)
    end
  end
  puts "done! (#{"%d" % ((Time.now - start) * 1000.0)}ms)"
end

desc 'Start with Electron.app'
task start: :compile do
  system('npm start')
end

task default: :start
