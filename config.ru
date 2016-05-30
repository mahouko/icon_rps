require 'haml'
require 'bundler'
Bundler.require
require 'sass/plugin/rack'
use Sass::Plugin::Rack

# Do not buffer output
$stdout.sync = true
# Get working dir, fixes issues when rackup is called outside app's dir
root_path = Dir.pwd + "/public"

use Rack::Static,
  :urls => ['/stylesheets', '/images', '/scripts'],
  :root => root_path

run lambda { |env|
  require 'haml'
  request = Rack::Request.new(env)

  path = request.path_info[1..-1]
  path = 'index' if path.empty?
  
  page = 'Not Found.'
  code = 404

  regex = /(index|lizard_spock)(\.html)?$/
  if regex.match(path) 
    path = regex.match(path)[1]
    
    page_html = File.expand_path(path + '.html', root_path)
    page_haml = page_html + ".haml"
    
    if File.exist?( page_html )
      page = File.read(page_html)
      code = 200
    elsif File.exist?( page_haml )
      content_template = File.read(page_haml)
      content = Haml::Engine.new(content_template).render()
      
      layout_path = File.expand_path("game_layout.html.haml", root_path)
      layout_template = File.read(layout_path)
      page = Haml::Engine.new(layout_template).render do
        content
      end
      code = 200
    end
  end
  
  regex = /(about|rules)(\.html)?$/
  if regex.match(path) 
    path = regex.match(path)[1]
    
    page_html = File.expand_path(path + '.html', root_path)
    page_haml = page_html + ".haml"
    
    if File.exist?( page_html )
      page = File.read(page_html)
      code = 200
    elsif File.exist?( page_haml )
      content_template = File.read(page_haml)
      content = Haml::Engine.new(content_template).render()
      
      layout_path = File.expand_path("about_layout.html.haml", root_path)
      layout_template = File.read(layout_path)
      page = Haml::Engine.new(layout_template).render do
        content
      end
      code = 200
    end
  end
  
  full_path = File.expand_path(path, root_path)
  puts "full path: #{full_path}"
  if File.exist?(full_path)
    page = File.read(full_path)
    code = 200
  end

  [ code, {
    'Content-Type'  => 'text/html',
    'Cache-Control' => 'public, max-age=86400'
  },
  [page] ]
}
