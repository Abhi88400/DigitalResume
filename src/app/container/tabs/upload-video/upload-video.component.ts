import { Component } from '@angular/core';

@Component({
    selector: 'app-Upload-video-from-disk',
    template: `


<div   fxLayout = 'column' style = 'margin-top : 2rem; color: #326fa8;' fxLayoutAlign= "center center"  fxLayoutGap = '32px' >
    <input  hidden accept="image/apng, image/jpeg, image/png" #myInput  name="filename" type="file" />
   <h1 style="font-weight: bolder; font-size :2rem"> 
   <mat-icon>cloud_download </mat-icon> 
   Select a Video From Your Computer To Upload
   </h1> 
   <p>(upload your introduction video)</p>

<button color = 'accent' mat-raised-button>
    <mat-icon>add</mat-icon>
     <span >Upload video</span>  
   
    </button>
 
</div>

   `,

    styles: [

        `
          mat-tab-group{
            background-color: #326fa8;
        }
        `
    ]
})

export class UploadVideoComponent {


}