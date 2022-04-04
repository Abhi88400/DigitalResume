import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { references } from 'src/app/models/refrences';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';

interface DataType {
    ResumeId: string,
    reference: references

}

@Component({
    selector: 'app-reference-dialogue',
    template: `
<form [formGroup]  = "this.referenceForm" 
(ngSubmit) = "this.referenceForm.valid && this.SaveOrUpdate() ">   
<div fxLayout= "column" fxLayoutAlign = "start stretch" fxLayoutGap = "2rem">
<mat-form-field> 
<input formControlName = "name" matInput placeholder = " name* " />
      </mat-form-field> 
      
<mat-form-field> 
<input formControlName = "email" matInput placeholder = " email* " />
</mat-form-field> 

<mat-form-field> 
<input formControlName = "company" matInput placeholder = " company* " />
      </mat-form-field> 
<mat-form-field> 
<input formControlName = "address" matInput placeholder = " address* " />
      </mat-form-field> 
<mat-form-field> 
<input formControlName = "phone" matInput placeholder = "phone* " />
      </mat-form-field> 
<mat-form-field> 
<input formControlName = "relationship" matInput placeholder = " relationship* " />
      </mat-form-field> 

    <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 

    <button *ngIf = "this.data.reference" mat-raised-button color = "accent">Update </button>
    <button *ngIf = "!this.data.reference" mat-raised-button color = "accent"> Save</button>
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

export class ReferenceDialogueComponent implements OnInit {
    referenceForm: FormGroup

    constructor(public dialogRef: MatDialogRef<ReferenceDialogueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType,
        private resumeRepo: ResumeRepository, private Alertservice: snackBarService) {

    }

    ngOnInit() {
        const name = this.data.reference ? this.data.reference.name : null
        const email = this.data.reference ? this.data.reference.email : null
        const company = this.data.reference ? this.data.reference.company : null
        const address = this.data.reference ? this.data.reference.address : null
        const phone = this.data.reference ? this.data.reference.phone : null
        const relationship = this.data.reference ? this.data.reference.relationship : null
        this.referenceForm = new FormGroup({
            name: new FormControl(name, [Validators.required]),
            email: new FormControl(email, [Validators.required]),
            company: new FormControl(company, [Validators.required]),
            address: new FormControl(address, [Validators.required]),
            phone: new FormControl(phone, [Validators.required]),
            relationship: new FormControl(relationship, [Validators.required])

        })
    }



    SaveOrUpdate() {

        console.log(this.data.reference)
        if (this.data.reference) {
            this.Update()
        } else {
            this.Save()
        }
    }


    Save() {

        const observer$ = this.resumeRepo.SaveReference(this.data.ResumeId, this.referenceForm.value);
        console.log(this.data.ResumeId, this.referenceForm.value)
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Added SuccessFully')
            this.dialogRef.close()
        })
    }

    Update() {

        const observer$ = this.resumeRepo.UpdateReference(this.data.reference._id,
            this.referenceForm.value, this.data.ResumeId);

        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Updated SuccessFully')
            this.dialogRef.close()
        })

    }
}