import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { loginComponent } from './container/login.component';
import { resetPasswordComponent } from './container/forgot-password.component';
import { signupComponent } from './container/signup.component';
import { authenticationGuard } from './guards/authentication-guard';
import { anonGuard } from './guards/anon-guard';
import { onBoardingComponent } from './container/onboarding/on-boarding.component';
import { verificationComponentAfterLogin } from './container/verification.component';
import { dashboardComponent } from './container/layout/dashboard.component';
import { verificationComplete } from './guards/verification-Complete';
import { verificationInComplete } from './guards/verification-in-complete';
import { OnBoardingComplete } from './guards/on-boarding-Complete';
import { OnBoardingInComplete } from './guards/on-boarding-in-complete';
import { OnBoardingIntroComponent } from './container/onboarding/on-boarding-intro.component';
import { DashboardSettingComponent } from './container/dashboard/settings.component';
import { DashboardHelpComponent } from './container/dashboard/help-center.component';
import { DashboardResumeComponent } from './container/dashboard/resume.component';
import { LogoutComponent } from './container/logout/logout.component';
import { NotFoundComponent } from './container/not-found/not-found.component';
import { TemplateComponent } from './component/template.component';
import { singleTemplateComponent } from './component/single-template.component';
import { SingleResumeTemplateComponent } from './component/single-resume-template.component';
import { ViewResumeTemplateComponent } from './component/view-resume.component';
import { ResumeDetailsComponent } from './container/resume-details.component';
import { UploadComponent } from './container/tabs/upload.component';



const routes: Routes = [
  {
    path: '', canActivate: [anonGuard],
    children: [
      { path: 'signup', component: signupComponent },
      { path: 'forgotpassword', component: resetPasswordComponent },
      { path: '', component: loginComponent }]
  },

  {
    path: '', canActivate: [authenticationGuard, verificationInComplete],
    children: [
      { path: 'verify', component: verificationComponentAfterLogin },
    ]
  },

  {
    path: '', canActivate: [authenticationGuard, verificationComplete, OnBoardingInComplete],
    children: [

      { path: 'on_boarding', component: OnBoardingIntroComponent },
      { path: 'on_boarding/add', component: onBoardingComponent }
    ]
  },
  { path: 'resume/view/:id', component: SingleResumeTemplateComponent },

  {
    path: '', canActivate: [authenticationGuard, OnBoardingComplete, verificationComplete],

    children:
      [

        {
          path: 'dashboard', component: dashboardComponent,
          children:
            [
              { path: 'settings', component: DashboardSettingComponent },
              { path: 'helpCenter', component: DashboardHelpComponent },
              { path: 'resume', component: DashboardResumeComponent },
              { path: 'resume/template/:id', component: TemplateComponent },
              { path: 'resume/template/:id/:templateId', component: singleTemplateComponent },
              { path: 'resume/preview/:id', component: SingleResumeTemplateComponent }, {
                path: "resume/edit/:id", component: ResumeDetailsComponent
              },
              { path: "resume/edit/profile/:id", component: UploadComponent }
            ]


        }
      ]
  },

  {
    path: "logout", component: LogoutComponent
  },

  {
    path: "**", component: NotFoundComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}









  // login -> verify -> onboarding 


