sbapp.factory('ProjectService', [
  '$resource',
  '$http',
  '$q',
  ProjectService]
);

function ProjectService($resource, $q) {

  var project = $resource('/project/:projid', {projid: '@id'}, {
    update: {
      method: 'PUT'
    }
  });

  // var projService = {};
  // projService.addProject = addProject;
  //
  // function addProject(name, description, ownerid) {
  //   var data = {
  //     name: name,
  //     description: description,
  //     ownerId: ownerid
  //   };
  //   //return $http.post('/project', data, null).then(addSuccess, addError);
  //   var newProj = $resource('/project');
  //
  // }
  //
  // function addSuccess(response) {
  //   console.log("Success ", response.status, response);
  //   return response || $q.when(response);
  // }
  //
  // function addError(response) {
  //   console.log("Error ", response.status, response);
  //   return $q.reject(response);
  // }

  return project;
}

