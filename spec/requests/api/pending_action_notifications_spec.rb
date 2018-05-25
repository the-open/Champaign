# frozen_string_literal: true

require 'rails_helper'

describe 'Pending Action Notifications' do
  let(:action) { create(:pending_action) }

  describe 'PUT /opened' do
    it 'stamps opened_at with current time' do
      Timecop.freeze do
        now = Time.now.utc.to_s
        put opened_api_pending_action_notification_path(action.id), headers: { 'X-Api-Key': Settings.api_key }
        expect(action.reload.opened_at.to_s).to eq(now)
      end
    end
  end

  describe 'PUT /delivered' do
    it 'stamps delivered_at with current time' do
      Timecop.freeze do
        now = Time.now.utc.to_s
        put delivered_api_pending_action_notification_path(action.id), headers: { 'X-Api-Key': Settings.api_key }
        expect(action.reload.delivered_at.to_s).to eq(now)
      end
    end
  end

  describe 'PUT /bounced' do
    it 'stamps bounced_at with current time' do
      Timecop.freeze do
        now = Time.now.utc.to_s
        put bounced_api_pending_action_notification_path(action.id), headers: { 'X-Api-Key': Settings.api_key }
        expect(action.reload.bounced_at.to_s).to eq(now)
      end
    end
  end

  describe 'PUT /complaint' do
    it 'stamps bounced_at and sets complaint to true' do
      Timecop.freeze do
        now = Time.now.utc.to_s
        put delivered_api_pending_action_notification_path(action.id), headers: { 'X-Api-Key': Settings.api_key }
        expect(action.reload.delivered_at.to_s).to eq(now)
      end
    end
  end

  describe 'PUT /' do
    it 'stamps bounced_at and sets complaint to true' do
      Timecop.freeze do
        now = Time.now.utc.to_s
        put complaint_api_pending_action_notification_path(action.id), headers: { 'X-Api-Key': Settings.api_key }
        expect(action.reload.bounced_at.to_s).to eq(now)
        expect(action.reload.complaint).to be true
      end
    end
  end
end
