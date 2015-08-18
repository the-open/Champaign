class FormsController < ApplicationController
  before_action :authenticate_user!, except: [:show, :create]

  def index
  end

  def show
    @form = Form.find params[:id]
  end

  def create
    @form = Form.create(title: params[:form][:title])
    redirect_to @form
  end

  def new
    @form = Form.new
  end
end