module LiquidMarkupSeeder
  extend self

  def seed
    partials.each{ |path| create(path) }
    layouts.each { |path| create(path) }
  end

  def read(file_path)
    File.read(file_path)
  end

  def create(path)
    title, klass = title_and_class(path)

    klass.constantize.find_or_create_by(title: title) do |view|
      view.content = read(path)
    end
  end

  def partials
    Dir.glob(
      [
       "#{Rails.root}/app/views/plugins/**/_*.liquid",
       "#{Rails.root}/app/liquid/views/partials/_*.liquid"
      ]
    )
  end

  def layouts
    Dir.glob(["#{Rails.root}/app/liquid/views/layouts/*.liquid"])
  end

  def title_and_class(file)
    [parse_name(file), klass(file)]
  end

  def parse_name(file)
    file.split('/').
      last.
      gsub(/^\_|\.liquid$/, '')
  end

  def klass(file)
    file =~ /\_\w+\.liquid$/ ? 'LiquidPartial' : 'LiquidLayout'
  end
end

