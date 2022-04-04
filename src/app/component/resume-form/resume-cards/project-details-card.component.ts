import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { projectDetails } from 'src/app/models/project-Details';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';
import { ProjectDetailsDialogueComponent } from '../resume-dialogues/project-details-dialogues.component';

@Component({
    selector: 'app-project-details-card',
    template: `

<div  class = 'card-layout' fxLayout = 'column' fxLayoutAlign = 'center center'>  
     
     <ng-container   > 
   <h3 style = "margin: 0; "> {{projectDetailsCard.description}}   </h3>
   <h3 style = "margin: 0; "> {{projectDetailsCard.duration}}  </h3>
  
     </ng-container>  
   
     <div class = "hover-layout" fxLayoutAlign = 'center center' > 
         <div class = "hover"  >  
       <button mat-icon-button>

    <mat-icon (click) = "openDialog()" >create </mat-icon>  
            </button>
       <button mat-icon-button>
           <mat-icon  (click) = "delete()" >delete  </mat-icon> 
     
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

export class ProjectDetailsCardComponent {

    @Input() projectDetailsCard: projectDetails
    @Input() resumeId : string

    constructor(public dialogRef: MatDialog,
        private resumeRepo : ResumeRepository,
        private Alertservice: snackBarService
    ) {
        console.log(this.projectDetailsCard)

    }

    openDialog() {

        this.dialogRef.open(ProjectDetailsDialogueComponent, {
            height: '66%',
            width: "90%",
            data: { projectDetails: this.projectDetailsCard ,ResumeId: this.resumeId}
        })
    }

    delete() {

        this.resumeRepo.DeleteProjectDetails(this.projectDetailsCard._id , this.resumeId).subscribe(data => {
            console.log(data)
            this.Alertservice.success('Deleted SuccessFully')

        })
    }




}