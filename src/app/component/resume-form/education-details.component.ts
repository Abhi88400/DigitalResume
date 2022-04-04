import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { education } from '../../models/education';
import { Resume } from '../../models/resume';
import { EducationDialogFormComponent } from './resume-dialogues/education-dialogue.component';

@Component({
    selector: 'app-education-detail',
    template: `
 <div *ngIf = "this.educationDetails">
   <app-education-list [resumeId]= "this.resume"  [EducationList] = "educationDetails"></app-education-list>

</div>
 <div   fxLayout= "column" fxLayoutAlign = "start stretch"  >  
       <button (click)  = "OpenEducationForm() " color = "accent" mat-raised-button>
           Add Education
            </button>
    </div>

   `,

    styles: []
})

export class EducationDetailComponent {


    @Input() resume: string;
    @Input() educationDetails: education[]


    constructor(public Dialog: MatDialog) {

 }

   OpenEducationForm() {
       console.log(this.educationDetails)
        this.Dialog.open(EducationDialogFormComponent,
            {
                width: '90%', height: "90%",
                data: {
                        ResumeId : this.resume
                        //ek particular education bhejni hai to isiliye yahan nii bhejenge
                }
            })

    }
}   

 
