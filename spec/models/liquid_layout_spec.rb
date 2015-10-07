require 'rails_helper'

describe LiquidLayout do
  let(:layout) { create(:liquid_layout) }

  subject{ layout }

  it { is_expected.to respond_to :title }
  it { is_expected.to respond_to :content }
  it { is_expected.to respond_to :pages }
  it { is_expected.to respond_to :partial_names }
  it { is_expected.to respond_to :partial_refs }

  describe "is valid" do
    after :each do
      expect(layout).to be_valid
    end

    it "with a reference to a partial that does exist" do
      create :liquid_partial, title: 'existent'
      layout.content = "<div>{% include 'existent' %}</div>"
    end
  end

  describe "is invalid" do
    after :each do
      expect(layout).to be_invalid
    end

    it "with a blank title" do
      layout.title = " "
    end

    it "with a blank content" do
      layout.content = " "
    end

    it "with a reference to a partial that doesn't exist" do
      layout.content = "<div>{% include 'nonexistent' %}</div>"
    end
  end

  describe '.default' do
    before do
      create(:liquid_layout, title: 'default')
    end

    it 'returns default layout' do
      expect(LiquidLayout.default.title).to eq('default')
    end
  end

  describe 'plugin_refs' do
    it 'returns a list of length two arrays'
    it 'has all the plugins from its partials'
  end
end

