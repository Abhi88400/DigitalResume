
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { contactDetails } from "../models/contact-details";
import { Resume } from "../models/resume";
import { User } from "../models/user";
import { authUtils } from "../utils/auth-utils";
import { httpService } from "./http-service";
import { snackBarService } from "./snackbar-service";



@Injectable()
export class ApIService {


    constructor(
        private httpService: httpService,
        private snackbarService : snackBarService

    ) {
        this.httpService = httpService
    }

    signup(
        data: {
            email: string, password: string, confirm_password: string, job_category: string, name: string, experience_level: string,
        }) {
        return this.httpService.post('/user/Signup', data)
    }


    loginAndSetAuthToken(data: { email: string, password: string }): Observable<User> {

        return this.httpService.Get('/user/login', data).pipe(map(res => {
            if(res){

                authUtils.setAuthToken(res.token)
                return res.user
            }else{
                this.snackbarService.decline("no Account Exist")
              
            }
        }));
    }

    fetchUser(): Observable<User> {
        return this.httpService.Get('/user/fetch')
    }

    checkUserResume() {

        return this.httpService.Get('/resume/all')
    }

    fetchSingleResume(resumeId) {
        return this.httpService.Get('/resume/' + resumeId)
    }

    addUserResume(data: { name: string }) {
        return this.httpService.post('/resume/add/resume', data)
    }

    deleteResume(ResumeId) {
        return this.httpService.delete("/resume/delete/resume/" + ResumeId)
    }
    // File = Provides information about files and allows JavaScript in a web page to access their content

    saveOrUpdateIamge(image: File, resumeId: string): Observable<Resume> {

        const formData = new FormData()
        formData.append('profile_image', image)

        return this.httpService.post('/resume/add/image/' + resumeId, formData)
    }

    AddYoutubeURL(resumeId: string, data: { video_url: string }) {
        return this.httpService.Patch('/resume/import/video/' + resumeId, data)
    }


    deleteImage(resumeId: string) {
        return this.httpService.delete('/resume/delete/image/' + resumeId)
    }


    resendEmail(data: { email: string }): Observable<any> {

        return this.httpService.Get('/user/reset/password/email', data);
    }

    resetPassword(data: {
        code: any,
        new_password: string,
        confirm_password: string
    }): Observable<any> {
        return this.httpService.Patch('/user/reset/password', data)

    }

    // contactDetail

    SaveContactDetails(ResumeId: string, data) {
        return this.httpService.post('/resume/add/contactDetails/' + ResumeId, data)
    }

    UpdateContactDetails(ContactDetailsId: string, data): Observable<contactDetails> {
        return this.httpService.Patch('/resume/update/contactDetails/' + ContactDetailsId, data)

    }

    // educationDetail

    SaveEducationDetails(ResumeId: string, data) {
        return this.httpService.post('/resume/add/education/' + ResumeId, data)
    }
    UpdateEducationDetails(EducationDetailsId: string, data) {
        return this.httpService.Patch('/resume/update/education/' + EducationDetailsId, data)

    }
    DeleteEducationDetails(EducationId: string) {

        return this.httpService.delete('/resume/delete/education/' + EducationId)
    }

    // employmentDetail

    SaveEmploymentDetail(ResumeId: string, data) {
        return this.httpService.post('/resume/add/employmentHistory/' + ResumeId, data)
    }
    UpdateEmploymentDetail(EmploymentId: string, data) {
        return this.httpService.Patch('/resume/update/employmentHistory/' + EmploymentId, data)
    }
    DeleteEmploymentDetails(EmploymentId: string) {
        return this.httpService.delete('/resume/delete/employmentHistory/' + EmploymentId)
    }

    // industrialExposure 

    SaveIndustrialExposureDetail(ResumeId: string, data) {
        return this.httpService.post('/resume/add/industrialExposure/' + ResumeId, data)

    }
    UpdateIndustrialExposureDetail(IndustrialExposureId: string, data) {
        return this.httpService.Patch('/resume/update/industrialExposure/' + IndustrialExposureId, data)

    }
    DeleteIndustrialExposureDetail(IndustrialExposureId: string) {
        return this.httpService.delete('/resume/delete/industrialExposure/' + IndustrialExposureId)

    }

    // interest

    SaveInterest(ResumeId: string, data) {
        return this.httpService.post('/resume/add/interest/' + ResumeId, data)

    }
    UpdateInterest(InterestId: string, data) {
        return this.httpService.Patch('/resume/update/interest/' + InterestId, data)

    }
    DeleteInterest(InterestId: string) {
        return this.httpService.delete('/resume/delete/interest/' + InterestId)

    }

    // Weakness

    SaveWeakness(ResumeId: string, data) {
        return this.httpService.post('/resume/add/weakness/' + ResumeId, data)

    }

