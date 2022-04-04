import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { testComponent } from './component/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { httpService } from './service/http-service';
import { ApIService } from './service/App-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { snackBarService } from './service/snackbar-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { loginComponent } from './container/login.component';
import { signupComponent } from './container/signup.component';
import { resetPasswordComponent } from './container/forgot-password.component';
import { verificationComponentAfterLogin } from './container/verification.component';
import { authenticationGuard } from './guards/authentication-guard';
import { anonGuard } from './guards/anon-guard';
import { homeComponent } from './container/home.component';
import { onBoardingComponent } from './container/onboarding/on-boarding.component';
import { dashboardComponent } from './container/layout/dashboard.component';
import { verificationComplete } from './guards/verification-Complete';
import { OnBoardingComplete } from './guards/on-boarding-Complete';
import { OnBoardingInComplete } from './guards/on-boarding-in-complete';
import { OnBoardingIntroComponent } from './container/onboarding/on-boarding-intro.component';
import { ResumeNameComponent } from './container/onboarding/resume.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UploadComponent } from './container/tabs/upload.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UploadImageComponent } from './container/tabs/upload-image/upload-image.component';
import { MatStepperModule } from '@angular/material/stepper';
import { UploadVideoComponent } from './container/tabs/upload-video/upload-video.component';
import { ImportYoutubeComponent } from './container/tabs/upload-url/upload-url.component';
import { ResumeDetailsComponent } from './container/resume-details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ContactDetailsComponent } from './component/resume-form/contact-details.component';
import { ContactDialogueComponent } from './component/resume-form/resume-dialogues/contact-dialogue.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EducationDetailComponent } from './component/resume-form/education-details.component';
import { EducationDialogFormComponent } from './component/resume-form/resume-dialogues/education-dialogue.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { EducationCardComponent } from './component/resume-form/resume-cards/education-card.component';
import { EducationListComponent } from './component/resume-form/resume-list/education-list.component';
import { EmploymentHistoryComponent } from './component/resume-form/employment-history.component';
import { EmploymentDialogComponent } from './component/resume-form/resume-dialogues/employment-dialogue.component';
import { EmploymentCardComponent } from './component/resume-form/resume-cards/employment-card.component';
import { EmploymentListComponent } from './component/resume-form/resume-list/employment-list.component';
import { IndustrialExposureComponent } from './component/resume-form/Industrial-exposure.component';
import { IndustrialExposureDialogComponent } from './component/resume-form/resume-dialogues/Industrial-exposure-dialog.component';
import { IndustrialExposureCardComponent } from './component/resume-form/resume-cards/IndustrialExposure-card.component';
import { IndustrialExposurelistComponent } from './component/resume-form/resume-list/industrialExposure-list.component';
import { InterestComponent } from './component/resume-form/interests.component';
import { InterestCardComponent } from './component/resume-form/resume-cards/interest-card.component';
import { InterestDialogueComponent } from './component/resume-form/resume-dialogues/interest-dialogue.component';
import { InterestListComponent } from './component/resume-form/resume-list/interest-list.component';
import { WeaknessComponent } from './component/resume-form/weakness.component';
import { WeaknessCardComponent } from './component/resume-form/resume-cards/weakness-card.component';
import { WeaknessListComponent } from './component/resume-form/resume-list/weakness-list.component';
import { WeaknessDialogueComponent } from './component/resume-form/resume-dialogues/weakness-dialogue.component';
import { StrengthComponent } from './component/resume-form/strength.component';
import { StrengthDialogueComponent } from './component/resume-form/resume-dialogues/strength-dialogue.component';
import { StrengthListComponent } from './component/resume-form/resume-list/strength-list.component';
import { StrengthCardComponent } from './component/resume-form/resume-cards/strength-card.component';
import { LanguageComponent } from './component/resume-form/Language.component';
import { LanguageCardComponent } from './component/resume-form/resume-cards/language-card.component';
import { LanguageDialogueComponent } from './component/resume-form/resume-dialogues/Language-dialogue.component';
import { LangaugeListComponent } from './component/resume-form/resume-list/language-list.component';
import { ObjectiveComponent } from './component/resume-form/objectives.component';
import { ObjectiveCardComponent } from './component/resume-form/resume-cards/objectives-cards.component';
import { ObjectiveDialogueComponent } from './component/resume-form/resume-dialogues/objectives-dialogues.component';
import { ObjectiveListComponent } from './component/resume-form/resume-list/objectives-list.component';
import { ProjectDetailsCardComponent } from './component/resume-form/resume-cards/project-details-card.component';
import { ProjectDetailsDialogueComponent } from './component/resume-form/resume-dialogues/project-details-dialogues.component';
import { ProjectDetailsComponent } from './component/resume-form/projectDetails.component';
import { ProjectDetailsListComponent } from './component/resume-form/resume-list/project-details-list.component';
import { ReferenceComponent } from './component/resume-form/reference.component';
import { ReferenceCardComponent } from './component/resume-form/resume-cards/reference-card.component';
import { ReferenceDialogueComponent } from './component/resume-form/resume-dialogues/reference-dialogues.component';
import { ReferenceListComponent } from './component/resume-form/resume-list/reference-list.component';
import { AwardsComponent } from './component/resume-form/awards.component';
import { AwardsListComponent } from './component/resume-form/resume-list/awards-list.component';
import { AwardsCardComponent } from './component/resume-form/resume-cards/awards-cards.component';
import { AwardsDialogueComponent } from './component/resume-form/resume-dialogues/awards-dialogues.component';
import { SkillComponent } from './component/resume-form/skill.component';
import { SkillCardComponent } from './component/resume-form/resume-cards/skill-cards.component';
import { SkillDialogueComponent } from './component/resume-form/resume-dialogues/skill-dialogue.component';
import { SkillListComponent } from './component/resume-form/resume-list/skill-list.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { verificationInComplete } from './guards/verification-in-complete';
import { AuthRepository } from './repository/auth-repository';
import { ResumeRepository } from './repository/resume-repository';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './reducer';
import { DashboardHelpComponent } from './container/dashboard/help-center.component';
import { DashboardResumeComponent } from './container/dashboard/resume.component';
import { DashboardSettingComponent } from './container/dashboard/settings.component';
import { dashboardHeaderComponent } from './container/layout/dashboard-header.component';
import { LogoutComponent } from './container/logout/logout.component';
import { NotFoundComponent } from './container/not-found/not-found.component';
import { ProfileSettingComponent } from './container/dashboard/profile.component';
import { ChangePasswordComponent } from './container/dashboard/change-password.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ResumesCardComponent } from './component/resume-card.component';
import { AddOrEditResumeComponent } from './component/add-or-edit-resume.component';
import { singleTemplateComponent } from './component/single-template.component';
import { TemplateComponent } from './component/template.component';
import { MatRippleModule } from '@angular/material/core';
import { TemplateCardComponent } from './component/template-card.component';
import { BluesTemplateComponent } from './component/templates/blues-templates.component';
import { SimpleTemplateComponent } from './component/templates/simple-template.component';
import { AdvancedTemplateComponent } from './component/templates/Advanced-template.component';
import { RoyalTemplateComponent } from './component/templates/royal-templates.component';
import { ClassicTemplateComponent } from './component/templates/classic-template.component';
import { SingleResumeTemplateComponent } from './component/single-resume-template.component';
import { ViewResumeTemplateComponent } from './component/view-resume.component';
import { templateContactDetailsComponent } from './component/resume-templates/contact-detail.component';
import { TemplateButtonsComponent } from './component/resume-templates/template-buttons.component';
import { SkillTemplateComponent } from './component/resume-templates/skill-templates.component';
import { LanguageTemplateComponent } from './component/resume-templates/language-template.component';
import { StrengthTemplateComponent } from './component/resume-templates/strength-template.component';
import { WeaknessTemplateComponent } from './component/resume-templates/weakness-template.component';
import { TemplateDetailsComponent } from './component/resume-templates/template-details.component';
import { EducationTemplateComponent } from './component/resume-templates/education-template.component';
import { ExperienceTemplateComponent } from './component/resume-templates/experience-template.component';
import { AwardsTemplateComponent } from './component/resume-templates/awards-template.component';
import { ObjectiveTemplateComponent } from './component/resume-templates/objective-template.component';
import { ReferenceTemplateComponent } from './component/resume-templates/reference-template.component';
import { ProjectDetailTemplateComponent } from './component/resume-templates/project-detail-template.component';
import { IndustrialExposureTemplateComponent } from './component/resume-templates/industrial-exposure-template.component';
import { InterestTemplateComponent } from './component/resume-templates/interest-template.component';



