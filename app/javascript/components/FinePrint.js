import React from 'react';
import type { Node } from 'react';
import './FinePrint.css';

type OwnProps = {
  children?: Node,
};

export default function FinePrint(props: OwnProps) {
  return <div className="FinePrint">{props.children}</div>;
}
