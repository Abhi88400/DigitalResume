import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Resume } from 'src/app/models/resume';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { snackBarService } from 'src/app/service/snackbar-service';

@Component({
    selector: 'app-import-youtube-url',
    template: `

  <div *ngIf = '!this.isVideoUploaded || this.uploadAgain '>
    <form [formGroup] = "youtubeForm" (ngSubmit) = "this.youtubeForm.valid && this.uploadVideo()" >
<div fxLayout = 'column' style = 'margin-top : 2rem; color: #326fa8;' fxLayoutAlign= "start stretch"  fxLayoutGap = '32px'>
    <h1 class  = 'tabs-heading'>  Import Url From Youtube  </h1>

    <mat-form-field>
  <input  formControlName = 'video_url' matInput  placeholder = 'import youtube url'>
 <mat-error> please provide url </mat-error>
 </mat-form-field>
<div fxLayoutAlign = "end">
   <button type = "submit" mat-raised-button color ='accent'> import video</button>
</div>
</div> 
</form>
</div>
<div *ngIf = 'this.isVideoUploaded && !this.uploadAgain'  fxLayout = 'column' style = 'margin-top : 2rem;' fxLayoutAlign= "center center"  fxLayoutGap = '32px'>

<p > Your Video is Uploaded Now   </p>
  
<button (click) = "this.uploadAgain = true"  mat-raised-button color ='accent'> update  </button>
</div
>


  
 `,

    styles: [

        `
        p{
            font-weight : bold;
            font-size: 1rem;
        }
        `
    ]
})

export class ImportYoutubeComponent implements AfterViewInit {
    @Input() resume: Resume
    youtubeForm: FormGroup;
    isVideoUploaded = false
    uploadAgain = false
    YOUTUBE_REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/

    // actual written format is this ==>  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/



    constructor(private resumeRepo: ResumeRepository, private AlertService: snackBarService) {

        this.youtubeForm = new FormGroup({

            video_url: new FormControl(null, [Validators.required, Validators.pattern(this.YOUTUBE_REGEX)])
        })
    }

    ngAfterViewInit() {
        this.isVideoUploaded = !!this.resume.video_url

    }
    uploadVideo() {
        console.log(this.resume.video_url)
        throw this.resumeRepo.AddYoutubeURL(this.resume._id, this.youtubeForm.value).subscribe(data => {
            console.log(data)
            const message = this.isVideoUploaded ? 'video Updated  successfully' : "Video Uploaded Successfully"
            this.isVideoUploaded = true
            this.uploadAgain = false
            this.AlertService.message(message)

        }, error => {
            console.log(error)
        })
    }

}






// <!-- <mat-spinner > </mat-spinner> -->



