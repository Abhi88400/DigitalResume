import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { education } from 'src/app/models/education';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';
import { EducationDialogFormComponent } from '../resume-dialogues/education-dialogue.component';

@Component({
    selector: 'app-education-card',
    template: `

<div  class = 'card-layout' fxLayout = 'column' fxLayoutAlign = 'center center'>  
     
     <ng-container   > 
   <h3 style = "margin: 0; font-weight : bold">{{Education.school_name}}  </h3>
   <h3 style = "margin: 0; font-weight : bold">{{Education.degree_type}}  </h3>
   <h3 style = "margin: 0;"> {{Education.field}} </h3>
   <h3 style = "margin: 0;"> {{Education.city}}  </h3>
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

export class EducationCardComponent {

    @Input() Education: education;
    @Input() resumeId: string
    constructor(public DialogRef: MatDialog, private resumeRepo: ResumeRepository, private AlertService: snackBarService) {

    }

    openDialog() {
        this.DialogRef.open(EducationDialogFormComponent,
            {
                height: "90%", width: "90%",
                data: { EducationDetails: this.Education, ResumeId: this.resumeId }
            })
    }

    delete() {
        this.resumeRepo.DeleteEducationDetails(this.Education._id, this.resumeId).subscribe(data => {
            console.log(data);
            this.AlertService.message("deleted Successfully")
        })
    }
}







