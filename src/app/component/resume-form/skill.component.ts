import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Resume } from 'src/app/models/resume';
import { skills } from 'src/app/models/skills';
import { SkillDialogueComponent } from './resume-dialogues/skill-dialogue.component';

@Component({
    selector: 'app-skill',
    template: `
    <div *ngIf = "this.Skill">
        <app-skill-list [resumeId] = "this.resumeId" [SkillList] = " this.Skill"> </app-skill-list>
    </div>


<div fxLayout= "column" fxLayoutAlign = "start stretch"> 
        <button (click) = "OpenWeaknessDialog()" mat-raised-button color = "accent">  
        Add Interest

        </button>

</div>
   `,

    styles: []
})

export class SkillComponent {

    @Input() resumeId: string;
    @Input() Skill: skills;
  
    constructor(public dialogRef: MatDialog) {
  
    }
  
    OpenWeaknessDialog() {
        console.log(this.Skill)
  
      this.dialogRef.open(SkillDialogueComponent,
        {
          height: '36%',
          width: '90%',
          data: { ResumeId: this.resumeId }, disableClose: true
        }
      )
    }
}