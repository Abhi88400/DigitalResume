import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';



@Component({
    selector: 'app-verify',
    template: `
<div  class = 'overlay'  fxLayout ="colomn"  fxLayoutAlign = 'center center' style = ' background : linear-gradient(to right bottom , rgb(125 ,226 ,97) , rgb(66 ,126, 181));'> 
    
    <mat-card fxLayout ="column"  fxLayoutAlign = 'center center' fxLayoutGap = '32px' fxFlex='100%'>
        <mat-icon inline class = 'icon-size'>unsubscribe </mat-icon>
        <div fxLayout ="column"  fxLayoutAlign = 'center center' fxLayoutGap = '20px'>
    <h1>you haven't verify your email </h1>
    <p>please verify your email <strong>{{email}}</strong>  which is sent to before continuing</p>

    
</div>
<button mat-raised-button> send-Email</button>
        
</mat-card>

</div>
 
   ` ,

    styles: [
        `


    .image-size{
        width : 8rem;
        height: 8rem;
        color:  rgb(125 ,226 ,97);
        
    }
    h1{
        font-weight : bold;
        font-size : 1.9rem;
        color : #42b561
    }
    h1, p{
        color : #42b561
    }
    p{
  
    text-align: center;
    width: 70%
   
    }
    button{
         align-items : center;
         background-color : #42b561;
         color : white
    }
    .icon-size{
        font-size : 4rem !important;
        margin-top : 1rem !important;
        color: #3FC54B;
        border : 2px solid #3FC54B ;
        border-radius : 50%;
        flex-wrap :wrap

    }

    mat-card{
   max-height :  50% !important;
   max-width : 43% !important;
   box-shadow: rgba(0,0,0,0.2) 0px 0px 5px 10px inset !important;
    }
    `
    ]
})
export class verificationComponentAfterLogin {
    email: "";
    static email: string;
    constructor(private activatedRoute: ActivatedRoute) {
        this.fetchUserEmail()

    }

    fetchUserEmail() {
      
        const email$ = this.activatedRoute.queryParams.pipe(map(data => data.email))
        email$.subscribe(datas => {
            this.email = datas
        })
    }



}






// 1st method
// const param$ = this.activatedRoute.queryParams;
// param$.subscribe(data=>{
//     this.email = data.email

// 2nd method
// const email$ = this.activatedRoute.queryParams.pipe(map(data => data.email))

// email$.subscribe(datas =>{
//     this.email = datas