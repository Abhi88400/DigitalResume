import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard-settings',
    template: `
    <div style = " margin-top: 1rem " fxLayout = "column" fxlayoutAlign =" start stretch" fxLayoutGap= "3rem">
    <div  fxLayoutAlign = "center center" style = "width: 100vw; ">

        <h1> settings </h1>
     </div>

        <div style = "padding:10rem;" fxLayout = "column" fxLayoutGap = "30px">
     <div class = "profile-container" fxLayout = "row" fxLayoutAlign = "start stretch"> 

            <div fxFlex = "35%">
                <h1>profile </h1>  
            </div>

            <div fxFlex = "65%">
                <app-setting-profile>    </app-setting-profile>
        </div>

        </div>
     <div class = "profile-container" fxLayout = "row" fxLayoutAlign = "start stretch"> 

            <div fxFlex = "35%">
                <h1>password </h1>  
            </div>

            <div fxFlex = "65%">

                <app-change-password>   </app-change-password>
        </div>

        </div>

     
    </div>   
</div>
`,

    styles: [

        `
    h1{
        text-transform : uppercase;
        font-size: 1.5rem;
        color: #538ec3;
        letter-spacing: 2px;
    }
    .profile-container{
        border-bottom: 1px solid grey;
        width: 90%;
        padding: 1rem
    }

    `
    ]
})

export class DashboardSettingComponent {


}