@NgModule({
  declarations: [
    AppComponent,
    testComponent,
    loginComponent,
    signupComponent,
    resetPasswordComponent,
    verificationComponentAfterLogin,
    homeComponent,
    onBoardingComponent,
    dashboardComponent,
    OnBoardingIntroComponent,
    ResumeNameComponent,
    UploadComponent,
    UploadImageComponent,
    UploadVideoComponent,
    ImportYoutubeComponent,
    ResumeDetailsComponent,
    ContactDetailsComponent,
    ContactDialogueComponent,
    EducationDetailComponent,
    EducationDialogFormComponent,
    EducationListComponent,
    EducationCardComponent,
    EmploymentHistoryComponent,
    EmploymentDialogComponent,
    EmploymentCardComponent,
    EmploymentListComponent,
    IndustrialExposureComponent,
    IndustrialExposureDialogComponent,
    IndustrialExposureCardComponent,
    IndustrialExposurelistComponent,
    InterestComponent,
    InterestCardComponent,
    InterestDialogueComponent,
    InterestListComponent,
    WeaknessComponent,
    WeaknessCardComponent,
    WeaknessListComponent,
    WeaknessDialogueComponent,
    StrengthComponent,
    StrengthDialogueComponent,
    StrengthListComponent,
    StrengthCardComponent,
    LanguageComponent,
    LanguageCardComponent,
    LanguageDialogueComponent,
    LangaugeListComponent,
    ObjectiveComponent,
    ObjectiveCardComponent,
    ObjectiveDialogueComponent,
    ObjectiveListComponent,
    ProjectDetailsCardComponent,
    ProjectDetailsDialogueComponent,
    ProjectDetailsComponent,
    ProjectDetailsListComponent,
    ReferenceComponent,
    ReferenceCardComponent,
    ReferenceDialogueComponent,
    ReferenceListComponent,
    AwardsComponent,
    AwardsListComponent,
    AwardsCardComponent,
    AwardsDialogueComponent,
    SkillComponent,
    SkillCardComponent,
    SkillDialogueComponent,
    SkillListComponent,
    DashboardHelpComponent,
    DashboardResumeComponent,
    DashboardSettingComponent,
    dashboardHeaderComponent,
    LogoutComponent,
    NotFoundComponent,
    ProfileSettingComponent,
    ChangePasswordComponent,
    ResumesCardComponent,
    AddOrEditResumeComponent,
    singleTemplateComponent,
    TemplateComponent,
    TemplateCardComponent,
    BluesTemplateComponent,
    SimpleTemplateComponent,
    AdvancedTemplateComponent,
    RoyalTemplateComponent,
    ClassicTemplateComponent,
    SingleResumeTemplateComponent,
    ViewResumeTemplateComponent,
    templateContactDetailsComponent,
    TemplateButtonsComponent,
    SkillTemplateComponent,
    LanguageTemplateComponent,
    StrengthTemplateComponent,
    WeaknessTemplateComponent,
    TemplateDetailsComponent,
    EducationTemplateComponent,
    ExperienceTemplateComponent,
    AwardsTemplateComponent,
    ObjectiveTemplateComponent,
    ReferenceTemplateComponent,
    ProjectDetailTemplateComponent,
    IndustrialExposureTemplateComponent,
    InterestTemplateComponent


  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,
    MatExpansionModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatRippleModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      // logOnly: environment.production 
      // Retains last 25 states// Restrict extension to log-only mode
    }),


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [httpService, ApIService,
    snackBarService,
    authenticationGuard,
    anonGuard,
    verificationInComplete,
    verificationComplete,
    OnBoardingComplete,
    OnBoardingInComplete,
    AuthRepository,
    ResumeRepository
  ],
  bootstrap: [AppComponent]
})

export class AppModule {


}
















