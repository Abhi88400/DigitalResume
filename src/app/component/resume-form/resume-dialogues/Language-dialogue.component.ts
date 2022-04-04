import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { languages } from 'src/app/models/languages';
import { ResumeRepository } from 'src/app/repository/resume-repository';

import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';

interface DataType {
    ResumeId: string,
    language: languages

}

@Component({
    selector: 'app-language-dialogue',
    template: `
<form [formGroup]  = "this.LanguageForm" 
(ngSubmit) = "this.LanguageForm.valid && this.SaveOrUpdate() ">
<div fxLayout= "column" fxLayoutAlign = "start stretch" fxLayoutGap = "2rem">
<mat-form-field> 
<input formControlName = "name" matInput placeholder = " name* " />
      </mat-form-field> 
      
<mat-form-field> 
<input formControlName = "level" matInput placeholder = " level* " />
      </mat-form-field> 

    <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 

    <button *ngIf = "this.data.language" mat-raised-button color = "accent">Update </button>
    <button *ngIf = "!this.data.language" mat-raised-button color = "accent"> Save</button>
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

export class LanguageDialogueComponent {
    LanguageForm: FormGroup

    constructor(public dialogRef: MatDialogRef<LanguageDialogueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType,
        private resumeRepo: ResumeRepository, private Alertservice: snackBarService) {

    }
    ngOnInit() {


        const level = this.data.language ? this.data.language.level : null
        const name = this.data.language ? this.data.language.name : null
        this.LanguageForm = new FormGroup({
            name: new FormControl(name, [Validators.required]),
            level: new FormControl(level, [Validators.required])
        })


    }

    SaveOrUpdate() {

        console.log(this.data.language)
        if (this.data.language) {
            this.Update()
        } else {
            this.Save()
        }
    }


    Save() {
        const observer$ = this.resumeRepo.SaveLanguage(this.data.ResumeId, this.LanguageForm.value);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Added SuccessFully')
            this.dialogRef.close()
        })

    }
    Update() {

        const observer$ = this.resumeRepo.UpdateLanguage(this.data.language._id, this.LanguageForm.value, this.data.ResumeId);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Updated SuccessFully')
            this.dialogRef.close()
        })

    }
}




