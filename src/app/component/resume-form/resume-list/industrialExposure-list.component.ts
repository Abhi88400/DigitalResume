import { Component, Input } from '@angular/core';
import { industrialExposure } from 'src/app/models/industrial-Exposures';

@Component({
    selector: 'app-industrial-list',
    template: `

    <app-industrial-card [resumeId]  = "resumeId" [IndustrialExposureCard] = 'FirstIndustrialExposureList'  *ngFor  = "let FirstIndustrialExposureList of IndustrialExposureList" ></app-industrial-card>  
    `      ,

    styles: []
})

export class IndustrialExposurelistComponent {

    @Input() IndustrialExposureList: industrialExposure[]
    @Input() resumeId : string
}