import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interests } from 'src/app/models/interests';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { snackBarService } from 'src/app/service/snackbar-service';

interface DataType {
    ResumeId: string,
    Interest: interests

}

@Component({
    selector: 'app-interest-dialogue',
    template: `
<form [formGroup]  = "this.InterestForm" 
(submit) = "this.InterestForm.valid && this.SaveOrUpdate() ">

e
<div fxLayout= "column" fxLayoutAlign = "start stretch" fxLayoutGap = "2rem">
<mat-form-field> 
<input formControlName = "interest" matInput placeholder = " interest* " />
      </mat-form-field> 

 
 
        

    <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 

    <button *ngIf = "this.data.Interest" mat-raised-button color = "accent">Update </button>
    <button *ngIf = "!this.data.Interest" mat-raised-button color = "accent"> Save</button>
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

export class InterestDialogueComponent implements OnInit {
    InterestForm: FormGroup

    constructor(public dialogRef: MatDialogRef<InterestDialogueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType,
        private resumeRepo: ResumeRepository, private Alertservice: snackBarService) {

    }
    ngOnInit() {


        const interest = this.data.Interest ? this.data.Interest.interest : null
        this.InterestForm = new FormGroup({
            interest: new FormControl(interest, [Validators.required])
        })


    }

    SaveOrUpdate() {

        if (this.data.Interest) {
            this.Update()
        } else {
            this.Save()
        }
    }


    Save() {
        const observer$ = this.resumeRepo.SaveInterest(this.data.ResumeId, this.InterestForm.value);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Added SuccessFully')
            this.dialogRef.close()
        })

    }

    
    Update() {

        const observer$ = this.resumeRepo.UpdateInterest(this.data.Interest._id, this.InterestForm.value, this.data.ResumeId);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Updated SuccessFully')
            this.dialogRef.close()
        })
    }
}

