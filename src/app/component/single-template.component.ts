import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { Resume } from '../models/resume';
import { ResumeRepository } from '../repository/resume-repository';
import { typeOfTemplates } from '../utils/Utility';
// 
@Component({
    selector: 'app-single-template',
    template: `

  <app-blues-templates (downloadPdf) = "downloadPdf($event)"  [resume] = "resume"  *ngIf = "templateId == this.templateIdInEnum.BLUES_TEMPLATES" > 
</app-blues-templates>

 <app-royal-template (downloadPdf) = "downloadPdf($event)" [resume] = "this.resume" *ngIf = "templateId == this.templateIdInEnum.SIMPLE_TEMPLATES">
 </app-royal-template>

 <app-clasic-template (downloadPdf) = "downloadPdf($event)" [resume] = "this.resume" *ngIf = "templateId == this.templateIdInEnum.ADVANCED_TEMPLATES"> 

 </app-clasic-template>

 <app-simple-template (downloadPdf) = "downloadPdf($event)" [resume] = "this.resume" *ngIf = "templateId == this.templateIdInEnum.ROYAL_TEMPLATES">
        </app-simple-template> 

 <app-advanced-template (downloadPdf) = "downloadPdf($event)" [resume] = "this.resume" *ngIf = "templateId == this.templateIdInEnum.CLASSIC_TEMPLATES">
      </app-advanced-template> 
   `,

    styles: [
        `
      
        `

    ]
})

export class singleTemplateComponent implements OnInit, OnDestroy {
    IsAlive = true;
    templateIdInEnum = typeOfTemplates
    resume: Resume
    templateId;
    constructor(private resumeRepo: ResumeRepository, private router: ActivatedRoute,
        private httpService: HttpClient) {
        console.log(this.templateIdInEnum.ROYAL_TEMPLATES)
    }

    ngOnDestroy() {
        this.IsAlive = false
    }

    ngOnInit() {

        this.FetchSingleResume()
        const observer$ = this.router.params.pipe(takeWhile(() => this.IsAlive)
            , map(data => { return data.templateId }))

        observer$.subscribe(data => {
            console.log(data)
            this.templateId = data
        })
    }

    FetchSingleResume() {

        const resumeId$ = this.router.params.pipe(map((data) => {
            return data.id
        }))
        const observer$ = resumeId$.pipe(switchMap(id => {
            return this.resumeRepo.fetchSingleResume(id)
        }), filter((res) => !!res))

        observer$.subscribe(res => {
            this.resume = res
        })
    }

    downloadPdf(html) {
        const data = {
            html
        }
        this.httpService.post('http://localhost:5000/api/resume/add/pdf', data,
            { responseType: "arraybuffer" }).pipe(takeWhile(() => this.IsAlive)).subscribe((res) => {
                const blob = new Blob([res], { type: 'application/pdf' })
                const file = URL.createObjectURL(blob)
                window.open(file)

            })

    }
}





