    UpdateWeakness(WeaknessId: string, data) {
        return this.httpService.Patch('/resume/update/weakness/' + WeaknessId, data)

    }

    DeleteWeakness(WeaknessId: string) {
        return this.httpService.delete('/resume/delete/weakness/' + WeaknessId)
    }

    // strength

    SaveStrength(ResumeId: string, data) {
        return this.httpService.post('/resume/add/strength/' + ResumeId, data)

    }
    UpdateStrength(StrengthId: string, data) {
        return this.httpService.Patch('/resume/update/strength/' + StrengthId, data)

    }


    DeleteStrength(StrengthId: string) {
        return this.httpService.delete('/resume/delete/strength/' + StrengthId)
    }

    //language

    SaveLanguage(ResumeId: string, data) {
        return this.httpService.post('/resume/add/language/' + ResumeId, data)

    }
    UpdateLanguage(LanguageId: string, data) {
        return this.httpService.Patch('/resume/update/language/' + LanguageId, data)

    }


    DeleteLanguage(LanguageId: string) {
        return this.httpService.delete('/resume/delete/language/' + LanguageId)
    }

    // objective

    SaveObjective(ResumeId: string, data) {
        return this.httpService.post('/resume/add/objective/' + ResumeId, data)

    }

    UpdateObjective(ObjectiveId: string, data) {
        return this.httpService.Patch('/resume/update/objective/' + ObjectiveId, data)

    }


    DeleteObjective(ObjectiveId: string) {
        return this.httpService.delete('/resume/delete/objective/' + ObjectiveId)
    }

    //project Details

    SaveProjectDetails(ResumeId: string, data) {
        return this.httpService.post('/resume/add/projectDetail/' + ResumeId, data)

    }

    UpdateProjectDetails(ProjectDetailsId: string, data) {
        return this.httpService.Patch('/resume/update/projectDetail/' + ProjectDetailsId, data)

    }


    DeleteProjectDetails(ProjectDetailsId: string) {
        return this.httpService.delete('/resume/delete/projectDetail/' + ProjectDetailsId)
    }

    // reference

    SaveReference(ResumeId: string, data) {
        return this.httpService.post('/resume/add/reference/' + ResumeId, data)

    }

    UpdateReference(ReferenceId: string, data) {
        return this.httpService.Patch('/resume/update/reference/' + ReferenceId, data)

    }


    DeleteReference(ReferenceId: string) {
        return this.httpService.delete('/resume/delete/reference/' + ReferenceId)
    }


    //achievments

    SaveAchivements(ResumeId: string, data) {
        return this.httpService.post('/resume/add/award/' + ResumeId, data)

    }

    UpdateAchivements(ReferenceId: string, data) {
        return this.httpService.Patch('/resume/update/awardAchivements/' + ReferenceId, data)

    }


    DeleteAchivements(ReferenceId: string) {
        return this.httpService.delete('/resume/delete/awardAchivements/' + ReferenceId)
    }



    // skills


    SaveSkills(ResumeId: string, data) {
        return this.httpService.post('/resume/add/skill/' + ResumeId, data)

    }

    UpdateSkills(skillId: string, data) {
        return this.httpService.Patch('/resume/update/skill/' + skillId, data)

    }


    DeleteSkills(skillId: string) {
        return this.httpService.delete('/resume/delete/skill/' + skillId)
    }

    updateOnBoarding(data: { onboarding: number }) {
        return this.httpService.Patch('/user/update/onboarding', data);
    }

    // Settings Profile

    updateProfile(data) {
        return this.httpService.Patch('/user/update/profile', data)
    }

    updatePassword(data) {
        return this.httpService.Patch("/user/update/password", data)
    }


    updateResumeName(data: { name: string }, ResumeId: string) {
        return this.httpService.Patch('/resume/update/resume/' + ResumeId, data)
    }
}








// A blob is a data type that can store binary data.
//  This is different than most other data types used in databases,
//   such as integers, floating point numbers, characters, and strings,
//    which store letters and numbers. Since blobs can store binary data, they can be used to store
//    images or other multimedia files.

// git clone https://bitbucket.org/shagun123/resume-api-ck.git

// function Point(x, y) {
//     this.x = x;
//     this.y = y;
//   }

//   Point.prototype.toString = function() {
//     return `${this.x},${this.y}`;
//   };

//   const p = new Point(1, 2);
//   p.toString();
//   // '1,2'

//   //  not supported in the polyfill below,

//   //  works fine with native bind:

//   const YAxisPoint = Point.bind(null, 0/*x*/);

//   const emptyObj = {};
//   const YAxisPoint = Point.bind(emptyObj, 0/*x*/);

//   const axisPoint = new YAxisPoint(5);
//   axisPoint.toString();                    // '0,5'

//   axisPoint instanceof Point;              // true
//   axisPoint instanceof YAxisPoint;         // true
//   new YAxisPoint(17, 42) instanceof Point; // true





