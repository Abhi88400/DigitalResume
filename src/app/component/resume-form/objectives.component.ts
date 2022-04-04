import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { languages } from 'src/app/models/languages';
import { objectives } from 'src/app/models/objectives';
import { Resume } from 'src/app/models/resume';
import { ObjectiveDialogueComponent } from './resume-dialogues/objectives-dialogues.component';

@Component({
    selector: 'app-objective',
    template: `
    <div *ngIf = "this.Objective"> 
    <app-objective-list [resumeId]= "this.resumeId" [ObjectiveList] = "this.Objective">   </app-objective-list>     
</div> 


<div fxLayout= "column" fxLayoutAlign = "start stretch"> 
        <button (click) = "OpenWeaknessDialog()" mat-raised-button color = "accent">  
        Add Interest

        </button> 

</div>
   `,

    styles: []
})

export class ObjectiveComponent {

    @Input() resumeId: Resume;
    @Input() Objective: objectives;

    constructor(public dialogRef: MatDialog) {

    }

    OpenWeaknessDialog() {

        this.dialogRef.open(ObjectiveDialogueComponent,
            {
                height: '66%',
                width: '90%',
                data: {
                    objective: this.Objective,
                    ResumeId: this.resumeId
                }, disableClose: true
            }
        )
    }
}