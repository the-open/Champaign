// @flow
import React from 'react';
import { render } from 'react-dom';
import type { Store } from 'redux';
import type { AppState } from '../state';
import type {
  FundraiserAction,
  DonationBands,
} from '../state/fundraiser/types';
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
  el: ?HTMLElement,
  store: Store<AppState, FundraiserAction>,
};

class Fundraiser {
  el: ?HTMLElement;
  store: Store<AppState, FundraiserAction>;
  constructor(config: FundraiserConfig) {
    this.el = config.el;
    this.store = config.store;
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

  currency(currency?: string): string {
    if (currency) this.store.dispatch(changeCurrency(currency));
    return this.state().currency;
  }

  donationBands(donationBands?: DonationBands) {
    if (donationBands) this.store.dispatch(setDonationBands(donationBands));
    return this.state().donationBands;
  }

  _mount() {
    import('./FundraiserView').then(m => {
      render(<m.default />, this.el);
    });
  }
}

// Usage:
const myFundraiser = new Fundraiser({
  el: document.getElementById('fundraiser-container'),
  store: window.champaign.store,
});
