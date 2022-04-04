import { Component, Input } from '@angular/core';
import { weakness } from 'src/app/models/weakness';

@Component({
    selector: 'app-weakness-list',
    template: `
    <app-weakness-card [resumeId]  = "resumeId" *ngFor = "let FirstToLastWeaknessList Of WeaknessList" [WeaknessCard] = "FirstToLastWeaknessList"></app-weakness-card>

   `,

    styles: []
})

export class WeaknessListComponent {

@Input() WeaknessList : weakness[]
@Input() resumeId : string
}