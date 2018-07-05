// @flow
import React from 'react';
import classnames from 'classnames';
import './FormGroup.scss';
import type { Node } from 'react';

type Props = {
  className?: string,
  children: Node,
};

export default function FormGroup(props: Props): React$Element<any> {
  const className = classnames('FormGroup', 'form__group', props.className);
  return <div className={className}>{props.children}</div>;
}
