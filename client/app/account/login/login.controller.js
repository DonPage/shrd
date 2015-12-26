'use strict';

class LoginController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $location, LocStorage) {
    this.Auth = Auth;
    this.$location = $location;
    this.LocStorage = LocStorage;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, read any redirect or go to home.
        this.LocStorage.read('redirect', (res) => {
          res ? this.$location.path(res) : this.$location.path('/');
          if (res) this.LocStorage.delete('redirect');
        });
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('shrd2App')
  .controller('LoginController', LoginController);
