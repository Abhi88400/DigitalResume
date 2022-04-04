import { AfterContentInit, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Resume } from 'src/app/models/resume';

@Component({
    selector: 'app-template-details',
    template: `
    <div class = "main-div"  fxLayout="column" fxLayoutGap="30px">
<iframe *ngIf = "!!this.videoUrl" [src]="this.videoUrl" width="700px" height="400px"></iframe>

<ng-container *ngTemplateOutlet="educationTemplate"></ng-container>

      <ng-container *ngTemplateOutlet="experienceTemplate"></ng-container>
      <ng-container *ngTemplateOutlet="interestTemplate"></ng-container>
      <ng-container *ngTemplateOutlet="industrialExposureTemplate"></ng-container>
      <ng-container *ngTemplateOutlet="awardsTemplate"></ng-container>
      <ng-container *ngTemplateOutlet="objectiveTemplate"></ng-container>
      <ng-container *ngTemplateOutlet="referenceTemplate"></ng-container>
      <ng-container *ngTemplateOutlet="projectDetailTemplate"></ng-container>
    </div>

    <ng-template #educationTemplate>

    <mat-card *ngIf="this.resume.education.length" fxLayout="column">
        <mat-card-header>
          <div fxLayout="row" fxLayoutAlign="start center"
               fxLayoutGap="30px">
            <mat-icon>school</mat-icon>
            <p>Education</p>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div fxLayout="column" fxLayoutGap="20px" class="card-container ">
            <app-template-education *ngFor = "let education of this.resume.education" 
            [education] = "education"></app-template-education>
          </div>
        </mat-card-content>
      </mat-card>
    </ng-template>


    <ng-template #experienceTemplate>

    <mat-card *ngIf = "this.resume.employment_history.length" fxLayout="column">
        <mat-card-header>
          <div fxLayout="row" fxLayoutAlign="start center"
               fxLayoutGap="30px">
            <mat-icon>school</mat-icon>
            <p>employment History</p>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div fxLayout="column" fxLayoutGap="20px" class="card-container ">
            <app-experience-template *ngFor = "let employmentHistory of this.resume.employment_history" 
            [employmentHistory] = "employmentHistory"></app-experience-template>
          </div>
        </mat-card-content>
      </mat-card>
    </ng-template>


    <ng-template #interestTemplate>

    <mat-card *ngIf = "this.resume.interests.length" fxLayout="column">
        <mat-card-header>
          <div fxLayout="row" fxLayoutAlign="start center"
               fxLayoutGap="30px">
            <mat-icon>school</mat-icon>
            <p>interest</p>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div fxLayout="column" fxLayoutGap="20px" class="card-container ">
            <app-interest-template-component *ngFor = "let interest of this.resume.interests" 
            [interest] = "interest"></app-interest-template-component>
          </div>
        </mat-card-content>
      </mat-card>
    </ng-template>


    <ng-template #industrialExposureTemplate>

    <mat-card *ngIf = "this.resume.industrialExposures.length" fxLayout="column">
        <mat-card-header>
          <div fxLayout="row" fxLayoutAlign="start center"
               fxLayoutGap="30px">
            <mat-icon>school</mat-icon>
            <p>industrialExposure</p>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div fxLayout="column" fxLayoutGap="20px" class="card-container ">
            <app-industrial-exposuure-template-component *ngFor = "let industrialExposure of this.resume.industrialExposures" 
            [industrialExposure] = "industrialExposure"></app-industrial-exposuure-template-component>
          </div>
        </mat-card-content>
      </mat-card>
    </ng-template>  
    
    <ng-template #awardsTemplate>

    <mat-card *ngIf = "this.resume.award_achivements.length" fxLayout="column">
        <mat-card-header>
          <div fxLayout="row" fxLayoutAlign="start center"
               fxLayoutGap="30px">
            <mat-icon>school</mat-icon>
            <p>Awards</p>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div fxLayout="column" fxLayoutGap="20px" class="card-container ">
            <app-awards-template-component *ngFor = "let Awards of this.resume.award_achivements" 
            [Awards] = "Awards"></app-awards-template-component>
          </div>
        </mat-card-content>
      </mat-card>
    </ng-template>


    <ng-template #objectiveTemplate>

    <mat-card *ngIf = "this.resume.objectives.length" fxLayout="column">
        <mat-card-header>
          <div fxLayout="row" fxLayoutAlign="start center"
               fxLayoutGap="30px">
            <mat-icon>school</mat-icon>
            <p>objectives</p>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div fxLayout="column" fxLayoutGap="20px" class="card-container ">
            <app-objective-template-component *ngFor = "let objectives of this.resume.objectives" 
            [objectives] = "objectives"></app-objective-template-component>
          </div>   
        </mat-card-content>
      </mat-card>
    </ng-template>

    
    <ng-template #referenceTemplate>
    <mat-card *ngIf = "this.resume.refrences.length" fxLayout="column">
        <mat-card-header>
          <div fxLayout="row" fxLayoutAlign="start center"
               fxLayoutGap="30px">
            <mat-icon>school</mat-icon>
            <p>refrences</p>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div fxLayout="column" fxLayoutGap="20px" class="card-container ">
            <app-reference-template-component *ngFor = "let refrences of this.resume.refrences" 
            [refrences] = "refrences"></app-reference-template-component>
          </div>   
        </mat-card-content>   
      </mat-card>
    </ng-template>  


    <ng-template #projectDetailTemplate>
    <mat-card *ngIf = "this.resume.projectDetails.length" fxLayout="column">
        <mat-card-header>
          <div fxLayout="row" fxLayoutAlign="start center"
               fxLayoutGap="30px">
            <mat-icon>school</mat-icon>
            <p>project Details</p>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div fxLayout="column" fxLayoutGap="20px" class="card-container ">
            <app-project-detail-template-component *ngFor = "let projectDetails of this.resume.projectDetails" 
            [projectDetails] = "projectDetails"></app-project-detail-template-component>
          </div>   
        </mat-card-content>   
      </mat-card>
    </ng-template>  

    
   `,

    styles: [`
    .main-div{
        width: 100%;
      margin-bottom: 1.5rem;
      margin-top: 2rem;
    }
    .card-container {
      padding-left: 6rem;
    }

    mat-icon {
      font-size: 2.5rem;
    }
  

    p, mat-icon {
      color: #a85f46;
    }

    p {
      text-transform: uppercase;
      font-size: 2rem;
      margin-top: 1.2rem;
    }
    `]
})

export class TemplateDetailsComponent implements AfterContentInit {
    @Input() resume: Resume
    videoUrl: any = ''

    constructor(private domSanitizer: DomSanitizer) {

    }

    ngAfterContentInit() {
        if (this.resume.video_url) {

            const id = this.resume.video_url.split('v=')[1];
            const url = 'https://www.youtube.com/embed/' + id;
            console.log(url)

            this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url)

        }
    }
}
//<iframe width="900" height="506" src="https://www.youtube.com/embed/BINnL1lLp0A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>