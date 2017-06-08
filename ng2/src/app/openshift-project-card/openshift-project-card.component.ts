import { Component, OnInit } from '@angular/core';
import { OpenShiftService } from '../_services/openshift.service';
import { OpenShiftRoute } from '../_models/openshiftRoute';
import { OpenShiftPod } from '../_models/openshiftPod';

@Component({
  selector: 'app-openshift-project-card',
  templateUrl: './openshift-project-card.component.html',
  styleUrls: ['./openshift-project-card.component.css']
})

/**
 * Let's plan this out...
 *
 * On init, grab the openshift data and parse it
 * Create components based on the data gathered
 *
 */
export class OpenshiftProjectCardComponent implements OnInit {

  private projectName: string;
  private apiVersion: string;

  private projectMembers: string[];
  private projectRoutes: OpenShiftRoute[];
  private projectServices: OpenShiftService[];
  private projectPods: OpenShiftPod[];

  constructor(private openShiftService: OpenShiftService) {

    this.projectMembers = [];
    this.projectRoutes = [];
    this.projectServices = [];
    this.projectPods = [];

    this.openShiftService.getOpenShiftData().subscribe(
      data => {
        for (const project of data) {
          console.log(project.project);

          this.projectName = project.project;
          this.apiVersion = project.apiVersion;

          for (const member of project.members) {
            console.log(member);
            this.projectMembers.push(member);
          }

          for (const item of project.items) {
            console.log('Item kind: ' + item.kind);
            switch (item.kind) {
              case 'Route': this.projectRoutes.push(item); break;
              case 'Service': this.projectServices.push(item); break
              case 'Pod': this.projectPods.push(item); break;
              default: console.log('Unexpected item kind found: ' + item.kind);
            }
          }

          // Now that the route, service, and pod data is populated, work out the connections
          // Create pods
          // Then create services
          // Then create routes

          console.log(this.projectRoutes[0].metadata.name);
          console.log(this.projectServices[1]);
          console.log(this.projectPods[2].metadata.name);


          // TEMP: Only here due to poor planning. Break after first project.
          break;
        }
      },
      error => {
        console.error('Error fetching OpenShift data: ' + error);
        // TODO: Display an error to the user
      }
    );
  }

  private getPodNamed(podName: string): OpenShiftPod {
    for (const pod of this.projectPods) {
      if (pod.metadata.labels.app === podName) {
        return pod;
      }
    };
    return null;
  }

  ngOnInit() {
  }

}
