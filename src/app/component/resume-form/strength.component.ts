import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Resume } from 'src/app/models/resume';
import { strengths } from 'src/app/models/strengths';
import { StrengthDialogueComponent } from './resume-dialogues/strength-dialogue.component';

@Component({
    selector: 'app-strength',
    template: `

    <div *ngIf = "this.Strength"> 
        <app-strength-list [resumeId]= "this.resumeId" [StrengthList]= "this.Strength"> </app-strength-list>  

</div>
<div fxLayout= "column" fxLayoutAlign = "start stretch"> 
            <button (click) = "OpenInterestDialog()" mat-raised-button color = "accent">  
            Add Interest
  
            </button>
        </div>

   `,
    styles: []
}
)


export class StrengthComponent {

    @Input() resumeId: string
    @Input() Strength: strengths[]

    constructor(public dialogRef: MatDialog) {

    }
    OpenInterestDialog() {
        this.dialogRef.open(StrengthDialogueComponent,
            {
                height: '30%',
                width: '90%',
                data: { ResumeId: this.resumeId }, disableClose: true
            })
    }

}