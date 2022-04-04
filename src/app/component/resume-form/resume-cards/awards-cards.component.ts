import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { awardsAchivements } from 'src/app/models/award_achivements';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';
import { AwardsDialogueComponent } from '../resume-dialogues/awards-dialogues.component';

@Component({
    selector: 'app-awards-card',
    template: `

<div  class = 'card-layout' fxLayout = 'column' fxLayoutAlign = 'center center'>  
     
     <ng-container> 
   <h3 style = "margin: 0;"  > {{AwardsCard.awards_and_achivements}}  </h3>
  
     </ng-container>  
   
     <div class = "hover-layout" fxLayoutAlign = 'center center'> 
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
        
        export class AwardsCardComponent {
        
            @Input() AwardsCard : awardsAchivements
            @Input() resumeId : string

            constructor(public dialogRef : MatDialog , private resumeRepo : ResumeRepository , private Alertservice : snackBarService){
        
            }
        
            openDialog(){
        
                this.dialogRef.open(AwardsDialogueComponent , {
                    height: '30%',
                    width : "90%", 
                    data : {Awards : this.AwardsCard, ResumeId: this.resumeId }
        
                })
        
            }
        
            delete(){
        
                this.resumeRepo.DeleteAchivements(this.AwardsCard._id , this.resumeId).subscribe(data =>{
                    console.log(data)
                    this.Alertservice.success('Deleted SuccessFully')
        
                })  
            }
        }


