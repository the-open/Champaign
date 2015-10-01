require 'share_progress'

class Share::SharesController < ApplicationController
  before_filter :set_resource
  before_filter :find_page

  def new
    @share = share_class.new(new_defaults)
    render 'share/new'
  end

  def edit
    @share = share_class.find params[:id]
    render 'share/edit'
  end

  def index
    @variations = share_class.where(page_id: @page.id)
    render 'share/index'
  end

  def update
    @share = ShareProgressVariantBuilder.update(permitted_params, {
      variant_type: @resource.to_sym,
      page: @page,
      url: page_url(@page),
      id: params[:id]
    })

    respond_to do |format|
      if @share.errors.empty?
        format.html { redirect_to index_path }
      else
        format.html { render 'share/edit' }
      end
    end
  end

  def create
    @share = ShareProgressVariantBuilder.create(permitted_params, {
      variant_type: @resource.to_sym,
      page: @page,
      url: page_url(@page)
    })

    respond_to do |format|
      if @share.errors.empty?
        format.html { redirect_to index_path }
      else
        format.html { render 'share/new' }
      end
    end
  end

  private

  #
  # Assigns resource name, which is taken from controller's class name.
  # +Share::TwittersController+ becomes +twitter+
  #
  def set_resource
    @resource = self.class.name.demodulize.gsub('Controller', '').downcase.singularize
  end

  def find_page
    @page = Page.find params[:page_id]
  end

  def index_path
    send("page_share_#{@resource.pluralize}_path", @page)
  end
end
