/* Top-level controller -- all other scopes inherit from this one */
sbapp.controller('ApplicationController', [
  '$resource',
  '$state',
  '$scope',
  'USER_ROLES',
  'AUTH_EVENTS',
  '$mdDialog',
  'AuthService',
  '$rootScope',
  ApplicationController
]);

function ApplicationController($resource, $state, $scope, USER_ROLES, AUTH_EVENTS, $mdDialog, AuthService, $rootScope) {
  /* CALLABLE MEMBERS */

  $scope.userRoles = USER_ROLES;
  $scope.currentUser = null;
  $scope.currentProject = null;
  $scope.currentDashboard = null;

  $scope.setCurrentUser = setCurrentUser;
  $scope.setCurrentProject = setCurrentProject;
  $scope.setCurrentDashboard = setCurrentDashboard;

  /* FUNCTIONS */

  function setCurrentUser(user) {
    $scope.currentUser = user;
    if (user !== null) {
      console.log('user set:', user);
    }
  }

  function setCurrentProject(project) {
    $scope.currentProject = project;
    console.log('project set:', project);

  }

  function setCurrentDashboard(dashboard) {
    $scope.currentDashboard = dashboard;
    console.log('dashboard set:', dashboard);

  }

  // Restore session from /user/me endpoint with optional callback function
  function restoreSession(callback) {
    $resource('/user/me').get(function (user) {
      if (user.id) {
        $scope.setCurrentUser(user);
      }
      if (typeof callback !== 'undefined') {
        callback();
      }
    });
  }

  function authDialog(template) {
    console.log('authDialog(): dialog triggered');
    $mdDialog.show({
      escapeToClose: false,
      scope: $scope,
      preserveScope: true,
      template: '<md-dialog aria-label="Popup">' +
      '  <md-dialog-content>' +
      '     <span ng-controller="AuthController as vm" ng-include="\'app/views/' + template + '\'">' +
      '  </md-dialog-content>' +
      '</md-dialog>',
      controller: function DialogController($scope, $mdDialog, AUTH_EVENTS, USER_ROLES) {
        function closeDialog() {
          $mdDialog.hide();
        }

        /* RESOLVE DIALOG CASES */

        // clicked public link
        $scope.$on('$stateChangeStart', function (event, next) {
          var authorizedRoles = next.data.authorizedRoles;
          if (authorizedRoles.indexOf(USER_ROLES.all) !== -1) {
            console.log("authDialog(): requested public state");
            closeDialog();
          }
        });

        // logged in
        $scope.$on(AUTH_EVENTS.loginSuccess, function (event) {
          console.log('authDialog(): ', event.name);
          closeDialog();
        });
      }
    }).then(function () {
      console.log('authDialog(): dialog resolved');
    });
  }

  /* ACTIONS */

  $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
    console.log('event fired: ', event.name);
    // show dialog if event fired from a non-login page
    if ($state.current.name != 'account.login') {
      authDialog('partials/login.html');
    }
  });

  // TODO 403 errors
  // $scope.$on(AUTH_EVENTS.notAuthorized, function(event, message) {
  //   console.log('event: ', event.name);
  //   authDialog('???');
  // });

  // Broadcast auth events on every state change
  $scope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data.authorizedRoles;

    function check() {
      if (!AuthService.isAuthorized(authorizedRoles)) {
        if (AuthService.isAuthenticated()) {
          console.log("unauthorized"); // user is not allowed
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        } else {
          console.log("unauthenticated"); // user is not logged in
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      }
    }

    // restore session if needed before checking access
    if (!AuthService.isAuthenticated()) {
      restoreSession(check);
    } else {
      check();
    }
  });


}
