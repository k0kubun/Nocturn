desc 'Compile all haml templates into html'
task :compile do
  print 'Compiling haml templates...'
  start = Time.now
  Dir.glob('**/*.haml').each do |path|
    IO.popen("bundle exec hamlit #{path}", 'r+') do |haml|
      File.write(path.gsub(/\.haml$/, '.html'), haml.read)
    end
  end
  puts "done! (#{"%d" % ((Time.now - start) * 1000.0)}ms)"
end

desc 'Start with Electron.app'
task start: :compile do
  system('npm start')
end

task default: :start
