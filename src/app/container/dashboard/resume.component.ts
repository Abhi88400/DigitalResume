import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeWhile } from 'rxjs/operators';
import { AddOrEditResumeComponent } from 'src/app/component/add-or-edit-resume.component';
import { Resume } from 'src/app/models/resume';
import { ResumeRepository } from 'src/app/repository/resume-repository';

@Component({
  selector: 'app-dashboard-resume',
  template: `
  <div class = "shiftCard"  fxLayout = "row " fxLayoutAlign = "start stretch" fxLayoutGap = "0.6rem">
  
    <div   fxLayout = "row wrap" fxLayoutAlign = "start stretch" fxLayoutGap = "0.5rem"> 
    <mat-card (click) = "AddResume()"  matRipple class = "example-card" matRipple fxLayout = "column" fxLayoutAlign = "center center" >
    <button mat-icon-button>

    <mat-icon> 

    add_box
    </mat-icon>
    </button>
    <button style="color: #538ec3;" mat-flat-button>Add Resume</button>
    <h1 >   
      
    </h1>

</mat-card>

  <app-resume-card-component *ngFor = "let resume of ResumeList" [resume] = "resume"></app-resume-card-component>
</div>
</div>

   `,

  styles: [

    `
       .example-card {
  margin-top: 2rem;
  width: 240px;
  height: 346px;
  text-transform: uppercase;
 
}
button{
  font-weight : bold;
  font-size : 1.4rem;
  letter-spacing : 2px
}
.shiftCard{
  margin-left : 1rem;
}
    `
  ]
})

export class DashboardResumeComponent implements OnInit, OnDestroy {

  @Input() ResumeList: Resume[]
  isAlive = true
  constructor(private ResumeRepo: ResumeRepository, 
    private matDialog: MatDialog) {


  }
  ngOnInit() {
    this.fetchData()

  }

  fetchData() {
    const observer$ = this.ResumeRepo.fetchAllResumes()
    const resume = observer$[2]
    resume.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      console.log(data)
      this.ResumeList = data
    })
  }

  ngOnDestroy() {
    this.isAlive = false
  }

  AddResume() {
    this.matDialog.open(AddOrEditResumeComponent, {
      height: '20%', width: '50%',
    })
  }



}




//error handiling task 



