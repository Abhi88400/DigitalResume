import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Resume } from 'src/app/models/resume';

@Component({
    selector: 'app-clasic-template',
    template: `

<div *ngIf = "this.resume" fxLayout = "column" fxLayoutAlign = "center center" fxLayoutGap =" 2rem" >
<mat-card class = "matCard" fxLayout= "column" fxLayoutGap = "1.7rem">
<div  id = "html" fxLayout= "column" fxLayoutGap = "1.7rem">
<div *ngIf = "this.resume.contact_details">        
        <ng-container *ngTemplateOutlet="contactDetails"></ng-container>
    </div> 

    <div  *ngIf = "this.resume.education">   
        <ng-container *ngTemplateOutlet="education"></ng-container>
    </div>                           

    <div *ngIf = "this.resume.industrialExposures">   
        <ng-container *ngTemplateOutlet="industrialExposures"></ng-container>
    </div> 
    <div *ngIf = "this.resume.objectives">   
        <ng-container *ngTemplateOutlet="objectives "></ng-container>
    </div> 
    <div *ngIf = "this.resume.skills">   
        <ng-container *ngTemplateOutlet="skills"></ng-container>
    </div> 
    <div *ngIf = "this.resume.interests">   
        <ng-container *ngTemplateOutlet="interests"></ng-container>
    </div> 
    <div *ngIf = "this.resume.languages">   
         <ng-container *ngTemplateOutlet="languages"></ng-container>
    </div> 
</div>
    

</mat-card>

</div>
     


<div fxLayout = "column" fxLayoutAlign = "center center "  style="margin-top: 2rem; ">
    <button color = "primary" (click) = "download()" mat-raised-button>Download</button>
</div>

<ng-template #contactDetails>

<div fxLayout = "column" fxLayoutAlign = "center center" >

<h1 > {{this.resume.contact_details.first_name}}  {{this.resume.contact_details.last_name}}  RESUME</h1>

<div class = "contactDetailStyle"  fxLayout = "column" fxLayoutAlign = "center center">
<span>  {{this.resume.contact_details.address}} </span>
<span>  {{this.resume.contact_details.phone_number}} </span>
<span>  {{this.resume.contact_details.email}} </span>
<span>  {{this.resume.contact_details.website_url}} </span>
<span>  {{this.resume.contact_details.linkedin_url}} </span>
</div>
</div>
</ng-template  >  



<ng-template #education>  
<div fxLayout = "column" fxLayoutAlign = "start start" >  

<h1 style="background-color:blue ; color : white">Your Education Details</h1>

<span *ngFor = "let item of this.resume.education" fxLayout = "column" fxLayoutGap = "1px" >

<h2> "empty" </h2>
<h2> {{item.school_name}} </h2>
<h2> {{item.field}} </h2>
<h2> {{item.graduation_month}} </h2>
</span>
</div>
</ng-template>



<ng-template #industrialExposures> 
<h1 style="background-color:blue ; color : white">Industrial Exposure </h1>
    <span *ngFor = "let item of this.resume.industrialExposures" fxLayout = "column" fxLayoutGap = "1px">
<h2 style="font-size : 1rem; font-weight: bold; color: blue">city :  {{item.city }} </h2>
<h2>state:  {{ item.state }} </h2>
<h2>work:  {{item.work }} </h2>
<h2>organisation:  {{item.organisation }} </h2>
<h2>start_month:  {{item.start_month }} </h2>
<h2>start_year:  {{item.start_year }} </h2>
    </span>
</ng-template>



<ng-template #objectives > 

<h1 style="background-color:blue ; color : white">Objectives </h1>

<span *ngFor = "let item of this.resume.objectives"  fxLayout = "column" fxLayoutGap = "1px">

<h2 style="font-size : 1rem; font-weight: bold; color: blue"> declaration : {{item.declaration}} </h2>
<h2> place : {{item.place}} </h2>
<h2> objective: {{item.objective}}  </h2>
<div class=" border"></div>
</span>
</ng-template>    



<ng-template #skills> 
<h1 style="background-color:blue ; color : white">Skills </h1>
<span *ngFor = "let item of this.resume.skills"  fxLayout = "column" fxLayoutGap = "1px">
    <h2 style="font-size : 1rem; font-weight: bold; color: blue">
    skills : {{item.skill}}  </h2>    
<h2>level : {{item.level}}    </h2>
<div class=" border"></div>
</span>
</ng-template>



<ng-template #interests > 

<h1 style="background-color:blue ; color : white">Interests </h1>
<span  *ngFor = "let item of this.resume.interests"  fxLayout = "column">
<h2 style="font-size : 1rem; font-weight: bold; color: black"  fxLayoutGap = "1px">
 interest : {{item.interest}}</h2>
 <div class=" border"></div>
</span>
</ng-template>   

<ng-template #languages > 
    <h1 style="background-color:blue ; color : white">Languages </h1>
<span *ngFor = "let item of this.resume.languages"  fxLayout = "column" fxLayoutGap = "1px" >

<h2  style="font-size : 1rem; font-weight: bold; color: blue" > name : {{item.name}} </h2>
<h2>level : {{item.level}}  </h2>
<div class=" border"></div>
</span>
</ng-template>
   `,

    styles: [
        `
         .matCard{
            width : 50%;
            height :100%;
        }

        h1{
            text-align: center;
            font-size : 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing : 2px;
            color: blue;
        }
        .contactDetailStyle{
            font-weight : bold;
            letter-spacing : 2px;
            color:black;
        }
        .border{
            border-bottom : 2px solid #d4d4d4
        }
        `
    ]
})

export class ClassicTemplateComponent {
    @Input() resume: Resume
    @Output() downloadPdf = new EventEmitter<any>()

    constructor(){
    }

    download(){
     const Innerhtml = document.getElementById('html').innerHTML

        const html = `
      <html>
      <head> 
<style type = "text/css">
.matCard{
    width : 50%;
    height :100%;
}

h1{
    text-align: center;
    font-size : 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing : 2px;
    color: red;
}
.contactDetailStyle{
    font-weight : bold;
    letter-spacing : 2px;
    color:black;
}
.border{
    border-bottom : 2px solid #d4d4d4
}


</style>
      <body> 
     ${Innerhtml}
      </body>

      </head> 

      </html>
      
      `
        this.downloadPdf.emit(html)
    }

        

}