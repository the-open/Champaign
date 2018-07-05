// @flow

import React from 'react';
import type { Node } from 'react';

type OwnProps = {
  children?: Node,
};
export default function PaymentMethodWrapper(props: OwnProps) {
  return (
    <div className="PaymentMethodWrapper">
      <i className="PaymentMethodWrapper__icon fa fa-credit-card" />
      {props.children}
    </div>
  );
}
