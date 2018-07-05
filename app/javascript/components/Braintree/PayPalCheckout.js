// @flow
import { Component } from 'react';
import paypalCheckout from 'braintree-web/paypal-checkout';
import type {
  VaultFlowOptions,
  CheckoutFlowOptions,
  PayPalCheckout,
  Client,
} from 'braintree-web';

type OwnProps = {
  currency: string,
  amount: number,
  client: Client,
  vault: boolean,
  onInit?: () => void,
  onFailure?: (data: any) => void,
};

type OwnState = {
  paypalInstance: ?PayPalCheckout,
  disabled: boolean,
};

export default class PayPal extends Component<OwnProps, OwnState> {
  constructor(props: OwnProps) {
    super(props);
    this.state = {
      paypalInstance: null,
      disabled: true,
    };
  }

  componentDidMount() {
    this.createPayPalInstance(this.props.client);
  }

  componentWillReceiveProps(newProps: OwnProps) {
    if (newProps.client !== this.props.client) {
      this.createPayPalInstance(newProps.client);
    }
  }

  createPayPalInstance(client: any) {
    paypalCheckout.create({ client }, this.onPayPalCreate);
  }

  onPayPalCreate = (error: any, paypalInstance: any) => {
    if (error) {
      throw error;
    }

    this.setState({ paypalInstance, disabled: false }, () => {
      if (this.props.onInit) {
        this.props.onInit();
      }
    });
  };

  componentWillUnmount() {
    if (this.state.paypalInstance) {
      this.state.paypalInstance.teardown();
    }
  }

  flow(): 'vault' | 'checkout' {
    if (this.props.vault) return 'vault';
    return 'checkout';
  }

  tokenizeOptions(): VaultFlowOptions | CheckoutFlowOptions {
    const { amount, currency, vault } = this.props;
    if (vault) {
      return { flow: 'vault' };
    }
    return { flow: 'checkout', amount, currency };
  }

  submit() {
    const paypalInstance = this.state.paypalInstance;
    if (paypalInstance)
      return paypalInstance.createPayment(this.tokenizeOptions());
  }

  render() {
    return null;
  }
}
