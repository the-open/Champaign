// allow backbone views to use a hash to declaratively
// bind their methods to events called through
// $.publish or Backbone.trigger
import $ from 'jquery';
import { isObject } from 'lodash';
import Backbone from 'backbone';

export function bindEvents(view) {
  const events = view.globalEvents;
  if (!events || !isObject(events)) return;
  for (const eventName in events) {
    const methodName = events[eventName];
    const method = view[methodName];
    if (method) {
      Backbone.on(eventName, method, view);
      $.subscribe(eventName, method.bind(view));
    }
  }
}
