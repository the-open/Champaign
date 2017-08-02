import 'babel-polyfill';
import '../shared/pub_sub';
import '../shared/show_errors';
import '../member-facing/registration';
import '../member-facing/track_shares';
import 'whatwg-fetch';

import URI from 'urijs';
import ActionForm from '../member-facing/backbone/action_form';
import OverlayToggle from '../member-facing/backbone/overlay_toggle';
import Sidebar from '../member-facing/backbone/sidebar';
import Notification from '../member-facing/backbone/notification';
import SweetPlaceholder from '../member-facing/backbone/sweet_placeholder';
import CampaignerOverlay from '../member-facing/backbone/campaigner_overlay';
import redirectors from '../member-facing/redirectors';

window.URI = URI;

if (process.env.EXTERNAL_JS_PATH) {
  require(process.env.EXTERNAL_JS_PATH);
}

const initializeApp = () => {
  window.sumofus = window.sumofus || {}; // for legacy templates that reference window.sumofus
  window.champaign = window.champaign || window.sumofus || {};
  Object.assign(window.champaign, {
    ActionForm,
    OverlayToggle,
    Sidebar,
    Notification,
    SweetPlaceholder,
    CampaignerOverlay,
    redirectors,
  });
};

initializeApp();
