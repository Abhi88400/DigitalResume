import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { industrialExposure } from 'src/app/models/industrial-Exposures';
import { Resume } from 'src/app/models/resume';
import { IndustrialExposureDialogComponent } from './resume-dialogues/Industrial-exposure-dialog.component';
 
@Component({
    selector: 'app-industrial-exposure',
    template: `
  
    <div   *ngIf = "this.IndustrialExposure">
<app-industrial-list [resumeId]= "this.resumeId" [IndustrialExposureList] = 'IndustrialExposure' ></app-industrial-list>

    </div>

<div fxLayout= "column" fxLayoutAlign = "start stretch"> 
            <button (click) = "OpenEmploymentDialog()" mat-raised-button color = "accent">  
            Add Employment

            </button>
    
    </div>
   `,

    styles: []
})

export class IndustrialExposureComponent {

    @Input() resumeId: string;
    @Input() IndustrialExposure: industrialExposure

    constructor(public dialogRef : MatDialog) {
  
    }

    OpenEmploymentDialog() {

        this.dialogRef.open(IndustrialExposureDialogComponent , {
            height : '90%' , 
            width: '90%' ,
            data : {ResumeId : this.resumeId}
        })
    }
}