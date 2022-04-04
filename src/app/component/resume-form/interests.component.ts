import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interests } from 'src/app/models/interests';

import { InterestDialogueComponent } from './resume-dialogues/interest-dialogue.component';

@Component({
  selector: 'app-interest',
  template: `
<div *ngIf = "this.Interest" >  
<app-interest-list [resumeId]= "this.resumeId" [InterestList] = "this.Interest"> </app-interest-list>

</div>

    <div fxLayout= "column" fxLayoutAlign = "start stretch"> 
            <button (click) = "OpenInterestDialog()" mat-raised-button color = "accent">  
            Add Interest
  
            </button>
    
    </div>
           
      `,

  styles: [
    `

        `
  ]
})

export class InterestComponent {
  @Input() resumeId: string;
  @Input() Interest: interests;

  constructor(public dialogRef: MatDialog) {

  }

  OpenInterestDialog() {

    this.dialogRef.open(InterestDialogueComponent,
      {
        height: '30%',
        width: '90%',
        data: { ResumeId: this.resumeId }, disableClose: true
      }
    )
  }

}







