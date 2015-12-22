'use strict';

(function(){

class CreateRoomController {

  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
    this.forumData = {};
    this.games = [
      {
        name: 'Cards Against Humanity',
        minPlayers: 3,
        maxPlayers: 20
      }
    ];
  }

  submitRoom() {
    if (this.forumData.name && this.forumData.shrdGame) {
      this.$http.post('/api/rooms', {name: this.forumData.name, game: this.forumData.shrdGame})
        .then(result => this.$location.path(`/room/${result.data._id}`))
        .catch(result => console.log("ERROR:", result))
    }
  }


}

angular.module('shrd2App')
  .controller('CreateRoomController', CreateRoomController)

})();


