sbapp.controller('ProjectController', [
  'ProjectService',
  '$mdDialog',
  ProjectController
]);




function ProjectController(ProjectService, $mdDialog) {
  var vm = this;

  console.log("projcontrollerloaded");

  vm.showDeleteDialog = function(){
    console.log("Delete Function Called");
    $mdDialog.show({
      clickOutsideToClose: true,
      escapeToClose: true,
      template: '<delete-project></delete-project>'
    });
  }


  vm.projects = [
    {
      name: 'Project 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt varius nulla quis ullamcorper.'
    },
    {
      name: 'Project 2',
      description: 'Vestibulum lacinia volutpat sapien, et faucibus lectus blandit ac.'
    }
  ];

}

