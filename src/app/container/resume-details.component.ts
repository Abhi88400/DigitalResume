import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { Resume } from '../models/resume';
import { ResumeRepository } from '../repository/resume-repository';

@Component({
  selector: 'app-resume-details',
  template: `

<mat-accordion *ngIf = "this.resume" fxLayout = 'column' fxLayoutAlign  = " center center"> 
<h1 class = "tabs-heading"> Enter Details Which You Want To See In Your Resume </h1>   


  <mat-expansion-panel >
    <mat-expansion-panel-header>
      <mat-panel-title>
       Contact Details    
      </mat-panel-title>  
      <mat-panel-description>
    Enter Your Contact Details
      </mat-panel-description>
    </mat-expansion-panel-header>
<app-contact-details [resumeId] = "this.resume._id"  [ContactDetails] = 'this.resume.contact_details' > </app-contact-details>
 </mat-expansion-panel>  

    <mat-expansion-panel >    
    <mat-expansion-panel-header>
      <mat-panel-title>   
    Education    
      </mat-panel-title>
      <mat-panel-description>
    Add About Your Education
      </mat-panel-description>
    </mat-expansion-panel-header>
    <app-education-detail [resume] = "resume._id" [educationDetails] = "this.resume.education" > </app-education-detail>
 </mat-expansion-panel> 


    <mat-expansion-panel >    
    <mat-expansion-panel-header>
      <mat-panel-title>
    Employment History    
      </mat-panel-title>
      <mat-panel-description>
      Enter your Work Experience
      </mat-panel-description>
    </mat-expansion-panel-header>
   <app-employment [resumeId] = "resume._id"  [EmploymentDetails] = "this.resume.employment_history"></app-employment>
 </mat-expansion-panel> 

    <mat-expansion-panel >    
    <mat-expansion-panel-header>
      <mat-panel-title>
    Industrial Exposure   
      </mat-panel-title>
      <mat-panel-description>
    Details About Industrial Exposure
      </mat-panel-description>
    </mat-expansion-panel-header>
   <app-industrial-exposure  [resumeId] = "resume._id" [IndustrialExposure] = "this.resume.industrialExposures"></app-industrial-exposure>
 </mat-expansion-panel> 


    <mat-expansion-panel >    
    <mat-expansion-panel-header>
      <mat-panel-title>
          Interest
      </mat-panel-title>
      <mat-panel-description>
      Write About your Interest
      </mat-panel-description> 
    </mat-expansion-panel-header>
<app-interest [resumeId]= "this.resume._id" [Interest] = "this.resume.interests"  >  </app-interest>
    </mat-expansion-panel> 


    <mat-expansion-panel >    
    <mat-expansion-panel-header>
      <mat-panel-title>
          Weakness
      </mat-panel-title>
      <mat-panel-description>
      Write About your Weakness
      </mat-panel-description> 
    </mat-expansion-panel-header>
<app-weakness [resumeId]= "this.resume._id" [Weakness] = "this.resume.weakness">  </app-weakness>
    </mat-expansion-panel> 
    
    <mat-expansion-panel >    
    <mat-expansion-panel-header>
      <mat-panel-title>
       strength
      </mat-panel-title>
      <mat-panel-description>
      Write About your Strength
      </mat-panel-description> 
    </mat-expansion-panel-header>
<app-strength [resumeId]= "this.resume._id"  [Strength] = "this.resume.strengths" >  </app-strength>
    </mat-expansion-panel> 


    <mat-expansion-panel >    
    <mat-expansion-panel-header>
      <mat-panel-title>
     Language
      </mat-panel-title>
      <mat-panel-description>
      About your Language
      </mat-panel-description> 
    </mat-expansion-panel-header>
<app-language [resumeId] = " this.resume._id"  [Language] = "this.resume.languages">    </app-language>
 </mat-expansion-panel> 

    <mat-expansion-panel >    
    <mat-expansion-panel-header>
      <mat-panel-title>
   Objective
      </mat-panel-title>
      <mat-panel-description>
      About your Objectives
      </mat-panel-description> 
    </mat-expansion-panel-header>
<app-objective [resumeId] = " this.resume._id" [Objective] = "this.resume.objectives" >    </app-objective>
 </mat-expansion-panel> 

    <mat-expansion-panel >    
    <mat-expansion-panel-header>
      <mat-panel-title>
      Project details
      </mat-panel-title>
      <mat-panel-description>
      Description About Your Project 
      </mat-panel-description> 
    </mat-expansion-panel-header>
   <app-project-details [resumeId] = " this.resume._id" [projectDetails] = "this.resume.projectDetails">  </app-project-details>
 </mat-expansion-panel> 


    <mat-expansion-panel >    
    <mat-expansion-panel-header>
      <mat-panel-title>
    Reference
      </mat-panel-title>
      <mat-panel-description>
     About Your Reference
      </mat-panel-description> 
    </mat-expansion-panel-header>
   <app-reference [resumeId] = "this.resume._id" [reference] = "this.resume.refrences">  </app-reference>
 </mat-expansion-panel> 

    <mat-expansion-panel >    
    <mat-expansion-panel-header>
      <mat-panel-title>
    Awards And Acivements
      </mat-panel-title>
      <mat-panel-description>
     About Your Achievements
      </mat-panel-description> 
    </mat-expansion-panel-header>
   <app-awards [resumeId] = "this.resume._id" [AwardsAndAchievements] = "this.resume.award_achivements">  </app-awards>  
 </mat-expansion-panel> 


    <mat-expansion-panel >    
    <mat-expansion-panel-header>
      <mat-panel-title>
 Skills
      </mat-panel-title>
      <mat-panel-description>
     About Your Skills
      </mat-panel-description> 
    </mat-expansion-panel-header>
   <app-skill [resumeId] = "this.resume._id" [Skill] = "this.resume.skills">  </app-skill>  
 </mat-expansion-panel> 
</mat-accordion> 

<!-- <button mat-raised-button (click) = "callApi()">api run </button> -->

`,

  styles: [
    `
      h1{
          text-align :center;
          margin-top : 2%;
          margin-bottom : 3%
      } 

      mat-expansion-panel{
          width : 80%;
      }
  `]
})

