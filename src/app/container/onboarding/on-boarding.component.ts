import { error } from '@angular/compiler/src/util';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, takeWhile } from 'rxjs/operators';
import { Resume } from "src/app/models/resume";
import { ResumeRepository } from 'src/app/repository/resume-repository';

@Component({
  selector: 'app-on_boarding',
  template: `

  <mat-horizontal-stepper *ngIf = "!this.loading" >
 <mat-step >
 <ng-template matStepLabel >Name Your Resume </ng-template>
<app-resume-component [isCompleted] = "this.isFirstStepCompleted" ></app-resume-component>
 </mat-step>

 <mat-step optional *ngIf= "this.isFirstStepCompleted">   
 <ng-template matStepLabel> Upload Video And Image </ng-template>
 <app-upload ></app-upload>
 </mat-step>

 <mat-step >
 <ng-template matStepLabel >Resume Details </ng-template>
<app-resume-details>   </app-resume-details> 

<div fxLayout= " column" fxLayoutAlign = "center center" fxFlex= " 100%">
<button (click) = "finish()" style= "margin-top : 1rem;" color = "accent" mat-raised-button> 
   finish
</button>    
</div>
 </mat-step>

</mat-horizontal-stepper>

<div style = 'height :100vh' *ngIf = "this.loading"  fxLayoutAlign = 'center center' fxLayout = 'column'>
<mat-spinner diameter = 51 color = 'accent'></mat-spinner>

</div>
  `,
  styles: [

    `
  `
  ]
})

export class onBoardingComponent implements OnInit, OnDestroy {

  resume: Resume
  loading = false
  isFirstStepCompleted = false;
  isAlive = true

  constructor(private ResumeRepo: ResumeRepository, private router: Router) {
  }

  ngOnDestroy() {
    this.isAlive = false
  }

  ngOnInit() {

    const resume$ = this.ResumeRepo.fetchAllResumes();
    const observer$ = resume$[2];
    observer$.pipe(takeWhile(() => this.isAlive)).subscribe((res) => {
      console.log(res)
      if (res.length) {
        this.resume = res[0];
        console.log(this.resume)
        this.isFirstStepCompleted = true
        this.loading = false
      }
    }, error => {
      console.log(error)
      this.loading = false;
    })
  }


  finish() {

    this.ResumeRepo.updateOnBoarding({ onboarding: 200 }).subscribe((data) => {
      console.log(data)
      this.router.navigate(['dashboard'])
    })

  }

}





























