import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Resume } from 'src/app/models/resume';
import { weakness } from 'src/app/models/weakness';
import { WeaknessDialogueComponent } from './resume-dialogues/weakness-dialogue.component';

@Component({
    selector: 'app-weakness',
    template: `
    <div *ngIf = "this.Weakness">
    <app-weakness-list [resumeId]= "this.resumeId" [WeaknessList] = "this.Weakness"  ></app-weakness-list>    
    </div>


<div fxLayout= "column" fxLayoutAlign = "start stretch"> 
        <button (click) = "OpenWeaknessDialog()" mat-raised-button color = "accent">  
        Add Interest

        </button>

</div>
   `,

    styles: []
})

export class WeaknessComponent {

    @Input() resumeId: string;
    @Input() Weakness: weakness;
  
    constructor(public dialogRef: MatDialog) {
  
    }
  
    OpenWeaknessDialog() {
  
      this.dialogRef.open(WeaknessDialogueComponent,
        {
          height: '30%',
          width: '90%',
          data: { ResumeId: this.resumeId }, disableClose: true
        }
      )
    }
}