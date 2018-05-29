import $ from 'jquery';
import Backbone from 'backbone';
import setupOnce from './setup_once';
import { subscribe } from '../shared/pub_sub';

const Sidebar = Backbone.View.extend({
  events: {
    'click .sidebar__header-link': 'toggleGroup',
  },

  toggleGroup: function(e) {
    const $group = $(e.target).parents('.sidebar__group');
    $group.toggleClass('sidebar__group--closed sidebar__group--open');
  },
});

subscribe('sidebar:nesting', function() {
  setupOnce('.sidebar', Sidebar);
});
