import { Component, Input } from '@angular/core';
import { languages } from 'src/app/models/languages';
import { strengths } from 'src/app/models/strengths';

@Component({
    selector: 'app-language-list',
    template: `
    <app-language-card [resumeId]  = "resumeId" *ngFor = "let FirstToLastLanguages of LanguageList"  [LanguageCard] = "FirstToLastLanguages" > </app-language-card>
   `,

    styles: []
})

export class LangaugeListComponent {

    @Input() LanguageList : languages[]
    @Input() resumeId : string
}