import $ from 'jquery';

window.champaign.events = window.champaign.events || $({});
const events = window.champaign.events;

export function subscribe() {
  events.on.apply(events, arguments);
}

export function unsubscribe() {
  events.off.apply(events, arguments);
}

export function publish() {
  events.trigger.apply(events, arguments);
}

export function setupPubSub(jQuery) {
  if (!jQuery) throw new Error('$.publish and $.subscribe require jQuery');
  Object.assign(jQuery, {
    subscribe: subscribe.bind(events),
    unsubscribe: unsubscribe.bind(events),
    publish: publish.bind(events),
  });
}
