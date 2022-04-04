import { AfterViewInit, Component, ElementRef, Input, ViewChild, } from '@angular/core';
import { Resume } from 'src/app/models/resume';
import { ResumeRepository } from 'src/app/repository/resume-repository';
import { snackBarService } from 'src/app/service/snackbar-service';


@Component({
    selector: 'app-upload-image',
    template: `

    <div *ngIf = '!this.loading '  fxLayout = 'column' style = 'margin-top : 2rem; color: #326fa8;' fxLayoutAlign= "center center"  fxLayoutGap = '32px' >
    <input (change) = "onImageUpload($event)" hidden accept="image/apng, image/jpeg, image/png" #myInput  name="filename" type="file" />
   <h1 style="font-weight: bolder; font-size :2rem"> 
   <mat-icon>cloud_download </mat-icon> 
   UPLOAD YOUR IMAGE
   </h1> 
   <p>image size must be upto 2mb</p>

<button (click) = 'this.UploadImage()' color = 'accent' mat-raised-button *ngIf= "!this.isUploaded">
    <mat-icon>{{isSelectedIcon}}</mat-icon>
     <span *ngIf = "!this.isImageSelected"> Upload-File</span>  
     <span *ngIf = "this.isImageSelected" > change</span>  
    </button>
    
    <img #previewImg height= '200px' [src]= "this.url" >

    <button *ngIf = "this.isImageSelected && !this.isUploaded "  (click) = this.save() color = 'accent' mat-raised-button> save  </button>
    <button *ngIf = "this.isImageSelected && this.isUploaded "  (click) = this.delete() color = 'accent' mat-raised-button> delete  </button>
</div>
<div fxLayout = 'column' fxLayoutAlign= "center center" 
 style = 'margin-top : 8rem; color: #326fa8;'>

<mat-spinner  *ngIf = 'this.loading' diameter = 91 color = 'accent'>
</mat-spinner>

 </div>
    


  `,
    styles: [
        `
        p{

            color: black;
            font-weight : bold;
        }
       
       `
    ]
})

export class UploadImageComponent implements AfterViewInit {
    @Input() resume: Resume

    loading = false
    isUploaded = false
    isImageSelected = false
    url = ""

    @ViewChild('myInput') myInput: ElementRef
    @ViewChild('previewImg') previewImg: ElementRef
    isSelectedIcon = 'add'
    file: File
    MAX_FILE_SIZE = 2 * 1000 * 1000;


    constructor(private resumeRepo: ResumeRepository, private snackbar: snackBarService) {
    }
    ngAfterViewInit() {

        this.init()
    }

    init() {
        if (this.resume) {
            this.isUploaded = !!this.resume.image_url
            if (this.isUploaded) {
                this.url = this.resume.image_url
                this.isImageSelected = true
            }
        }
    }

    onImageUpload(value) {
        const file = value.target.files[0]

        this.file = file

        if (file.size > this.MAX_FILE_SIZE) {

            return this.snackbar.message('image size is large ')

        }

        if (this.file.type === "image/jpeg" || this.file.type === "image/png" || this.file.type === "image/JPG") {

            console.log(file)
            this.isImageSelected = true
            this.isSelectedIcon = 'cached'
            this.previewImg.nativeElement.src = window.URL.createObjectURL(this.file)

        } else {

            return this.snackbar.message('we are not allow to upload this type of file')

        }


    }

    UploadImage() {

        this.myInput.nativeElement.click()
    }
    save() {
        this.loading = true
        this.resumeRepo.saveOrUpdateIamge(this.file, this.resume._id).subscribe(data => {
            console.log(this.resume._id)
            this.loading = false
            this.isUploaded = true
            this.url = data.image_url
            this.snackbar.message("image added successfully")
            console.log(data)
        }, (error) => {
            this.loading = false

        })

    }

    delete() {

        this.loading = true
        this.resumeRepo.deleteImage(this.resume._id).subscribe(data => {

            this.loading = false
            console.log(data)
            this.isUploaded = false
            this.isImageSelected = false
            this.url = ''
            this.snackbar.message("image deleted successfully")
        }, (error) => {
            this.loading = false
        })
    }



}




















// value     | !value | !!value
// -----------+--------+-------
//  false     | true   | false
//  true      | false  | true
//  null      | true   | false
//  undefined | true   | false
//  0         | true   | false
//  -0        | true   | false
//  1         | false  | true
//  -5        | false  | true
//  NaN       | true   | false
//  ''        | true   | false
//  'hello'   | false  | true

// 
// 
// KARO YA MARO 2
