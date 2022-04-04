import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { employmentHistory } from 'src/app/models/employment-history';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';
import { EmploymentDialogComponent } from '../resume-dialogues/employment-dialogue.component';

@Component({
  selector: 'app-employment-card',
  template: `
    <div  class = 'card-layout' fxLayout = 'column' fxLayoutAlign = 'center center'>  
     
     <ng-container   > 
   <h3 style = "margin: 0; font-weight : bold">{{EmploymentCard.designation}}  </h3>
   <h3 style = "margin: 0; font-weight : bold">{{EmploymentCard.employer}}  </h3>
   <h3 style = "margin: 0;"> {{EmploymentCard.organisation}} </h3>
   <h3 style = "margin: 0;"> {{EmploymentCard.state}}  </h3>
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

export class EmploymentCardComponent {

  @Input() EmploymentCard: employmentHistory
  @Input() resumeId : string

  constructor(public dialogRef: MatDialog ,   private resumeRepo : ResumeRepository , private AlertService : snackBarService) {

  }

  openDialog() {
    this.dialogRef.open(EmploymentDialogComponent,
      {
        height: "90%", width: "90%",
        data: { EmploymentDetails: this.EmploymentCard,ResumeId: this.resumeId }
      })
  }

  delete() {

 this.resumeRepo.DeleteEmploymentDetails(this.EmploymentCard._id,this.resumeId).subscribe(data=> {
   console.log(data)
   this.AlertService.success("Deleted Successfully")

 })
  }

}



