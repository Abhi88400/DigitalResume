import { Component, Inject, OnInit } from '@angular/core';
import { industrialExposure } from 'src/app/models/industrial-Exposures';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';
import { ResumeRepository } from 'src/app/repository/resume-repository';


interface DataType {
    ResumeId: string;
    Industrial_Exposure: industrialExposure
}

@Component({
    selector: 'app-employment-dialog',
    template: `
<form [formGroup]  = "this.IndustrialForm" 
(ngSubmit) = "this.IndustrialForm.valid && this.SaveOrUpdate()" >

<div fxLayout = 'column' fxLayoutAlign = 'start stretch' fxLayoutGap = "20px">

    <mat-form-field> 
<input formControlName = "work" matInput placeholder = " work* " />
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

    <button *ngIf = "this.data.Industrial_Exposure" mat-raised-button color = "accent">Update </button>
    <button *ngIf = "!this.data.Industrial_Exposure" mat-raised-button color = "accent"> Save</button>
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

export class IndustrialExposureDialogComponent {

    IndustrialForm: FormGroup;
    Month_Array = ['January', 'February', 'March', ' April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']


    constructor(public dialogRef: MatDialogRef<IndustrialExposureDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType,
        private resumeRepo: ResumeRepository,
        private Alertservice: snackBarService) {

    }
    ngOnInit() {

        const work = this.data.Industrial_Exposure ? this.data.Industrial_Exposure.work : null
        const organisation = this.data.Industrial_Exposure ? this.data.Industrial_Exposure.organisation : null
        const city = this.data.Industrial_Exposure ? this.data.Industrial_Exposure.city : null
        const state = this.data.Industrial_Exposure ? this.data.Industrial_Exposure : null
        const start_month = this.data.Industrial_Exposure ? this.data.Industrial_Exposure.start_month : null
        const start_year = this.data.Industrial_Exposure ? this.data.Industrial_Exposure.start_year : null
        const end_month = this.data.Industrial_Exposure ? this.data.Industrial_Exposure.end_month : null
        const end_year = this.data.Industrial_Exposure ? this.data.Industrial_Exposure.end_year : null



        this.IndustrialForm = new FormGroup({
            work: new FormControl(work, [Validators.required]),
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

        if (this.data.Industrial_Exposure) {
            this.update()
        } else {
            this.save()
        }

    }

    update() {

        const observer$ = this.resumeRepo.UpdateIndustrialExposureDetail(this.data.Industrial_Exposure._id, this.IndustrialForm.value, this.data.ResumeId);
        observer$.subscribe(data => {
            console.log(data)
            this.dialogRef.close()
        })
    }

    save() {

        const observer$ = this.resumeRepo.SaveIndustrialExposureDetail(this.data.ResumeId, this.IndustrialForm.value)
        observer$.subscribe(data => {
            console.log(data)
            this.dialogRef.close()
        })
    }
}


