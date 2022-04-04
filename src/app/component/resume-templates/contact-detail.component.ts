import { AfterContentInit, Component, Input } from '@angular/core';
import { Resume } from 'src/app/models/resume';

@Component({
    selector: 'app-template-contact-details',
    template: `
        <div fxLayout = "column" fxLayoutAlign = "center center">

    <button [ngStyle]="{'background-image': 'url(' + this.imageUrl + ')'}"     
        mat-fab class = "profile-pic" >
</button>
<h1> {{this.resume.contact_details.first_name}} 
    {{this.resume.contact_details.last_name}} </h1>

    <app-template-buttons [resume] = "resume" [isPreview] = "this.isPreview"> </app-template-buttons>
    
    </div>
   `,

    styles: [
        `
          .profile-pic{
        background-color : transparent;
        background-size : cover;
        background-position : center center;
        background-size : cover;
        margin-bottom : 10%;
        border : 3px solid white;
        width : 75%;
        height :200px;
    }
    h1{
      font-weight: bold;
      text-transform : uppercase;
      color: black;
  }
        `
    ]
})

export class templateContactDetailsComponent implements AfterContentInit {
    @Input() resume: Resume
    imageUrl;
    @Input() isPreview;

    constructor() {

    }

    ngAfterContentInit() {
        this.imageUrl = this.resume.image_url ? this.resume.image_url : '../../assets/profilePic.jpg'

    }

}