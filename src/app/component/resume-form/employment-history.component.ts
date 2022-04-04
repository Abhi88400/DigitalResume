import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { employmentHistory } from '../../models/employment-history';
import { EmploymentDialogComponent } from './resume-dialogues/employment-dialogue.component';

@Component({
    selector: 'app-employment',
    template: `

<div *ngIf = "this.EmploymentDetails" >
   <app-employment-list [resumeId]= "this.resumeId" [EmploymentList] = "EmploymentDetails">   </app-employment-list>

</div>


        <div fxLayout= "column" fxLayoutAlign = "start stretch"> 
            <button (click) = "OpenEmploymentDialog()" mat-raised-button color = "accent">  
            Add Employment

            </button>
    
    </div>
   `,
    styles: [

        `
        
        `
    ]
})


export class EmploymentHistoryComponent {
    @Input() resumeId: string;
    @Input() EmploymentDetails: employmentHistory[]

    constructor(public dialogRef: MatDialog) {
       

        
    }
  

    OpenEmploymentDialog() {
        this.dialogRef.open(EmploymentDialogComponent,
            {
                width: '90%', height: '90%',
                data: { ResumeId: this.resumeId }

            })
    }
}
