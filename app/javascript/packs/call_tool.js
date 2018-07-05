// @flow
import React from 'react';
import { render } from 'react-dom';
import { camelizeKeys } from '../util/util';
import Wrapper from '../components/ComponentWrapper';
import CallToolView from '../call_tool/CallToolView';

function mount(element, props, Component = CallToolView) {
  render(
    <Wrapper locale={props.locale} optimizelyHook={window.optimizelyHook}>
      <Component {...props} />
    </Wrapper>,
    element
  );
}

window.mountCallTool = (root: string, _props: any) => {
  const element = document.getElementById(root);

  if (element) {
    const props = camelizeKeys(_props);
    mount(element, props);

    if (process.env.NODE_ENV === 'development' && module.hot) {
      module.hot.accept('../call_tool/CallToolView', () => {
        mount(element, props, require('../call_tool/CallToolView').default);
      });
    }
  }
};
