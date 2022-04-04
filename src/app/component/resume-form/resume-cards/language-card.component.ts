import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { languages } from 'src/app/models/languages';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';
import { InterestDialogueComponent } from '../resume-dialogues/interest-dialogue.component';
import { LanguageDialogueComponent } from '../resume-dialogues/Language-dialogue.component';

@Component({
    selector: 'app-language-card',
    template: `

<div  class = 'card-layout' fxLayout = 'column' fxLayoutAlign = 'center center'>  
     
     <ng-container   > 
   <h3 style = "margin: 0; "  > {{LanguageCard.name}}  </h3>
   <h3 style = "margin: 0; "  > {{LanguageCard.level}}  </h3>
  
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

export class LanguageCardComponent {

    @Input() LanguageCard: languages

    @Input() resumeId : string
    constructor(public dialogRef: MatDialog,
        private resumeRepo : ResumeRepository, private Alertservice: snackBarService) {

    }

    openDialog() {

        this.dialogRef.open(LanguageDialogueComponent, {
            height: '40%',
            width: "90%",
            data: { language: this.LanguageCard ,ResumeId: this.resumeId}

        })
        console.log(this.LanguageCard)

    }

    delete() {

        this.resumeRepo.DeleteLanguage(this.LanguageCard._id,this.resumeId).subscribe(data => {
            console.log(data)
            this.Alertservice.success('Deleted SuccessFully')

        })
    }
}
