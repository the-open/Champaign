import { bindAll, template } from 'lodash';
export default class PaymentMethodItem extends Backbone.View {
  constructor(options) {
    super({
      id: `payment-method-${options.model.get('id')}`,
      model: options.model,
      tagName: 'div',
      className: 'form__group payment-method-item',
    });

    bindAll(this, 'render');
    this.template = template($('#payment-method-item-template').html());
    this.model.bind('change', this.render);
  }

  render() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
}
