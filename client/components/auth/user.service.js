'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller:'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    },
    joinRoom: {
      method: 'PUT',
      params: {
        controller:'joinRoom'
      }
    }
  });
}

angular.module('shrd2App.auth')
  .factory('User', UserResource);

})();
