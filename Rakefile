desc 'Compile all haml templates into html'
task :compile do
  Dir.glob('**/*.haml').each do |path|
    puts "Compiling #{path}..."
    IO.popen("bundle exec hamlit #{path}", 'r+') do |haml|
      File.write(path.gsub(/\.haml$/, '.html'), haml.read)
    end
  end
end

task default: :compile
