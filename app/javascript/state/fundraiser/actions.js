// @flow
import ee from '../../shared/pub_sub';

import type { FundraiserAction, DonationBands, PaymentType } from './types';

export function changeAmount(payload: ?number): FundraiserAction {
  ee.emit('fundraiser:change_amount', payload);
  return { type: 'change_amount', payload };
}

export function changeCurrency(payload: string): FundraiserAction {
  ee.emit('fundraiser:change_currency', payload);
  return { type: 'change_currency', payload };
}

export function changeStep(payload: number): FundraiserAction {
  // we put it in a timeout because otherwise the event is fired before the step has switched
  setTimeout(() => ee.emit('fundraiser:change_step', payload), 100);
  return { type: 'change_step', payload };
}

export function setDirectDebitOnly(payload: boolean): FundraiserAction {
  return { type: 'set_direct_debit_only', payload };
}

export function preselectAmount(payload: boolean): FundraiserAction {
  return { type: 'preselect_amount', payload };
}

export function setDonationBands(payload: DonationBands): FundraiserAction {
  return { type: 'set_donation_bands', payload };
}

export function setPaymentType(payload: PaymentType): FundraiserAction {
  return { type: 'set_payment_type', payload };
}

export function setRecurring(payload: boolean = false): FundraiserAction {
  return { type: 'set_recurring', payload };
}

export function setStoreInVault(payload: boolean = false): FundraiserAction {
  return { type: 'set_store_in_vault', payload };
}

export function setSubmitting(payload: boolean): FundraiserAction {
  return { type: 'set_submitting', payload };
}

export function showDirectDebit(value: boolean): FundraiserAction {
  return { type: 'toggle_direct_debit', payload: value };
}

export function updateForm(payload: Object): FundraiserAction {
  return { type: 'update_form', payload };
}
