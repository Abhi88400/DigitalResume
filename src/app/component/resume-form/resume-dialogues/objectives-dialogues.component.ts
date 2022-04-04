import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { objectives } from 'src/app/models/objectives';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';

interface DataType {
    ResumeId: string,
    objective: objectives

}

@Component({
    selector: 'app-objective-dialogue',
    template: `
<form [formGroup]  = "this.ObjectiveForm" 
(ngSubmit) = "this.ObjectiveForm.valid && this.SaveOrUpdate() ">   
<div fxLayout= "column" fxLayoutAlign = "start stretch" fxLayoutGap = "2rem">
<mat-form-field> 
<input formControlName = "declaration" matInput placeholder = " declaration* " />
      </mat-form-field> 
      
<mat-form-field> 
<input formControlName = "date" matInput placeholder = " date* " />
      </mat-form-field> 
<mat-form-field> 
<input formControlName = "objective" matInput placeholder = " objective* " />
      </mat-form-field> 
<mat-form-field> 
<input formControlName = "place" matInput placeholder = " place* " />
      </mat-form-field> 

    <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 

    <button *ngIf = "this.data.objective" mat-raised-button color = "accent">Update </button>
    <button *ngIf = "!this.data.objective" mat-raised-button color = "accent"> Save</button>
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

export class ObjectiveDialogueComponent implements OnInit {
    ObjectiveForm: FormGroup

    constructor(public dialogRef: MatDialogRef<ObjectiveDialogueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType,
        private resumeRepo: ResumeRepository, private Alertservice: snackBarService) {

    }

    ngOnInit() {


        const declaration = this.data.objective ? this.data.objective.declaration : null
        const date = this.data.objective ? this.data.objective.date : null
        const objective = this.data.objective ? this.data.objective.objective : null
        const place = this.data.objective ? this.data.objective.place : null
        this.ObjectiveForm = new FormGroup({
            declaration: new FormControl(declaration, [Validators.required]),
            date: new FormControl(date, [Validators.required]),
            objective: new FormControl(objective, [Validators.required]),
            place: new FormControl(place, [Validators.required])
        })


    }
    SaveOrUpdate() {

        console.log(this.data.objective)
        if (this.data.objective) {
            this.Update()
        } else {
            this.Save()
        }
    }


    Save() {
        const observer$ = this.resumeRepo.SaveObjective(this.data.ResumeId, this.ObjectiveForm.value);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Added SuccessFully')
            this.dialogRef.close()
        })

    }
    Update() {

        const observer$ = this.resumeRepo.UpdateObjective(this.data.objective._id, this.ObjectiveForm.value, this.data.ResumeId);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Updated SuccessFully')
            this.dialogRef.close()
        })

    }
}