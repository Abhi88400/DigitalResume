import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeWhile } from 'rxjs/operators';
import { Utility } from '../utils/Utility';

@Component({
    selector: 'app-template',
    template: `
    
    <div fxLayout = 'column' fxLayoutAlign = "center stretch" fxLayoutGap = "20px"> 

    <div fxLayout = 'row wrap' fxLayoutAlign = " start center" fxLayoutGap = "30px">
        
  <app-template-card *ngFor = "let template of utility" [Templates] = "template" [ResumeId] = "RouteId"> </app-template-card>
</div>

    </div>
   `,

    styles: [

        `        
        `

    ]
})

export class TemplateComponent implements OnInit {
    utility = Utility.Templateutility;
    RouteId;
    isAlive = true


    constructor(private router: ActivatedRoute) {

    }

    ngOnInit() {
        this.router.params.pipe(map((data => data.id)), takeWhile(() => this.isAlive)).subscribe((routeId) => {
            console.log(routeId)
            this.RouteId = routeId

        })
    }


}





