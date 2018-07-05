// @flow
import React from 'react';
import type { Node } from 'react';
import classnames from 'classnames';

import './Checkbox.scss';

type OwnProps = {
  className?: string,
  disabled?: boolean,
  checked?: boolean,
  defaultChecked?: boolean,
  children?: Node,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

const Checkbox = (props: OwnProps) => {
  const {
    className,
    disabled,
    defaultChecked,
    checked,
    onChange,
    children,
  } = props;
  return (
    <div className={classnames('Checkbox', className)}>
      <label className="Checkbox__label">
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
