import { Component, Input, OnInit } from '@angular/core';
import { employmentHistory } from 'src/app/models/employment-history';

@Component({
    selector: 'app-employment-list',
    template: `
   <app-employment-card *ngFor = "let FirstEmploymentDetail of EmploymentList" [EmploymentCard] = "FirstEmploymentDetail"></app-employment-card>  


   `,  
  
    styles: []
})

export class EmploymentListComponent {
@Input() EmploymentList : employmentHistory[];
@Input() resumeId : string


}
