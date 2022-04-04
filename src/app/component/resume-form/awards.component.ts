import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { awardsAchivements } from 'src/app/models/award_achivements';
import { AwardsDialogueComponent } from './resume-dialogues/awards-dialogues.component';


@Component({    
  selector: 'app-awards',
  template: `
        <div *ngIf = "this.AwardsAndAchievements">
   <app-awards-list [resumeId] = "this.resumeId" [AwardsList] = "AwardsAndAchievements"></app-awards-list>
   
</div>
 <div  fxLayout= "column" fxLayoutAlign = "start stretch"  >  
       <button (click)  = "OpenAwardsForm() " color = "accent" mat-raised-button>
           Add your Achievements
            </button>
    </div>

  `,

  styles: [
    `
        .empty-heading{
            padding: 15px;
            margin-top :2%;
            text-align : center;

        }
        mat-icon{
            font-size : 3rem;
            color : white
            
        }
        `
  ]
})


export class AwardsComponent {

  @Input() AwardsAndAchievements: awardsAchivements;
  @Input() resumeId: string;

  constructor(public dialogue: MatDialog) {

  }

  OpenAwardsForm() {

    this.dialogue.open(AwardsDialogueComponent, {
      width: '90%', height: '30%',
      data: { ResumeId: this.resumeId }, disableClose: true
    })
  }

}