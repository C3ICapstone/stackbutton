sbapp.controller('ModuleAddController', [
  '$scope',
  '$stateParams',
  'ToolService',
  'ProjectService',
  ModuleAddController
]);

function ModuleAddController($scope, $stateParams, ToolService, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.tools = [];
  vm.modtypes = [];
  vm.services = [];
  vm.repos = [];
  vm.module = {
    type: null,
    config: null,
    service: null,
    project: $stateParams.project
  };
  vm.modtypes = ToolService.modules;
  vm.addModule = addModule;
  vm.back = back;
  vm.next = next;
  vm.configureModule = configureModule;
  vm.loadRepos = loadRepos;
  vm.selectService = selectService;
  vm.filterService = filterService;
  vm.loadServices = loadServices;

  //Used for page back/next and div displays on addATool.html
  vm.currentPage = 1;
  vm.pageCount = 3;
  vm.loading = false;
  vm.submitted = false;


  /* ACTIONS */


  $scope.currentProject && ($scope.currentProject.id != $stateParams.project) && $scope.setCurrentProject(null);
  ProjectService.project.get({id: $stateParams.project, populate: 'dashboards'}, function (project) {
    $scope.setCurrentProject(project);
  });
  // Populate vm.modtypes
  loadServices();
  // Populate vm.tools
  ToolService.loadTools().then(function (tools) {
    vm.tools = tools;
  });


  /* FUNCTIONS */

  function back() {
    vm.currentPage--;
  }

  function next() {
    vm.currentPage++;
  }

  function loadServices() {
    vm.loading = true;
    ProjectService.service.query(
      function (services) {
        vm.services = services;
        vm.loading = false;
      },
      function (error) {
        console.log('Service error:', error);
        vm.loading = false;
      });
  }

  function filterService(service, index, array) {
    for (var i = 0; i < vm.tools.length; i++) {
      if (vm.tools[i].name = service.platform) {
        var tool = vm.tools[i];
        return tool.modules.indexOf(vm.module.type) >= 0;
      }
    }
    return false;
  }

  function selectService(service) {
    vm.module.service = service.id;
    vm.loadRepos(service.id);
    next();
  }

  function loadRepos(serviceId) {
    vm.loading = true;
    vm.repos = [];
    console.log('hello?');
    ToolService.loadServiceRepos.query({service: serviceId},
      function (repos) {
        console.log("retrieved repos:", repos);
        vm.repos = repos;
        vm.loading = false;
      },
      function (err) {
        console.log("error:", err);
        vm.loading = false;
      }
    );
  }

  // data = object to pull properties from
  // properties = optional array of property names to extract (default: *)
  function configureModule(data) {
    vm.module.config = data;
    console.log(vm.module);
  }

  function addModule(newModule) {
    vm.submitted = true;
    var defaultWidgets = {
      repo: 'commits',
      issues: 'issues'
    };

    if ($scope.currentProject == null) {
      console.log('addModule(): null project. Aborting.');
    } else {
      ProjectService.module.save(newModule,
        //success callback
        function (module) {
          console.log('addModule() success:', module);
          // TODO to be removed. This is to add a first widget to the default dashboard"
          ProjectService.dashboard.query({
              project: $scope.currentProject.id,
              populate: 'widgets'
            },
            function (dashboards) {
              var widget = {
                template: defaultWidgets[module.type],
                dashboard: dashboards[0].id,
                module: module.id
              };
              ProjectService.widget.save(widget, function (res) {
                  // console.log('saved widget:', res);
                  $scope.goBack();
                },
                function (err) {
                  console.log('could not save widget:', err);
                });
            },
            function (err) {
              console.log('error:', err);
            }
          );
          /////

        },
        //error callback
        function (err) {
          console.log('addModule() error:', err);
          //TODO add error handling feedback
        }
      );
    }
  }


}
