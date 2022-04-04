import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { contactDetails } from 'src/app/models/contact-details';
import { education } from 'src/app/models/education';
import { ResumeRepository } from 'src/app/repository/resume-repository';

interface DataType {

    EducationDetails: education; //isme bi hum us education ko access krege uski aray naii srf ek particular education
    ResumeId: string;
}


@Component({
    selector: 'app-conatct-dialogue',
    template: `
<form [formGroup] = "this.EducationForm"  (ngSubmit) = 'this.EducationForm.valid && this.SaveAndUpdate()'>
<div fxLayout = 'column' fxLayoutAlign = 'start stretch' fxLayoutGap = "20px">
    <mat-form-field> 
<input formControlName = "school_name" matInput placeholder = " school_name* " />
      </mat-form-field> 
  <mat-form-field> 
<input formControlName = "degree_type" matInput placeholder = " degree_type* " />
<mat-hint> Example @ Diploma, Graduation</mat-hint>
      </mat-form-field>
      <mat-form-field>   
<input formControlName = "city" matInput placeholder = " city* "/>
      </mat-form-field>    
  <mat-form-field>
<input formControlName = "state" matInput placeholder = " state* " />
      </mat-form-field>
  <mat-form-field> 
<input formControlName = "field" matInput placeholder = " field* " />
<mat-hint> Example @ B-tech in computer science</mat-hint>
      </mat-form-field>
  <mat-form-field> 
<input formControlName = "percentage" matInput placeholder = " percentage* " />
      </mat-form-field>
 
    <mat-form-field  >
  <mat-label>Select Your Graduation</mat-label>
  <mat-select  formControlName = "graduation_month">
    <mat-option *ngFor = 'let item of Month_Array' value = "item" >
 {{item}}
    </mat-option>
   
  </mat-select>
</mat-form-field>
  
  <mat-form-field> 
  <input formControlName = "graduation_year" matInput placeholder = "graduation_year* "   />
      </mat-form-field>
        
</div>
    <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 

    <button *ngIf = "this.data.EducationDetails"  mat-raised-button color = "accent">Update </button>
    <button *ngIf = "!this.data.EducationDetails" mat-raised-button color = "accent"> Save</button>
    <button type = "button" (click) = "this.DialogRef.close()" class ="redButtonColor" mat-raised-button> Cancel</button>
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
}
)


export class EducationDialogFormComponent {


    EducationForm: FormGroup;
    Month_Array = ['January', 'February', 'March', ' April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']

    constructor(public DialogRef: MatDialogRef<EducationDialogFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType, private resumeRepo: ResumeRepository) {  


    }

    ngOnInit() {
        const school_name = this.data.EducationDetails ? this.data.EducationDetails.school_name : null
        const city = this.data.EducationDetails ? this.data.EducationDetails.city : null
        const field = this.data.EducationDetails ? this.data.EducationDetails.field : null
        const percentage = this.data.EducationDetails ? this.data.EducationDetails.percentage : null
        const degree_type = this.data.EducationDetails ? this.data.EducationDetails.degree_type : null
        const state = this.data.EducationDetails ? this.data.EducationDetails.state : null
        const graduation_month = this.data.EducationDetails ? this.data.EducationDetails.graduation_month : null
        const graduation_year = this.data.EducationDetails ? this.data.EducationDetails.graduation_year : null



        this.EducationForm = new FormGroup({
            school_name: new FormControl(school_name, [Validators.required]),
            city: new FormControl(city, [Validators.required]),
            state: new FormControl(state, [Validators.required]),
            field: new FormControl(field, [Validators.required]),
            percentage: new FormControl(percentage, [Validators.required]),
            degree_type: new FormControl(degree_type, [Validators.required]),
            graduation_month: new FormControl(graduation_month, [Validators.required]),
            graduation_year: new FormControl(graduation_year, [Validators.required]),

        })

    }

    SaveAndUpdate() {
        if (this.data.EducationDetails) {
            this.update()
        } else {
            this.save()

        }
    }

    save() {
        const Observer$ = this.resumeRepo.SaveEducationDetails(this.data.ResumeId, this.EducationForm.value)
        Observer$.subscribe(data => {
            console.log(data)
            this.DialogRef.close()
        })

    }

    update() {

        const Observer$ = this.resumeRepo.UpdateEducationDetails(this.data.EducationDetails._id, 
            this.EducationForm.value, this.data.ResumeId)
        Observer$.subscribe(data => {
            console.log(data)
        })
    }



}









