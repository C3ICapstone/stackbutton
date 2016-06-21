sbapp.directive('projectCard', function () {
  return {
    restrict: 'E',
    scope: {project: '=', userid: '='},
    template: '' +
    '<md-card>' +
    '  <md-toolbar class="md-accent" layout="row" layout-align="start center">' +
    '    <md-button class="toolbar-button" ui-sref="home.dashboard({project:project.id,dashboard:project.dashboards[0].id})">' +
    '      <span class="dash-widget-topbar-text capitalize">{{project.name}}</span>' +
    '    </md-button>' +
    '    <span flex></span>' +
    '    <md-button ng-if="project.owner==userid" class="toolbar-button" aria-label="Edit project" ui-sref="home.editproject({project:project.id})">' +
    '      <i class="dash-widget-topbar-text material-icons">mode_edit</i>' +
    '    </md-button>' +
    '  </md-toolbar>' +
    '  <p layout-padding>' +
    '    {{project.description}}' +
    '  </p>' +
    '</md-card>'
  };
});
