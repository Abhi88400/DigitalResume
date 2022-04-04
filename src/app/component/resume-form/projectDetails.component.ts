import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { projectDetails } from 'src/app/models/project-Details';
import { Resume } from 'src/app/models/resume';
import { ProjectDetailsDialogueComponent } from './resume-dialogues/project-details-dialogues.component';

@Component({
    selector: 'app-project-details',
    template: `

    <div *ngIf = "this.projectDetails"> 
        <app-project-details-list [resumeId]= "this.resumeId" [projectDetailsList] = "this.projectDetails"> </app-project-details-list>  
    </div> 

    <div fxLayout= "column" fxLayoutAlign = "start stretch"> 
            <button (click) = "OpenWeaknessDialog()" mat-raised-button color = "accent">  
            Add ProjectDetails
    
            </button> 
        </div>
            
   `,
//*
    styles: []
})

export class ProjectDetailsComponent {

    @Input() resumeId: string;
    @Input() projectDetails: projectDetails;

    constructor(public dialogRef: MatDialog) {

    }

    OpenWeaknessDialog() {

        this.dialogRef.open(ProjectDetailsDialogueComponent,
            {
                height: '66%',
                width: '90%',
                data: { ResumeId: this.resumeId }, disableClose: true
            }
        )
    }
}
 

