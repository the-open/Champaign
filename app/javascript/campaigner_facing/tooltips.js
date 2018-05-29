import { subscribe } from '../shared/pub_sub';
subscribe('pages:new pages:edit form:edit pages:analytics', function() {
  $('[data-toggle="tooltip"]').tooltip();
});
