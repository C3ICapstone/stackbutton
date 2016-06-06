sbapp.controller('DashboardController', [
  '$stateParams',
  '$scope',
  'ProjectService',
  DashboardController
]);

function DashboardController($stateParams, $scope, ProjectService) {
  var vm = this;
  vm.widgets = [];
  console.log($stateParams);

  ProjectService.dashboard.get({id: $stateParams.dashboardId, populate: ['widgets', 'project']},
    function (dashboard, headers) {
      vm.widgets = dashboard.widgets;
      ProjectService.project.get({id: dashboard.project.id, populate: ['dashboards']},
        function (project) {
          $scope.setCurrentProject(project);
        });
    },
    function (err) {
      console.log('error:', err);
    }
  );


}

