import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { objectives } from 'src/app/models/objectives';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';

import { ObjectiveDialogueComponent } from '../resume-dialogues/objectives-dialogues.component';

@Component({
    selector: 'app-objective-card',
    template: `

<div  class = 'card-layout' fxLayout = 'column' fxLayoutAlign = 'center center'>  
     
     <ng-container   > 
   <h3 style = "margin: 0; "  > {{ObjectiveCard.date}}  </h3>
   <h3 style = "margin: 0; "  > {{ObjectiveCard.declaration}}  </h3>
  
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

    styles: [
        `
        `

    ]
})

export class ObjectiveCardComponent {

    @Input() ObjectiveCard: objectives
    @Input() resumeId : string

    constructor(public dialogRef: MatDialog,
        private resumeRepo : ResumeRepository, private Alertservice: snackBarService) {

    }

    openDialog() {

        this.dialogRef.open(ObjectiveDialogueComponent, {
            height: '66%',
            width: "90%",
            data: { objective: this.ObjectiveCard ,ResumeId: this.resumeId}

        })
    

    }

    delete() {

        this.resumeRepo.DeleteObjective(this.ObjectiveCard._id, this.resumeId).subscribe(data => {
            console.log(data)
            this.Alertservice.success('Deleted SuccessFully')

        })
    }
}