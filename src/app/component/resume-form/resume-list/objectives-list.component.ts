import { Component, Input } from '@angular/core';
import { languages } from 'src/app/models/languages';
import { objectives } from 'src/app/models/objectives';
import { strengths } from 'src/app/models/strengths';

@Component({
    selector: 'app-objective-list',
    template: `
    <app-objective-card [resumeId]  = "resumeId" *ngFor = "let FirstToLastObjective of ObjectiveList"  [ObjectiveCard] = "FirstToLastObjective" > </app-objective-card>
   `,

    styles: []
})

export class ObjectiveListComponent {

    @Input() ObjectiveList : objectives[]
    @Input() resumeId : string
}