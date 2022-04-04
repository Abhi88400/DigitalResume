import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { contactDetails } from 'src/app/models/contact-details';
import { ResumeRepository } from 'src/app/repository/resume-repository';

interface DataType {

    ContactDetails: contactDetails;
    ResumeId: string;
}


@Component({
    selector: 'app-conatct-dialogue',
    template: `
<form [formGroup] = "this.ContactForm" (ngSubmit) = "this.ContactForm.valid && this.SaveOrUpdate()"  >
<div fxLayout = 'column' fxLayoutAlign = 'start stretch'>
    <mat-form-field> 
<input formControlName = "first_name" matInput placeholder = " First_Name* " />
      </mat-form-field>
  <mat-form-field> 
<input formControlName = "last_name" matInput placeholder = " last_name* " />
      </mat-form-field>
  <mat-form-field> 
<input formControlName = "phone_number" matInput placeholder = " phone_number* " />
      </mat-form-field>
  <mat-form-field>
<input formControlName = "email" matInput placeholder = " email* " />
      </mat-form-field>
  <mat-form-field> 
<textarea formControlName = "address" matInput placeholder = " Address* " rows = "5" ></textarea>
      </mat-form-field>
  <mat-form-field> 
<input formControlName = "city" matInput placeholder = " city* "/>
      </mat-form-field>
  <mat-form-field>
<input formControlName = "state" matInput placeholder = " state* " />
      </mat-form-field>
  <mat-form-field> 
<input formControlName = "zip_code" matInput placeholder = " zip_code* " />
      </mat-form-field>
  <mat-form-field> 
<input formControlName = "country" matInput placeholder = " country* " />
      </mat-form-field>
 
  <mat-form-field> 
<input formControlName = "linkedin_url" matInput placeholder = " linkedin_url(optional) " />
      </mat-form-field>
  <mat-form-field> 
<input formControlName = "website_url" matInput placeholder = " website_url(optional) " />
      </mat-form-field>
      <mat-form-field> 
  <textarea formControlName = "summary" matInput placeholder = "Tell About Yourself* "   rows = "5"></textarea>
      </mat-form-field>
      
    </div>
    <div fxLayout = 'row' fxLayoutAlign = 'end' fxLayoutGap = "20px" > 

    <button   *ngIf = "this.data.ContactDetails" mat-raised-button color = "accent">Update </button>
    <button *ngIf = "!this.data.ContactDetails"  mat-raised-button color = "accent"> Save</button>
    <button type = "button" (click) = "this.DialogRef.close()" class ="redButtonColor" mat-raised-button> Cancel</button>
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



export class ContactDialogueComponent implements OnInit {


    ContactForm: FormGroup

    constructor(public DialogRef: MatDialogRef<ContactDialogueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataType, private resumeRepo: ResumeRepository) {
        }

        

    ngOnInit() {
        const first_name = this.data.ContactDetails ? this.data.ContactDetails.first_name : null
        const last_name = this.data.ContactDetails ? this.data.ContactDetails.last_name : null
        const phone_number = this.data.ContactDetails ? this.data.ContactDetails.phone_number : null
        const email = this.data.ContactDetails ? this.data.ContactDetails.email : null
        const address = this.data.ContactDetails ? this.data.ContactDetails.address : null
        const city = this.data.ContactDetails ? this.data.ContactDetails.city : null
        const state = this.data.ContactDetails ? this.data.ContactDetails.state : null
        const zip_code = this.data.ContactDetails ? this.data.ContactDetails.zip_code : null
        const country = this.data.ContactDetails ? this.data.ContactDetails.country : null
        const summary = this.data.ContactDetails ? this.data.ContactDetails.summary : null
        const linkedin_url = this.data.ContactDetails ? this.data.ContactDetails.linkedin_url : null
        const website_url = this.data.ContactDetails ? this.data.ContactDetails.website_url : null


        this.ContactForm = new FormGroup({
            first_name: new FormControl(first_name, [Validators.required]),
            last_name: new FormControl(last_name, [Validators.required]),
            phone_number: new FormControl(phone_number, [Validators.required]),
            email: new FormControl(email, [Validators.required]),
            address: new FormControl(address, [Validators.required]),
            city: new FormControl(city, [Validators.required]),
            state: new FormControl(state, [Validators.required]),
            zip_code: new FormControl(zip_code, [Validators.required]),
            country: new FormControl(country, [Validators.required]),
            summary: new FormControl(summary, [Validators.required]),
            linkedin_url: new FormControl(linkedin_url),
            website_url: new FormControl(website_url),
        })

    }

    SaveOrUpdate() {

        if (this.data.ContactDetails) {
            this.update()
        } else {
            this.save()
        }

    }


    save() {
        const SaveContact$ = this.resumeRepo.SaveContactDetails(this.data.ResumeId, this.ContactForm.value);
        SaveContact$.subscribe(data => {
            console.log(data)
            this.DialogRef.close()
        })

    }

    update() {
        const UpdateContact$ = this.resumeRepo.updateContactDetails(this.data.ContactDetails._id, this.ContactForm.value, this.data.ResumeId)
        UpdateContact$.subscribe(data => {
            console.log(data)
            this.DialogRef.close()
        })
    }




}

