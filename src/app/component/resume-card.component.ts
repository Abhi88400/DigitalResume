import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Resume } from '../models/resume';
import { ResumeRepository } from '../repository/resume-repository';
import { snackBarService } from '../service/snackbar-service';
import { AddOrEditResumeComponent } from './add-or-edit-resume.component';

@Component({
  selector: 'app-resume-card-component',
  template: `
    <mat-card on-mouseover = "hover = true" on-mouseleave = "hover = false"  
    class="example-card" fxLayout = "column" style="background-color: #fcfcfc;" fxLayoutGap = "25px">
  
  <mat-card-header>
    <div mat-card-avatar class="example-header-image"></div>
    <mat-card-title>{{resume.name}}</mat-card-title>
  
  </mat-card-header>

  <div fxLayout = "column" fxLayoutAlign = "center center" fxLayoutGap ="10px" >
    <img mat-card-image src="../../assets/image1.png" alt="Photo">
    <mat-card-content  fxLayoutAlign = "center center">
      <h2> My Resume</h2>
    </mat-card-content>
  </div>

  <div class="hover-icon" *ngIf ="hover">
    <div style="margin-top : 8rem" fxLayoutAlign ="center center" fxLayout = "row wrap" fxLayoutGap ="30px">
      <button mat-icon-button><mat-icon matTooltip = "share">share </mat-icon></button>
      <button mat-icon-button (click) = " downlaod()"><mat-icon matTooltip = "download">download </mat-icon></button>
      <button mat-icon-button (click) = "previewResume()"><mat-icon matTooltip = "view">preview </mat-icon></button>
      <button mat-icon-button (click) = " editResume()"><mat-icon matTooltip = "edit">edit </mat-icon></button>
      <button mat-icon-button (click) = "deleteResume()"><mat-icon matTooltip = "delete">delete </mat-icon></button>
    
    </div>
</div>
</mat-card>

   `,

  styles: [

    `
        .example-card {
  margin-top: 2rem;
  max-width: 240px;
  max-height: 346px;
  text-transform: uppercase;
  transition: all 2s;
  border : 2px solid black


}

mat-card-content{
  font-weight: bold;
  color: #538ec3;
}

.hover-icon{
  position: absolute;
  background-color: rgba(36,36,36,0.81);
  top:0;
  left:0;
  bottom:0;
  right:0;
  z-index: 100;
  height:calc(100% -45px);
  width: 100%;
  opacity: 0.7;
  

}

.example-header-image {
 
  background-image: url('../../assets/image1.png');
  background-size: cover;
}

mat-icon{
  font-size: 2rem;
  font-weight: bold;
}

button{
  color: white;
  margin-bottom : 1rem;
}
        `

  ]
})

export class ResumesCardComponent {
  hover = false;
  @Input() resume: Resume;

  constructor(private matDialog: MatDialog,
    private resumeRepo: ResumeRepository,
    private AlertService: snackBarService,
    private route: Router) {

  }

  editResume() {

    this.matDialog.open(AddOrEditResumeComponent, {
      data: this.resume,
      height: '20%', width: '50%',
    })

  }

  deleteResume() {
    this.resumeRepo.deleteResume(this.resume._id).subscribe((data) => {
      this.AlertService.success("Deleted SuccessFully")
      console.log(data)
    })

  }
  downlaod() {
    this.route.navigate(['dashboard', "resume", "template", this.resume._id])
  }

  previewResume() {
    this.route.navigate(['dashboard', 'resume', 'preview', this.resume._id])
  }
}













