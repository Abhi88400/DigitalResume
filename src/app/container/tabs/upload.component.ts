import { NgComponentOutlet } from "@angular/common";

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, switchMap, takeWhile } from "rxjs/operators";
import { Resume } from "src/app/models/resume";
import { ResumeRepository } from "src/app/repository/resume-repository";


@Component({
    selector: 'app-upload',
    template: `
  <div *ngIf = "this.resume">  
  
  <mat-tab-group dynamicHeight color= 'primary' backgroundColor = "accent"   mat-align-tabs="center">
  <mat-tab label="UPLOAD IMAGE">
  
  <app-upload-image [resume] = "resume"> </app-upload-image> 
  </mat-tab>
  <mat-tab label="UPLOAD VIDEO">
  <app-Upload-video-from-disk></app-Upload-video-from-disk>
   </mat-tab>
  <mat-tab label="UPLOAD URL FROM YOUTUBE">
  <app-import-youtube-url [resume] = 'resume'> </app-import-youtube-url>
  </mat-tab>
  
</mat-tab-group>


   </div>
 
   `,

    styles: [
        `
        `
    ]
})

export class UploadComponent implements OnInit, OnDestroy {

    resume: Resume
    isAlive = true
    loading = false

    constructor(private resumeRepo: ResumeRepository, private route: ActivatedRoute) {

    }
    ngOnDestroy() {
        this.isAlive = false
    }

    ngOnInit() {
        const param$ = this.route.params;
        param$.pipe(takeWhile(() => this.isAlive), map((res) => res.id))
            .subscribe((param) => {
                console.log(param);
                if (!param) {
                    const observer$ = this.resumeRepo.fetchAllResumes();
                    const resume$ = observer$[2];
                    resume$.pipe(takeWhile(() => this.isAlive))
                        .subscribe((data) => {
                            console.log(data[0]);
                            this.resume = data[0];
                        });
                } else {
                    const resume$ = this.route.params.pipe(map((res) => {
                        return res.id
                    }), switchMap((id) => {

                        return this.resumeRepo.fetchSingleResume(id)
                    }), filter(res => !!res))

                    resume$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
                        this.resume = data
                        this.loading = false
                    })

                }
            })
    }

}



















