/* @flow */
import React from 'react';
import { render } from 'react-dom';
import ComponentWrapper from '../components/ComponentWrapper';
import CallToolAnalyticsView from '../call_tool_analytics/CallToolAnalyticsView';

type callToolAnalyticsProps = {
  pageId: string | number,
};

window.mountCallToolAnalytics = (
  root: string,
  props: callToolAnalyticsProps
) => {
  const element = document.getElementById(root);
  if (element) {
    render(
      <ComponentWrapper locale="en">
        <CallToolAnalyticsView {...props} />
      </ComponentWrapper>,
      element
    );
  }
};
