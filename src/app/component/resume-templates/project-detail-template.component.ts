import { Component, Input } from '@angular/core';
import { projectDetails } from 'src/app/models/project-Details';

@Component({
    selector: 'app-project-detail-template-component',
    template: `
     <h3>{{projectDetails.title}} <span style="text-transform: none; font-size: 13pt">as a {{projectDetails.role}}</span>
      <span style="color: #5da4d9; font-weight: 100"> - {{projectDetails.duration}}</span></h3>
    <p style="margin-top: 4%;" class="container">{{projectDetails.description}}</p>
   `,

    styles: []
})

export class ProjectDetailTemplateComponent {
@Input() projectDetails :projectDetails

}