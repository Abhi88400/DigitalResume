import { Component, Input } from '@angular/core';
import { strengths } from 'src/app/models/strengths';

@Component({
    selector: 'app-strength-list',
    template: `
    <app-strength-card [resumeId]  = "resumeId" *ngFor = "let FirstToLastStrengths of StrengthList" [StrengthCard] = "FirstToLastStrengths" > </app-strength-card>
   `,     

    styles: []
})

export class StrengthListComponent {

    @Input() StrengthList : strengths[]
    @Input() resumeId : string
}