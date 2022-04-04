import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { references } from 'src/app/models/refrences';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';
import { ReferenceDialogueComponent } from '../resume-dialogues/reference-dialogues.component';

@Component({
    selector: 'app-reference-card',
    template: `
<div  class = 'card-layout' fxLayout = 'column' fxLayoutAlign = 'center center'>  
     
     <ng-container   > 
   <h3 style = "margin: 0; " > {{referenceCard.name}}  </h3>
   <h3 style = "margin: 0; " > {{referenceCard.address}}  </h3>
   <h3 style = "margin: 0; " > {{referenceCard.relationship}}  </h3>
  
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

export class ReferenceCardComponent {
    @Input() referenceCard: references;
    @Input() resumeId : string
    
    constructor(public dialogRef: MatDialog, private resumeRepo : ResumeRepository, private Alertservice: snackBarService) {

    }


    openDialog() {
        this.dialogRef.open(ReferenceDialogueComponent, {
            height: '90%',
            width: "90%",
            data: { reference: this.referenceCard,ResumeId: this.resumeId }

        })
    }



    delete() {
        this.resumeRepo.DeleteReference(this.referenceCard._id, this.resumeId).subscribe(data =>{
            console.log(data)
            this.Alertservice.success('Deleted Successfully')

        })

    }
}