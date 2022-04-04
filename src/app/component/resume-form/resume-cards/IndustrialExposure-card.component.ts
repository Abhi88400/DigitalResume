import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { industrialExposure } from 'src/app/models/industrial-Exposures';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { IndustrialExposureDialogComponent } from '../resume-dialogues/Industrial-exposure-dialog.component';

@Component({
    selector: 'app-industrial-card',
    template: `
 <div  class = 'card-layout' fxLayout = 'column' fxLayoutAlign = 'center center'>  
     
     <ng-container   > 
   <h3 style = "margin: 0; font-weight : bold">{{IndustrialExposureCard.city}}  </h3>
   <h3 style = "margin: 0;"> {{IndustrialExposureCard.organisation}} </h3>
   <h3 style = "margin: 0;"> {{IndustrialExposureCard.state}}  </h3>
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

export class IndustrialExposureCardComponent {

    @Input() IndustrialExposureCard: industrialExposure;
    @Input() resumeId: string

    constructor(public dialogRef: MatDialog, private resumeRepo : ResumeRepository) {

    }
    openDialog() {
        this.dialogRef.open(IndustrialExposureDialogComponent,
            {
                height: "90%",
                width: "90%",
                data: {
                    Industrial_Exposure: this.IndustrialExposureCard, ResumeId: this.resumeId

                }

            })
    }

    delete() {

        this.resumeRepo.DeleteIndustrialExposureDetail(this.IndustrialExposureCard._id ,this.resumeId)
    }

}