export class ResumeDetailsComponent implements OnInit, OnDestroy {
  resume: Resume;
  isAlive = true;

  constructor(private resumeRepo: ResumeRepository, private route: ActivatedRoute) {
  }

  ngOnDestroy() {
    this.isAlive = false
  }

  ngOnInit() {

   const param$ = this.route.params;
   param$.pipe(takeWhile(() => this.isAlive), map((res) => {
        console.log(res.id)
        return res.id;
      })).subscribe(param => {

      if (!param) {
        const observer$ = this.resumeRepo.fetchAllResumes();
        const resume$ = observer$[2];
        resume$.pipe(takeWhile(() => this.isAlive))
          .subscribe((data) => {
            console.log(data[0]);
            this.resume = data[0];
          });
        }

         else {
          const resume$ = this.route.params.pipe(map((res) => {
            return res.id
          }), switchMap((id) => {
            return this.resumeRepo.fetchSingleResume(id)
          }), filter(res => !!res))
  
          resume$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
            this.resume = data
          })
        }
  
      })
    }

}




// !!false === false
// !!true === true

// !!0 === false
// !!1 === true

// !!parseInt("foo") === false // NaN is falsy
// !!-1 === true               // -1 is truthy
// !!(1/0) === true            // Infinity is truthy

// !!"" === false              // empty string is falsy
// !!"foo" === true            // non-empty string is truthy
// !!"false" === true          // ...even if it contains a falsy value

// !!window.foo === false      // undefined is falsy
// !!null === false            // null is falsy

// !!{} === true               // an (empty) object is truthy
// !![] === true               // an (empty) array is truthy; PHP programmers beware!









 







