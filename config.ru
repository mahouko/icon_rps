require 'haml'
require 'bundler'
Bundler.require

# Do not buffer output
$stdout.sync = true
# Get working dir, fixes issues when rackup is called outside app's dir
root_path = Dir.pwd + "/public"

use Rack::Static,
  :urls => ['/styles', '/images', '/scripts'],
  :root => root_path

run lambda { |env|
  require 'haml'
  request = Rack::Request.new(env)

  path = request.path_info[1..-1]
  path = 'index' if path.empty?
  
  page = 'Not Found.'
  code = 404

  regex = /([\w\_]*)(\.html)?$/
  if regex.match(path) 
    path = regex.match(path)[1]
    
    page_html = File.expand_path(path + '.html', root_path)
    page_haml = page_html + ".haml"
    
    if File.exist?( page_html )
      page = File.read(page_html)
      code = 200
    elsif File.exist?( page_haml )
      template = File.read(page_haml)
      page = Haml::Engine.new(template).render()
      code = 200
    end
  end

  [ code, {
    'Content-Type'  => 'text/html',
    'Cache-Control' => 'public, max-age=86400'
  },
  [page] ]
}
