import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { weakness } from 'src/app/models/weakness';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';

interface DataType {
    ResumeId: string;
    Weakness: weakness
}

@Component({
    selector: 'app-Weakness-Dialogue',
    template: `

<form [formGroup]  = "this.WeaknessForm" 
(ngSubmit) = "this.WeaknessForm.valid && this.SaveOrUpdate() ">
<div fxLayout= "column" fxLayoutAlign = "start stretch" fxLayoutGap = "2rem">
<mat-form-field> 
<input formControlName = "name" matInput placeholder = " name* " />
      </mat-form-field> 

 
 
        

    <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 

    <button *ngIf = "this.data.Weakness" mat-raised-button color = "accent">Update </button>
    <button *ngIf = "!this.data.Weakness" mat-raised-button color = "accent"> Save</button>
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

export class WeaknessDialogueComponent {
    WeaknessForm: FormGroup;


    constructor(public dialogRef: MatDialogRef<WeaknessDialogueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType,
        private resumeRepo: ResumeRepository, private Alertservice: snackBarService) {

    }
    ngOnInit() {


        const name = this.data.Weakness ? this.data.Weakness.name : null
        this.WeaknessForm = new FormGroup({
            name: new FormControl(name, [Validators.required])
        })


    }

    SaveOrUpdate() {

        if (this.data.Weakness) {
            this.Update()
        } else {
            this.Save()
        }
    }


    Save() {
        const observer$ = this.resumeRepo.SaveWeakness(this.data.ResumeId, this.WeaknessForm.value);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Added SuccessFully')
            this.dialogRef.close()
        })

    }
    Update() {

        const observer$ = this.resumeRepo.UpdateWeakness(this.data.Weakness._id, this.WeaknessForm.value, this.data.ResumeId);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Updated SuccessFully')
            this.dialogRef.close()
        })

    }

}