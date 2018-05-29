import $ from 'jquery';
import { logEvent } from './../packs/log_event';
import { publish, subscribe } from '../shared/pub_sub';

[
  'page:arrived',
  'form:update',
  'member:set',
  'member:reset',
  'petition:submitted',
  'fundraiser:transaction_submitted',
].forEach(eventName => {
  const callback = (e, ...rest) => logEvent(eventName, ...rest);
  subscribe(eventName, callback);
});

$(() => {
  publish('page:arrived');
});
