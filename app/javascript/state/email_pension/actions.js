// @flow
export type Fund = {
  _id: string,
  name: string,
  email: string,
  [key: string]: string,
};
export type EmailTargetState = {
  name: string,
  email: string,
  isSubmitting: boolean,
  emailSubject: string,
  fundContact: string,
  fundEmail: string,
  fundContact: string,
  fundId: string,
  fund?: Fund,
  country: string,
  pensionFunds?: Fund[],
};

export type EmailTargetAction =
  | { type: 'email_target:change_submitting', submitting: boolean }
  | { type: 'email_target:change_body', emailBody: string }
  | { type: 'email_target:change_country', country: string }
  | { type: 'email_target:change_subject', emailSubject: string }
  | { type: 'email_target:change_name', name: string }
  | { type: 'email_target:change_email', email: string }
  | { type: 'email_target:change_fund', fund?: Fund }
  | { type: 'email_target:change_pension_funds', funds: any };

const initialState = {
  name: '',
  email: '',
  isSubmitting: false,
  emailSubject: '',
  emailBody: '',
  fundContact: '',
  fundEmail: '',
  fundContact: '',
  fundId: '',
  fund: undefined,
  country: '',
};

export const reducer = (
  state: EmailTargetState = initialState,
  action: EmailTargetAction
): EmailTargetState => {
  switch (action.type) {
    case 'email_target:change_submitting':
      return { ...state, isSubmitting: action.submitting };
    case 'email_target:change_country':
      return { ...state, country: action.country };
    case 'email_target:change_body':
      return { ...state, emailBody: action.emailBody };
    case 'email_target:change_subject':
      return { ...state, emailSubject: action.emailSubject };
    case 'email_target:change_email':
      return { ...state, email: action.email };
    case 'email_target:change_name':
      return { ...state, name: action.name };
    case 'email_target:change_pension_funds':
      return { ...state, pensionFunds: action.funds };
    case 'email_target:change_fund':
      const fund = action.fund;

      if (!fund) {
        return {
          ...state,
          fundEmail: undefined,
          fundContact: undefined,
          fundId: undefined,
          fund: undefined,
        };
      }

      return {
        ...state,
        fundEmail: fund.email,
        fundContact: fund.name,
        fundId: fund._id,
        // $FlowIgnore
        fund: fund.fund,
      };
    case 'email_target:initialize':
      const { email, name, emailSubject, country, fundId } = action.payload;
      return { ...state, email, name, emailSubject, country, fundId };
    default:
      return state;
  }
};

export const changeSubmitting = (submitting: boolean) => {
  return { type: 'email_target:change_submitting', submitting };
};

export const changeBody = (emailBody: string) => {
  return { type: 'email_target:change_body', emailBody };
};

export const changeCountry = (country: string) => {
  return { type: 'email_target:change_country', country };
};

export const changeSubject = (emailSubject: string) => {
  return { type: 'email_target:change_subject', emailSubject };
};

export const changeName = (name: string) => {
  return { type: 'email_target:change_name', name };
};

export const changeEmail = (email: string) => {
  return { type: 'email_target:change_email', email };
};

export const changeFund = (fund?: Fund) => {
  return { type: 'email_target:change_fund', fund };
};

export const changePensionFunds = (funds: Fund[]) => {
  return { type: 'email_target:change_pension_funds', funds };
};
