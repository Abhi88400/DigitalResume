import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { references } from 'src/app/models/refrences';
import { Resume } from 'src/app/models/resume';
import { ReferenceDialogueComponent } from './resume-dialogues/reference-dialogues.component';

@Component({
    selector: 'app-reference',
    template: `

    <div *ngIf = "this.reference"> 
        <app-reference-list [resumeId]= "this.resumeId" [referenceList] = "this.reference"> </app-reference-list>  
    </div> 

    <div fxLayout= "column" fxLayoutAlign = "start stretch"> 
            <button (click) = "OpenWeaknessDialog()" mat-raised-button color = "accent">  
            Add Reference
    
            </button> 
        </div>
            
   `,
    styles: []
})

export class ReferenceComponent {

    @Input() resumeId: string;
    @Input() reference: references;

    constructor(public dialogRef: MatDialog) {
    }
    
    OpenWeaknessDialog() {
        console.log(this.reference)

        this.dialogRef.open(ReferenceDialogueComponent,
            {
                height: '90%',
                width: '90%',
                data: { ResumeId: this.resumeId }, disableClose: true
            }
        )
    }
}