import { AfterContentInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Resume } from 'src/app/models/resume';

@Component({
    selector: 'app-template-buttons',
    template: `
    <div fxLayout = "row" fxLayoutGap = "1rem " fxLayoutAlign = "center center">    
        <button (click) = "editResume()"  style="background: yellow;" mat-mini-fab *ngIf = "this.resume && this.isPreview">
        <mat-icon style="color: black" > assignment</mat-icon>
        </button>
        <button (click) = "editProfile()" style="background: yellow;" mat-mini-fab *ngIf = "this.resume && this.isPreview">
        <mat-icon style="color: black" > videocam</mat-icon>
        </button>
        <button  style="background: yellow;" mat-mini-fab *ngIf = "this.resume && this.isPreview">
        <mat-icon style="color: black" > share</mat-icon>
        </button>
    </div>

      

    <div style="margin-top: 2rem; " fxLayout = "row" fxLayoutAlign = "start start" fxLayoutGap = "1.5rem" >
            <mat-icon class = "icon-size"> 
           account_circle
            </mat-icon>
            <p> {{this.resume.contact_details.summary}} </p>
        </div>
        <hr style="color: black;">


        <div fxLayout = "column" fxLayoutAlign = "start start" style="border-bottom : 2px solid white;">

        <div *ngIf = "this.resume.contact_details.website_url" 
        fxLayout = "row" fxLayout = "start stretch" fxLayoutGap = "2rem"
         style=" word-wrap : break-word;
                overflow: hidden;">

        <mat-icon> link </mat-icon>  
        <h2> {{this.resume.contact_details.website_url}} </h2> 

        </div>   

        <div *ngIf = "this.resume.contact_details.linkedin_url" 
        fxLayout = "row" fxLayout = "start stretch" fxLayoutGap = "2rem"
         style=" word-wrap : break-word;
                overflow: hidden;">

        <mat-icon> link </mat-icon>  
        <h2> {{this.resume.contact_details.linkedin_url}} </h2> 

        </div>   

        <div 
        fxLayout = "row" fxLayout = "start stretch" fxLayoutGap = "2rem"
         style=" word-wrap : break-word;
                overflow: hidden;">

        <mat-icon> call </mat-icon>  
        <h2> {{this.resume.contact_details.phone_number}} </h2> 

        </div>   

        <div fxLayout = "row" fxLayout = "center center" fxLayoutGap = "1rem"
         style=" word-wrap : break-word;
                overflow: hidden;">

        <mat-icon> email </mat-icon>  
        <h2> {{this.resume.contact_details.email}} </h2> 
    </div>   

        <div fxLayout = "row" fxLayout = "center center" fxLayoutGap = "1rem"
         style=" word-wrap : break-word;
                overflow: hidden; ">

        <mat-icon> home </mat-icon>  
        <h2> {{this.resume.contact_details.address}} </h2> 
    </div>   
</div>
  
    
    
<div style="margin-top: 1rem; border-bottom : 2px solid white;">
    <ng-container *ngTemplateOutlet = "professionalSkills"></ng-container>

</div>

<div style="margin-top: 1rem; border-bottom : 2px solid white;">
    <ng-container *ngTemplateOutlet = "language"></ng-container>

</div>
<div style="margin-top: 1rem; border-bottom : 2px solid white;">
    <ng-container *ngTemplateOutlet = "strength"></ng-container>

</div>
<div style="margin-top: 1rem; border-bottom : 2px solid white;">
    <ng-container *ngTemplateOutlet = "weakness"></ng-container>

</div>



<ng-template #professionalSkills>
<div fxLayout = "column" fxLayoutAlign = "start start">

    <div   fxLayout = "row" fxLayout = "center center" fxLayoutGap = "1rem" style=" word-wrap : break-word; overflow: hidden;">

<mat-icon> calendar_today </mat-icon>     
        <h2> professional skills</h2>
        
    </div>

   <app-skill-template-component *ngFor = "let skill of this.resume.skills" [skill] = "skill">

        </app-skill-template-component>
     
        </div>
    

</ng-template>


<ng-template #language>
<div fxLayout = "column" fxLayoutAlign = "start start">

<div   fxLayout = "row" fxLayout = "center center" fxLayoutGap = "1rem" style=" word-wrap : break-word; overflow: hidden;">
    <mat-icon> calendar_today </mat-icon>     
        <h2> Language</h2>
    </div>

    <app-language-template-card *ngFor = "let language of this.resume.languages" [language] = "language">
    
        </app-language-template-card>
        
           </div>
        </ng-template>


        <ng-template #strength>
<div fxLayout = "column" fxLayoutAlign = "start start">

<div   fxLayout = "row" fxLayout = "center center" fxLayoutGap = "1rem" style=" word-wrap : break-word; overflow: hidden;">
    <mat-icon> calendar_today </mat-icon>     
        <h2> strength</h2>
    </div>

    <app-strength-template-card *ngFor = "let strength of this.resume.strengths" [strength] = "strength">
    
        </app-strength-template-card> 
        
           </div>
        </ng-template>

        <ng-template #weakness>
<div fxLayout = "column" fxLayoutAlign = "start start">

<div   fxLayout = "row" fxLayout = "center center" fxLayoutGap = "1rem" style=" word-wrap : break-word; overflow: hidden;">
    <mat-icon> calendar_today </mat-icon>     
        <h2> weakness</h2>
    </div>

    <app-weakness-template-card *ngFor = "let weakness of this.resume.weakness" [weakness] = "weakness">
    
        </app-weakness-template-card>  
        
           </div>
        </ng-template>
        `,
        
            styles: [
                `
        .icon-size{
            font-size : 1.6rem;
            font-weight : bold;
        
        }
        p{
            font-size : 1rem;
            font-weight: bold;
            text-transform : uppercase;
            word-wrap : break-word;
            overflow: hidden;
        }
        
        
        
                `
            ]
        })
        
        export class TemplateButtonsComponent {
            @Input() resume: Resume
            @Input() isPreview;
            imageUrl;
        
            constructor(private router: Router) {
        
            }
            editResume() {
                this.router.navigate(['dashboard', 'resume', 'edit', this.resume._id])
            }
            editProfile() {
                this.router.navigate(['dashboard', 'resume', 'edit', 'profile', this.resume._id])
            }
        }
    


        



