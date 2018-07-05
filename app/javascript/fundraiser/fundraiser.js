// @flow
import React from 'react';
import { render } from 'react-dom';
import Loadable from 'react-loadable';
import ComponentWrapper from '../components/ComponentWrapper';
import type { Store } from 'redux';
import type { AppState } from '../state';
import type {
  FundraiserAction,
  DonationBands,
} from '../state/fundraiser/types';
import type { Field } from '../components/FieldShape/FieldShape';
import {
  changeAmount,
  changeCurrency,
  changeStep,
  preselectAmount,
  setDonationBands,
  setRecurring,
  setStoreInVault,
  setPaymentType,
  showDirectDebit,
} from '../state/fundraiser/actions';

type FundraiserConfig = {
  fields: Field[],
  freestanding?: boolean,
  locale: string,
  pageId: string,
  preselectAmount: boolean,
  recurringDefault: string,
  title: string,
};
type FundraiserOptions = {
  el: ?HTMLElement,
  store: Store<AppState, FundraiserAction>,
  config: FundraiserConfig,
};

export default class Fundraiser {
  el: ?HTMLElement;
  store: Store<AppState, FundraiserAction>;
  config: FundraiserConfig;
  constructor(options: FundraiserOptions) {
    this.el = options.el;
    this.store = options.store;
    this.config = options.config;
    if (this.el) this._mount();
  }

  state(): $PropertyType<AppState, 'fundraiser'> {
    return this.store.getState().fundraiser;
  }

  showDirectDebit(value: boolean): void {
    this.store.dispatch(showDirectDebit(value));
  }

  preselectAmount(value: boolean): void {
    this.store.dispatch(preselectAmount(value));
  }

  amount(amount?: number) {
    if (amount && amount >= 1) this.store.dispatch(changeAmount(amount));
    return this.state().donationAmount;
  }

  currency(currency?: string) {
    if (currency) this.store.dispatch(changeCurrency(currency));
    return this.state().currency;
  }

  donationBands(donationBands?: DonationBands) {
    if (donationBands) this.store.dispatch(setDonationBands(donationBands));
    return this.state().donationBands;
  }

  _mount() {
    render(
      <ComponentWrapper
        store={this.store}
        locale={this.config.locale}
        optimizelyHook={window.optimizelyHook}
      >
        <LoadableFundraiser />,
      </ComponentWrapper>,
      this.el
    );
  }
}

const LoadableFundraiser = Loadable({
  loader: () => import('./FundraiserView'),
  loading: () => 'Loading Sidebar...',
});
