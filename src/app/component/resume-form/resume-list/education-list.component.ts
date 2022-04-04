import { Component, Input } from '@angular/core';
import { education } from 'src/app/models/education';

@Component({
    selector: 'app-education-list',
    template: `
    
<app-education-card [resumeId]  = "resumeId"  
[Education] = "FirstItemOfEducationList" *ngFor = "let FirstItemOfEducationList of EducationList"  ></app-education-card>


   `,

    styles: [

            `
            
            `
    ]
})

export class EducationListComponent {


    @Input() EducationList : education[]
    @Input() resumeId : string
}