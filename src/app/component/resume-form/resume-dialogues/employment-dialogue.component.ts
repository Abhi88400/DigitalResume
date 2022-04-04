import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { employmentHistory } from 'src/app/models/employment-history';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { snackBarService } from 'src/app/service/snackbar-service';


interface DataType {
    ResumeId: string;
    EmploymentDetails: employmentHistory;
}

@Component({
    selector: 'app-employment-dialog',
    template: `
    <form [formGroup]  = "this.EmploymentForm" (ngSubmit) = "this.EmploymentForm.valid && this.SaveOrUpdate()" >
<div fxLayout = 'column' fxLayoutAlign = 'start stretch' fxLayoutGap = "20px">
    <mat-form-field> 
<input formControlName = "employer" matInput placeholder = " employer* " />
      </mat-form-field> 

  <mat-form-field> 
<input formControlName = "designation" matInput placeholder = "designation * " />
</mat-form-field>

      <mat-form-field>   
<input formControlName = "organisation" matInput placeholder = " organisation* "/>
      </mat-form-field>  

  <mat-form-field>
<input formControlName = "state" matInput placeholder = " state* " />
      </mat-form-field>

      <mat-form-field  >
      <input formControlName = "city" matInput placeholder = " city* " />
      
      </mat-form-field>

  <mat-form-field> 
  <mat-label>starting month</mat-label>
   <mat-select  formControlName = "start_month">
   <mat-option *ngFor = 'let item of Month_Array' value = "item" >
 {{item}}
   </mat-option>
 
 </mat-select>
      
      </mat-form-field>

  <mat-form-field> 
<input formControlName = "start_year" matInput    placeholder = " start_year* " />
      </mat-form-field>

  <mat-form-field> 
<input formControlName = "end_year" matInput placeholder = " end_year* " />
      </mat-form-field>
 
  
  <mat-form-field> 
  <mat-label>Ending month</mat-label>
   <mat-select  formControlName = "end_month">
   <mat-option *ngFor = 'let item of Month_Array' value = "item" >
 {{item}}
   </mat-option>
 
 </mat-select>
      </mat-form-field>
        
</div>
    <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 

    <button *ngIf = "this.data.EmploymentDetails" mat-raised-button color = "accent">Update </button>
    <button *ngIf = "!this.data.EmploymentDetails" mat-raised-button color = "accent"> Save</button>
    <button type = "button" (click) = "this.dialogRef.close()" class ="redButtonColor" mat-raised-button> Cancel</button>
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

export class EmploymentDialogComponent implements OnInit {

    EmploymentForm: FormGroup;
    Month_Array = ['January', 'February', 'March', ' April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']


    constructor(public dialogRef: MatDialogRef<EmploymentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType, private resumeRepo: ResumeRepository, private Alertservice: snackBarService) {

    }

    ngOnInit() {

        const employer = this.data.EmploymentDetails ? this.data.EmploymentDetails.employer : null
        const designation = this.data.EmploymentDetails ? this.data.EmploymentDetails.designation : null
        const organisation = this.data.EmploymentDetails ? this.data.EmploymentDetails.organisation : null
        const city = this.data.EmploymentDetails ? this.data.EmploymentDetails.city : null
        const state = this.data.EmploymentDetails ? this.data.EmploymentDetails : null
        const start_month = this.data.EmploymentDetails ? this.data.EmploymentDetails.start_month : null
        const start_year = this.data.EmploymentDetails ? this.data.EmploymentDetails.start_year : null
        const end_month = this.data.EmploymentDetails ? this.data.EmploymentDetails.end_month : null
        const end_year = this.data.EmploymentDetails ? this.data.EmploymentDetails.end_year : null

        console.log(this.data.EmploymentDetails)

        this.EmploymentForm = new FormGroup({
            employer: new FormControl(employer, [Validators.required]),
            designation: new FormControl(designation, [Validators.required]),
            organisation: new FormControl(organisation, [Validators.required]),
            city: new FormControl(city, [Validators.required]),
            state: new FormControl(state, [Validators.required]),
            start_month: new FormControl(start_month, [Validators.required]),
            start_year: new FormControl(start_year, [Validators.required]),
            end_month: new FormControl(end_month, [Validators.required]),
            end_year: new FormControl(end_year, [Validators.required]),

        })
    }

    SaveOrUpdate() {

        if (this.data.EmploymentDetails) {
            this.update()
        } else {
            this.save()
        }

    }

    update() {
        const Observer$ = this.resumeRepo.UpdateEmploymentDetail(this.data.EmploymentDetails._id, this.EmploymentForm.value, this.data.ResumeId)
        Observer$.subscribe(data => {
            this.dialogRef.close()
            this.Alertservice.success("your data has been Updated successFully")
            console.log(data)
        })
    }

    save() {
        const Observer$ = this.resumeRepo.SaveEmploymentDetail(this.data.ResumeId, this.EmploymentForm.value)
        Observer$.subscribe(data => {
            this.dialogRef.close()
            this.Alertservice.success("successfully Added Your details")
            console.log(data)

        })

    }
}

// <mat-label>Select Your Graduation</mat-label>
//   <mat-select  formControlName = "graduation_month">
//   <mat-option *ngFor = 'let item of Month_Array' value = "item" >
// {{item}}
//   </mat-option>

// </mat-select>