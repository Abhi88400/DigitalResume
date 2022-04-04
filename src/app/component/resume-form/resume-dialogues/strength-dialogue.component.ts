import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { weakness } from 'src/app/models/weakness';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';

interface DataType {
    ResumeId: string;
    Strength: weakness
}

@Component({
    selector: 'app-Weakness-Dialogue',
    template: `

<form [formGroup]  = "this.StrengthForm" (ngSubmit) = "this.StrengthForm.valid && this.SaveOrUpdate()">

<div fxLayout= "column" fxLayoutAlign = "start stretch" fxLayoutGap = "2rem">

<mat-form-field> 
<input formControlName = "name" matInput placeholder = " name* " />
 </mat-form-field> 

 
 <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 

    <button *ngIf = "this.data.Strength" mat-raised-button color = "accent">Update </button>
    <button *ngIf = "!this.data.Strength" mat-raised-button color = "accent"> Save</button>
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

export class StrengthDialogueComponent {
    StrengthForm: FormGroup;


    constructor(public dialogRef: MatDialogRef<StrengthDialogueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType, private resumeRepo : ResumeRepository, private Alertservice: snackBarService) {

    }
    ngOnInit() {

const name = this.data.Strength ? this.data.Strength.name : null
        this.StrengthForm = new FormGroup({
            name: new FormControl(name, [Validators.required])
        })
   }     


     SaveOrUpdate() {

        if (this.data.Strength) {
            this.Update()
        } else {
            this.Save()
        }
    }

 Save() {
        const observer$ = this.resumeRepo.SaveStrength(this.data.ResumeId, this.StrengthForm.value);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Added SuccessFully')
            this.dialogRef.close()
        })

    }
    
     Update() {

        const observer$ = this.resumeRepo.UpdateStrength(this.data.Strength._id, this.StrengthForm.value , this.data.ResumeId);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Updated SuccessFully')
            this.dialogRef.close()
        })

    } 

   
 

}