import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { contactDetails } from 'src/app/models/contact-details';
import { ContactDialogueComponent } from './resume-dialogues/contact-dialogue.component';


@Component({
  selector: 'app-contact-details',
  template: `
 <div class = "layout" fxLayout = 'column' fxLayoutAlign = 'center center'>  
 <div class = 'card-layout' fxLayout = 'column' fxLayoutAlign = 'center center'>  
 <ng-container  *ngIf = '!this.ContactDetails'  > 
  <h2 class  = 'empty-heading'>your contact details have not been updated yet</h2>

</ng-container>
<ng-container  *ngIf = 'this.ContactDetails'  > 
<h3 style = "margin: 0; font-weight : bold"> {{this.ContactDetails.first_name}}  </h3>
<h3 style = "margin: 0; font-weight : bold"> {{this.ContactDetails.last_name}}  </h3>
<h3 style = "margin: 0;"> {{this.ContactDetails.address}}  </h3>
<h3 style = "margin: 0;"> {{this.ContactDetails.country}}  </h3>
</ng-container>  


  <div class = "hover-layout" fxLayoutAlign = 'center center' > 
      <div class = "hover">  
    <button (click)  = "OpenContactForm()" mat-icon-button>
    <mat-icon *ngIf = '!this.ContactDetails'>add  </mat-icon> 
    <mat-icon *ngIf = 'this.ContactDetails'>create  </mat-icon>   
    </button>
 </div>
  </div>
 </div> 
  </div>       

  `,

  styles: [
    `
        .empty-heading{
            padding: 15px;
            margin-top :2%;
            text-align : center;

        }
        mat-icon{
            font-size : 3rem;
            color : white
            
        }
        `
  ]
})


export class ContactDetailsComponent {

  @Input() ContactDetails: contactDetails;
  @Input() resumeId: string;

  constructor(public dialogue: MatDialog) {

  }

  OpenContactForm() {
    console.log(this.ContactDetails._id, this.resumeId)
    this.dialogue.open(ContactDialogueComponent, {width: '90%', height: '90%', 
    data: { ContactDetails: this.ContactDetails, ResumeId: this.resumeId }, disableClose: true
    })
  }
}







