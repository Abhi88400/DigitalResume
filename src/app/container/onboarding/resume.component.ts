import { NgComponentOutlet } from "@angular/common";
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResumeRepository } from "src/app/repository/resume-repository";
import { ApIService } from '../../service/App-service';
// import { Router } from '@angular/router';
// import { snackBarService } from '../../service/snackbar-service';


@Component({
  selector: 'app-resume-component',
  template: `
    <div class = 'overlay'  fxLayoutAlign = 'center center' fxLayout = 'column'  > 
        <form (ngSubmit) = 'this.ResumeForm.valid && this.createForm()'
         [formGroup] = 'this.ResumeForm'>
   
   <mat-card  *ngIf = '!isCompleted'  class = 'card' 
   style = "height:auto; width: 20rem;" fxLayout = 'column' fxLayoutGap = '25px' > 
      <h2>Name your resume</h2>
  <mat-form-field>

  <input formControlName = 'name' matInput placeholder="Resume Name">
  <mat-error>please enter your name</mat-error>
</mat-form-field>
<div fxLayoutAlign = 'end end'>
    <button  type = "submit" matStepperNext mat-raised-button >Next </button>
  </div>
  <mat-spinner *ngIf = "loading" diameter = 31 color = 'accent'></mat-spinner>

</mat-card>

<div *ngIf = 'isCompleted' fxLayoutAlign = 'center center' fxLayout = 'column'  fxLayoutGap = '110px' > 
<mat-icon  class = 'icon-size' >check_circle </mat-icon>
<p>Your Have already Filled Your Name</p>
</div>

  </form>  
</div>
   
   `,

  styles: [
    `  
  button{
    background-color : #42b561;
         color : white;
     }

      h2{
    font-weight: bold;
    font-size :1.5rem;
   }

   .icon-size{
    font-size: 7rem;
    color : green !important;

   }
   p{
     font-size: 2rem;
     font-weight: bold;
   }
   `
  ]
})


export class ResumeNameComponent implements OnInit {

  ResumeForm: FormGroup
  loading = false
  @Input() isCompleted: boolean = false;


  constructor(private resumerepo: ResumeRepository) {

  }


  ngOnInit() {
    this.ResumeForm = new FormGroup({

      name: new FormControl(null, [Validators.required])

    })
  }

  createForm() {
    this.loading = true;
    this.resumerepo.AddResume(this.ResumeForm.value).subscribe((data) => {
      this.loading = false;
      this.isCompleted = true;
      console.log(data)
    })
  }
}















