import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { weakness } from 'src/app/models/weakness';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';
import { WeaknessDialogueComponent } from '../resume-dialogues/weakness-dialogue.component';

@Component({
  selector: 'app-weakness-card',
  template: `

<div  class = 'card-layout' fxLayout = 'column' fxLayoutAlign = 'center center'>  
     
     <ng-container   > 
   <h3 style = "margin: 0; "  > {{WeaknessCard.name}}  </h3>
  
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

export class WeaknessCardComponent {

  @Input() WeaknessCard: weakness
  @Input() resumeId: string
  
  constructor(public dialogRef: MatDialog, private resumeRepo: ResumeRepository, private Alertservice: snackBarService) {

  }

  openDialog() {
    this.dialogRef.open(WeaknessDialogueComponent, {
      height: '30%',
      width: "90%",
      data: { Weakness: this.WeaknessCard, ResumeId: this.resumeId }

    })
  }

  delete() {

    this.resumeRepo.DeleteWeakness(this.WeaknessCard._id, this.resumeId).subscribe(data => {
      console.log(data)
      this.Alertservice.success("your data deleted Successfully")
    })

  }
}