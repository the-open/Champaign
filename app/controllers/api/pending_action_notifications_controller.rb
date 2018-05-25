# frozen_string_literal: true

class Api::PendingActionNotificationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :check_api_key
  before_action :get_pending_action

  def delivered
    @pending_aciton.update delivered_at: Time.now
    head :ok
  end

  def opened
    @pending_aciton.update opened_at: Time.now
    head :ok
  end

  def bounced
    @pending_aciton.update bounced_at: Time.now
    head :ok
  end

  def complaint
    @pending_aciton.update complaint: true, bounced_at: Time.now
    head :ok
  end

  def clicked
    clicked = @pending_action.clicked
    clicked << params[:url]
    @pending_aciton.update clicked: clicked
    head :ok
  end

  private

  def check_api_key
    return head :forbidden unless valid_api_key?
  end

  def get_pending_action
    @pending_aciton = PendingAction.find params[:id]
  end

  def valid_api_key?
    request.headers['X-Api-Key'] == Settings.api_key
  end
end
