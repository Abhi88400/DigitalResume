import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { projectDetails } from 'src/app/models/project-Details';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';

interface DataType {
    ResumeId: string,
    projectDetails: projectDetails

}

@Component({
    selector: 'app-project-details-dialogue',
    template: `
<form [formGroup]  = "this.projectDetailsForm" 
(ngSubmit) = "this.projectDetailsForm.valid && this.SaveOrUpdate() ">   
<div fxLayout= "column" fxLayoutAlign = "start stretch" fxLayoutGap = "2rem">
<mat-form-field> 
<input formControlName = "title" matInput placeholder = " title* " />
      </mat-form-field> 
      
<mat-form-field> 
<input formControlName = "description" matInput placeholder = " description* " />
      </mat-form-field> 
<mat-form-field> 
<input formControlName = "duration" matInput placeholder = " duration* " />
      </mat-form-field> 
<mat-form-field> 
<input formControlName = "role" matInput placeholder = " role* " />
      </mat-form-field> 

    <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 

    <button *ngIf = "this.data.projectDetails" mat-raised-button color = "accent">Update </button>
    <button *ngIf = "!this.data.projectDetails" mat-raised-button color = "accent"> Save</button>
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

export class ProjectDetailsDialogueComponent implements OnInit {
    projectDetailsForm: FormGroup

    constructor(public dialogRef: MatDialogRef<ProjectDetailsDialogueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType,
        private resumeRepo : ResumeRepository, private Alertservice: snackBarService) {

    }

    ngOnInit() {


        const description = this.data.projectDetails ? this.data.projectDetails.description : null
        const duration = this.data.projectDetails ? this.data.projectDetails.duration : null
        const role = this.data.projectDetails ? this.data.projectDetails.role : null
        const title = this.data.projectDetails ? this.data.projectDetails.title : null
        this.projectDetailsForm = new FormGroup({
            title: new FormControl(title, [Validators.required]),
            description: new FormControl(description, [Validators.required]),
            duration: new FormControl(duration, [Validators.required]),
            role: new FormControl(role, [Validators.required])
        })


    }
    SaveOrUpdate() {

        console.log(this.data.projectDetails)
        if (this.data.projectDetails) {
            this.Update()
        } else {
            this.Save()
        }
    }


    Save() {
        const observer$ = this.resumeRepo.SaveProjectDetails(this.data.ResumeId, this.projectDetailsForm.value);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Added SuccessFully')
            this.dialogRef.close()
        })

    }
    Update() {

        const observer$ = this.resumeRepo.UpdateProjectDetails(this.data.projectDetails._id, this.projectDetailsForm.value, this.data.ResumeId);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Updated SuccessFully')
            this.dialogRef.close()
        })

    }
}