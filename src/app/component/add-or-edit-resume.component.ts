import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeWhile } from 'rxjs/operators';
import { Resume } from '../models/resume';
import { ResumeRepository } from '../repository/resume-repository';
import { snackBarService } from '../service/snackbar-service';



@Component({
    selector: 'app-add-or-edit-resume',
    template: `
    <form [formGroup] = 'AddResumeForm' (ngSubmit) = 'this.AddResumeForm.valid && addOrupdate()' >
<div fxLayout = 'column' fxLayoutAlign = 'start stretch' fxLayoutGap = "20px">
    <mat-form-field> 
<input formControlName = "name" matInput placeholder = " name* " />
      </mat-form-field> 
    </div>

    <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 
       
        <button type = "submit"  mat-raised-button color = "accent"> {{this.data? 'update' : "add"}} </button>
        <button type = "button" (click) =  "this.dialogRef.close()" class ="redButtonColor" mat-raised-button> Cancel</button>  
        </div>  
    </form>
   `,

    styles: []
})

export class AddOrEditResumeComponent implements OnInit, OnDestroy {


    AddResumeForm: FormGroup;
    isAlive = true


    constructor(public dialogRef: MatDialogRef<AddOrEditResumeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Resume,
        private resumeRepo: ResumeRepository,
        private AlertService: snackBarService) {
    }

    ngOnInit() {
        const name = this.data ? this.data.name : null
        this.AddResumeForm = new FormGroup({
            name: new FormControl(name, [Validators.required])
        })

    }

    ngOnDestroy() {
        this.isAlive = false
    }

    addOrupdate() {
        if (this.data) {
            this.update();

        } else {

            this.add()
        }
    }

    update() {
        this.resumeRepo.updateResume(this.AddResumeForm.value, this.data._id).
            pipe(takeWhile(() => this.isAlive)).subscribe((resume) => {
                this.AlertService.success("successFully Updated")
                this.dialogRef.close()
                console.log(resume)
            })
        }

    add() {
        this.resumeRepo.AddResume(this.AddResumeForm.value)
            .pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
                this.AlertService.success("successFully Added")
                this.dialogRef.close();
                console.log(data)
            })
        }
    }







