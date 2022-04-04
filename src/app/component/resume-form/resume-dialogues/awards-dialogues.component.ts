import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { awardsAchivements } from 'src/app/models/award_achivements';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { snackBarService } from 'src/app/service/snackbar-service';

interface DataType {
    ResumeId: string,
    Awards: awardsAchivements

}

@Component({
    selector: 'app-interest-dialogue',
    template: ` 
<form [formGroup]  = "this.AwardsForm"   
(ngSubmit) = "this.AwardsForm.valid && this.SaveOrUpdate() ">
<div fxLayout= "column" fxLayoutAlign = "start stretch" fxLayoutGap = "2rem">
<mat-form-field> 
<input formControlName = "awards_and_achivements" matInput placeholder = " awards_and_achivements* " />
      </mat-form-field> 

      <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 
  
      <button *ngIf = "this.data.Awards" mat-raised-button color = "accent">Update </button>
      <button *ngIf = "!this.data.Awards" mat-raised-button color = "accent"> Save</button>
      <button type = "button" (click) = "this.dialogRef.close()" class ="redButtonColor" mat-raised-button> Cancel</button>
      </div>
        </div>
  </form>
   `,

    styles: [

        `
        .redButtonColor{  
            background-color : red;
        }
        `
    ]
})

export class AwardsDialogueComponent implements OnInit {
    AwardsForm: FormGroup

    constructor(public dialogRef: MatDialogRef<AwardsDialogueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType,
        private resumeRepo: ResumeRepository, private Alertservice: snackBarService) {

    }
    ngOnInit() {


        const awards_and_achivements = this.data.Awards ? this.data.Awards.awards_and_achivements : null
        this.AwardsForm = new FormGroup({
            awards_and_achivements: new FormControl(awards_and_achivements, [Validators.required])
        })


    }

    SaveOrUpdate() {

        if (this.data.Awards) {
            this.Update()
        } else {
            this.Save()
        }
    }


    Save() {
        const observer$ = this.resumeRepo.SaveAchivements(this.data.ResumeId, this.AwardsForm.value);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Added SuccessFully')
            this.dialogRef.close()
        })

    }
    Update() {

        const observer$ = this.resumeRepo.UpdateAchivements(this.data.Awards._id, this.AwardsForm.value, this.data.ResumeId);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Updated SuccessFully')
            this.dialogRef.close()
        })

    }
}



