import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Resume } from 'src/app/models/resume';
import { skills } from 'src/app/models/skills';
import { weakness } from 'src/app/models/weakness';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';
import { SkillDialogueComponent } from '../resume-dialogues/skill-dialogue.component';
import { WeaknessDialogueComponent } from '../resume-dialogues/weakness-dialogue.component';

@Component({
  selector: 'app-skill-card',
  template: `

<div  class = 'card-layout' fxLayout = 'column' fxLayoutAlign = 'center center'>  
     
     <ng-container   > 
   <h3 style = "margin: 8; "  > {{SkillCard.level}}  </h3>
   <h3 style = "margin: 8; "  > {{SkillCard.skill}}  </h3>
  
     </ng-container>  
   
     <div class = "hover-layout" fxLayoutAlign = 'center center' > 
         <div class = "hover"  >  
       <button mat-icon-button>

    <mat-icon (click) = "openDialog()" >create </mat-icon>
            </button>
       <button mat-icon-button>
           <mat-icon (click) = "delete()" >delete  </mat-icon> 
     
            </button>  
    </div>
     </div>
    </div>
   `,

  styles: []
})

export class SkillCardComponent {

  @Input() SkillCard: skills
  @Input() resumeId : string

  constructor(public dialogRef: MatDialog, private resumeRepo : ResumeRepository, private Alertservice: snackBarService) {

  }

  openDialog() {
    this.dialogRef.open(SkillDialogueComponent, {
      height: '39%',
      width: "90%",
      data: { Skills: this.SkillCard ,ResumeId : this.resumeId  }

    })
  }

  delete() {

    this.resumeRepo.DeleteSkills(this.SkillCard._id, this.resumeId).subscribe(data =>{
      console.log(data)
      this.Alertservice.success("your data deleted Successfully")
    })

  }
}