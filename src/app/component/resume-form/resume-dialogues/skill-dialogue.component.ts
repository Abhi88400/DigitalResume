import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { skills } from 'src/app/models/skills';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { ApIService } from 'src/app/service/App-service';
import { snackBarService } from 'src/app/service/snackbar-service';

interface DataType {
    ResumeId: string;
    Skills: skills
}

@Component({
    selector: 'app-skill-Dialogue',
    template: `

<form [formGroup]  = "this.SkillForm" 
(ngSubmit) = "this.SkillForm.valid && this.SaveOrUpdate() ">
<div fxLayout= "column" fxLayoutAlign = "start stretch" fxLayoutGap = "2rem">
<mat-form-field> 
<input formControlName = "level" matInput placeholder = " level* " />
      </mat-form-field> 
<mat-form-field> 
<input formControlName = "skill" matInput placeholder = " skill* " />
      </mat-form-field> 

      <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 
  
      <button *ngIf = "this.data.Skills" mat-raised-button color = "accent">Update </button>
      <button *ngIf = "!this.data.Skills" mat-raised-button color = "accent"> Save</button>
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

export class SkillDialogueComponent {
    SkillForm: FormGroup;


    constructor(public dialogRef: MatDialogRef<SkillDialogueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType, private resumeRepo: ResumeRepository, private Alertservice: snackBarService) {

    }
    ngOnInit() {


        const level = this.data.Skills ? this.data.Skills.level : null
        const skill = this.data.Skills ? this.data.Skills.skill : null
        this.SkillForm = new FormGroup({
            level: new FormControl(level, [Validators.required]),
            skill: new FormControl(skill, [Validators.required]),
        })


    }

    SaveOrUpdate() {

        if (this.data.Skills) {
            this.Update()
        } else {
            this.Save()
        }
    }


    Save() {
        const observer$ = this.resumeRepo.SaveSkills(this.data.ResumeId, this.SkillForm.value);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Saved SuccessFully')
            this.dialogRef.close()
        })

    }


    Update() {
      
        const observer$ = this.resumeRepo.UpdateSkills(this.data.Skills._id, this.SkillForm.value, this.data.ResumeId);
        observer$.subscribe(data => {
            console.log(data)
            this.Alertservice.success('Updated SuccessFully')
            this.dialogRef.close()
        })
    }
}





