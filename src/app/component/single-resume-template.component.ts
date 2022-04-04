import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { Resume } from '../models/resume';
import { ResumeRepository } from '../repository/resume-repository';

@Component({
    selector: 'app-single-resume-template',
    template: `

    <div class=" mainDiv"   fxLayout = "row" fxLayoutGap = "50px" fxLayoutAlign = "start start" *ngIf = "this.resume">
   <mat-card class="sideBar" *ngIf = "this.resume.contact_details || this.resume.skills.length ||
          this.resume.languages.length || this.resume.strengths.length || this.resume.weakness.length  ">

            <div fxLayout = "column" fxLayoutGap = "20px">
                <button [matTooltip] = "this.resume.views" style="background: yellow;" mat-mini-fab *ngIf = "this.resume && this.isPreview">
    <mat-icon style="color: black" >remove_red_eye</mat-icon>
</button>

<app-template-contact-details [resume] = "resume" [isPreview] = "this.isPreview"> 

</app-template-contact-details>
                                   
</div>
</mat-card>
<app-template-details [resume] = "resume"> </app-template-details>   
</div>  



   `,

    styles: [`
    
    .mainDiv{
        width : 100%;
        height : auto;
        background-image : url('../../assets/denim.jpg');
        
    }
    .sideBar{
        margin-left : 12rem;
        background-color : #538ec3;
        margin-top: 1rem;
        margin-bottom : 2rem;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;     
        width: 300px;
        height : auto;
    }
   

    `]
})

export class SingleResumeTemplateComponent implements OnInit, OnDestroy {

    resume: Resume;
    isAlive = true
    isPreview = false;
    imageUrl;

    constructor(private resumeRepo: ResumeRepository, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {

        this.isPreview = this.router.url.includes('preview')
        console.log(this.isPreview)
        const param$ = this.route.params.pipe(map((data) => {
            return data.id
        }))

        const observer$ = param$.pipe(switchMap((id) => {
            return this.resumeRepo.fetchSingleResume(id)
        }), filter((res) => {
            return !!res
        }))
        observer$.pipe(takeWhile(() => this.isAlive)).subscribe((res) => {
            this.resume = res
        })

    }

    ngOnDestroy() {

        this.isAlive = false
    }
}









