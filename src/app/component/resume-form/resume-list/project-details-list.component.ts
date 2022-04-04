import { Component, Input } from '@angular/core';
import { projectDetails } from 'src/app/models/project-Details';


@Component({
    selector: 'app-project-details-list',
    template: `
<app-project-details-card [resumeId]  = "resumeId" [projectDetailsCard] = "FirstToLastProjectDetails" *ngFor = "let FirstToLastProjectDetails of projectDetailsList ">  </app-project-details-card>
   `,

    styles: []
})

export class ProjectDetailsListComponent {

    @Input() projectDetailsList: projectDetails[]
    @Input() resumeId : string
}