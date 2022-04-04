import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { strengths } from 'src/app/models/strengths';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';
import { StrengthDialogueComponent } from '../resume-dialogues/strength-dialogue.component';
import { WeaknessDialogueComponent } from '../resume-dialogues/weakness-dialogue.component';

@Component({
    selector: 'app-strength-card',
    template: `
<div  class = 'card-layout' fxLayout = 'column' fxLayoutAlign = 'center center'>  
     
     <ng-container   > 
   <h3 style = "margin: 0; "  > {{StrengthCard.name}}  </h3>
  
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

export class StrengthCardComponent {
    @Input() StrengthCard: strengths
    @Input() resumeId : string
    
    constructor(public dialogRef: MatDialog, private resumeRepo : ResumeRepository, private Alertservice: snackBarService) {

    }


    openDialog() {
        this.dialogRef.open(StrengthDialogueComponent, {
            height: '30%',
            width: "90%",
            data: { Strength: this.StrengthCard ,ResumeId: this.resumeId}

        })


    }

    delete() {
        this.resumeRepo.DeleteStrength(this.StrengthCard._id, this.resumeId).subscribe(data =>{
            console.log(data)
            this.Alertservice.success('Deleted Successfully')

        })

    }
}