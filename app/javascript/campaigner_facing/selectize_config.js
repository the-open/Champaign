// @flow
import $ from 'jquery';

$(function() {
  // $FlowIgnore
  $('.selectize-container').selectize({
    plugins: ['remove_button'],
    closeAfterSelect: true,
  });

  var lastVal;
  // $FlowIgnore
  $('.selectize-container--clear-on-open').selectize({
    onDropdownOpen: function() {
      lastVal = this.getValue();
      this.clear();
    },
    onDropdownClose: function() {
      if (this.items.length < 1) this.setValue(lastVal);
    },
    closeAfterSelect: true,
  });
});
