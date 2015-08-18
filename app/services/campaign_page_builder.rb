class CampaignPageBuilder
  attr_reader :params

  class << self
    def create_with_plugins(params)
      new(params).create_with_plugins
    end
  end

  def initialize(params)
    @params = params
  end

  def create_with_plugins
    if page.save
      create_plugins
      push_to_queue
    end

    page
  end

  private

  def page
    @page ||= CampaignPage.new(params)
  end

  def create_plugins
    Plugins.registered.each do |plugin|
      Plugins.create_for_page(plugin, page)
    end
  end

  def push_to_queue
    ChampaignQueue.push({
      type: 'create',
      params: page.attributes
    }.as_json )
  end
end
