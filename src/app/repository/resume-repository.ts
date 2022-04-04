import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import {
    AwardsAddAction, AwardsDeleteAction, AwardsUpdateAction, ContactDetailAddAction,
    ContactDetailUpdateAction, EducationDetailAddAction, EducationDetailDeleteAction, EducationDetailUpdateAction,
    EmploymentHistoryAddAction, EmploymentHistoryDeleteAction, EmploymentHistoryUpdateAction,
    IndustrialExposureAddAction, IndustrialExposureDeleteAction, IndustrialExposureUpdateAction,
    InterestAddAction, InterestDeleteAction, InterestUpdateAction, LanguageAddAction,
    LanguageDeleteAction, LanguageUpdateAction, ObjectiveAddAction, ObjectiveDeleteAction,
    ObjectiveUpdateAction, ProjectDetailAddAction, ProjectDetailDeleteAction, ProjectDetailUpdateAction,
    ReferenceAddAction, ReferenceDeleteAction, ReferenceUpdateAction, ResumeAddAction,
    ResumeDeleteAction, ResumeListRequestAction, ResumeListSuccessAction, ResumeUpdateAction,
    SkillAddAction, SkillDeleteAction, SkillUpdateAction, StrengthAddAction, StrengthDeleteAction,
    StrengthUpdateAction, WeaknessAddAction, WeaknessDeleteAction, WeaknessUpdateAction
} from "../action/resume-action";
import { UserProfileUpdateAction } from "../action/user-action";
import { Resume } from "../models/resume";
import { getResume, getResumeById, ResumeError, ResumeLoaded, Resumeloading } from "../reducer";
import { ApIService } from "../service/App-service";

@Injectable()
export class ResumeRepository {

    constructor(private ApiService: ApIService, private store: Store) {
    }


    fetchAllResumes(force = false): [Observable<boolean>, Observable<boolean>, Observable<Resume[]>] {

        const loading$ = this.store.select(Resumeloading)
        const loaded$ = this.store.select(ResumeLoaded)
        const resume$ = this.store.select(getResume)
        const error$ = this.store.select(ResumeError)
        combineLatest([loading$, loaded$]).pipe(take(1)).subscribe(data => {

            if (!data[0] && !data[1] || force) {
                this.store.dispatch(new ResumeListRequestAction())
                this.ApiService.checkUserResume().subscribe(data => {
                    this.store.dispatch(new ResumeListSuccessAction(data))
                })
            }
        })
        return [loading$, error$, resume$]
    }

    fetchSingleResume(id, force = false) {
        const resume$ = this.store.select((state: any) => {
            console.log(id)
            return getResumeById(state, id)
        })
        // take(1) ye changes ko listen na kre
        resume$.pipe(take(1)).subscribe((data) => {
            if (!data || force) {
                this.ApiService.fetchSingleResume(id).subscribe(res => {
                    this.store.dispatch(new ResumeAddAction(res));
                    console.log(res)
                })
            }
        })
        return resume$
    }

    AddResume(data: { name: string }) {
        return this.ApiService.addUserResume(data).pipe(map((res) => {
            this.store.dispatch(new ResumeAddAction(res))
            return res
        }))
    }

    updateResume(data, ResumeId) {
        return this.ApiService.updateResumeName(data, ResumeId).pipe(map((res) => {
            this.store.dispatch(new ResumeUpdateAction(res))
            return res
        }))
    }


    deleteResume(ResumeId) {
        return this.ApiService.deleteResume(ResumeId).pipe(map((res) => {
            this.store.dispatch(new ResumeDeleteAction(ResumeId))
            return res
        }))
    }


    saveOrUpdateIamge(image: File, resumeId: string) {

        return this.ApiService.saveOrUpdateIamge(image, resumeId).pipe(map((res) => {
            this.store.dispatch(new ResumeUpdateAction(res))
            return res
        }))
    }

    deleteImage(resumeId: string) {
        return this.ApiService.deleteImage(resumeId).pipe(map((res) => {
            this.store.dispatch(new ResumeUpdateAction(res))
            return res
        }))
    }

    AddYoutubeURL(resumeId: string, data: { video_url: string }) {
        return this.ApiService.AddYoutubeURL(resumeId, data).pipe(map((res) => {
            this.store.dispatch(new ResumeUpdateAction(res))
            return res
        }))
    }

    updateContactDetails(ContactDetailsId: string, data, resumeId: string) {
        return this.ApiService.UpdateContactDetails(ContactDetailsId, data).pipe(map((res) => {
            this.store.dispatch(new ContactDetailUpdateAction({ contactDetails: res, ResumeId: resumeId }))
            return res

        }))
    }

    SaveContactDetails(ResumeId: string, data) {
        return this.ApiService.SaveContactDetails(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new ContactDetailAddAction({ contactDetails: res, ResumeId }))
            return res
        }))
    }
    // skills

    SaveSkills(ResumeId: string, data) {

        return this.ApiService.SaveSkills(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new SkillAddAction({ skills: res, ResumeId }));
            // return res;
        }))
    }


    UpdateSkills(skillId: string, data, resumeId: string) {

        return this.ApiService.UpdateSkills(skillId, data).pipe(map((res) => {
            this.store.dispatch(new SkillUpdateAction({ skills: res, ResumeId: resumeId }))
            // return res
        }))
    }

    DeleteSkills(skillId: string, ResumeId: string) {
        return this.ApiService.DeleteSkills(skillId).pipe(map((res) => {
            this.store.dispatch(new SkillDeleteAction({ skills: res, ResumeId }))
            // return res

        }))
    }
    // Education Detail

    SaveEducationDetails(ResumeId: string, data) {
        return this.ApiService.SaveEducationDetails(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new EducationDetailAddAction({ education: res, ResumeId }))
            return res
        }))
    }
    UpdateEducationDetails(EducationDetailsId: string, data, ResumeId: string) {
        return this.ApiService.UpdateEducationDetails(EducationDetailsId, data).pipe(map((res) => {
            this.store.dispatch(new EducationDetailUpdateAction({ education: res, ResumeId }))
            return res
        }))

    }
    DeleteEducationDetails(EducationId: string, ResumeId: string) {
        return this.ApiService.DeleteEducationDetails(EducationId).pipe(map((res) => {
            this.store.dispatch(new EducationDetailDeleteAction({ education: res, ResumeId }))
            return res
        }))
    }
    // Employment Detail

    SaveEmploymentDetail(ResumeId: string, data) {
        return this.ApiService.SaveEmploymentDetail(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new EmploymentHistoryAddAction({ employmentHistory: res, ResumeId }))
            return res
        }))
    }
    UpdateEmploymentDetail(EmploymentId: string, data, ResumeId: string) {
        return this.ApiService.UpdateEmploymentDetail(EmploymentId, data).pipe(map((res) => {
            this.store.dispatch(new EmploymentHistoryUpdateAction({ employmentHistory: res, ResumeId }))
            return res
        }))
    }
    DeleteEmploymentDetails(EmploymentId: string, ResumeId: string) {
        return this.ApiService.DeleteEmploymentDetails(EmploymentId).pipe(map((res) => {
            this.store.dispatch(new EmploymentHistoryDeleteAction({ employmentHistory: res, ResumeId }))
            return res
        }))
    }

    // Industrial Exposure 

    SaveIndustrialExposureDetail(ResumeId: string, data) {
        return this.ApiService.SaveIndustrialExposureDetail(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new IndustrialExposureAddAction({ industrialExposure: res, ResumeId }))
            return res
        }))
    }
    UpdateIndustrialExposureDetail(IndustrialExposureId: string, data, ResumeId: string) {
        return this.ApiService.UpdateIndustrialExposureDetail(IndustrialExposureId, data).pipe(map((res) => {
            this.store.dispatch(new IndustrialExposureUpdateAction({ industrialExposure: res, ResumeId }))
            return res
        }))
    }

    DeleteIndustrialExposureDetail(IndustrialExposureId: string, ResumeId: string) {

        return this.ApiService.DeleteIndustrialExposureDetail(IndustrialExposureId).pipe(map((res) => {
            this.store.dispatch(new IndustrialExposureDeleteAction({ industrialExposure: res, ResumeId }))
            return res
        }))
    }

    // interest

    SaveInterest(ResumeId: string, data) {
        return this.ApiService.SaveInterest(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new InterestAddAction({ interest: res, ResumeId }))
            return res
        }))
    }
    UpdateInterest(InterestId: string, data, ResumeId: string) {
        return this.ApiService.UpdateInterest(InterestId, data).pipe(map((res) => {
            this.store.dispatch(new InterestUpdateAction({ interest: res, ResumeId }))
            return res

        }))
    }
    DeleteInterest(InterestId: string, ResumeId: string) {
        return this.ApiService.DeleteInterest(InterestId).pipe(map((res) => {
            this.store.dispatch(new InterestDeleteAction({ interest: res, ResumeId }))
            return res

        }))
    }

    // weakness

    SaveWeakness(ResumeId: string, data) {
        return this.ApiService.SaveWeakness(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new WeaknessAddAction({ weakness: res, ResumeId }))
            return res
        }))
    }

    UpdateWeakness(WeaknessId: string, data, ResumeId: string) {
        return this.ApiService.UpdateWeakness(WeaknessId, data).pipe(map((res) => {
            this.store.dispatch(new WeaknessUpdateAction({ weakness: res, ResumeId }))
            return res
        }))
    }

    DeleteWeakness(WeaknessId: string, ResumeId: string) {
        return this.ApiService.DeleteWeakness(WeaknessId).pipe(map((res) => {
            this.store.dispatch(new WeaknessDeleteAction({ weakness: res, ResumeId }))
            return res
        }))
    }

    // strength

    SaveStrength(ResumeId: string, data) {
        return this.ApiService.SaveStrength(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new StrengthAddAction({ strength: res, ResumeId }))
            return res
        }))
    }

    UpdateStrength(StrengthId: string, data, ResumeId: string) {

        return this.ApiService.UpdateStrength(StrengthId, data).pipe(map((res) => {
            this.store.dispatch(new StrengthUpdateAction({ strength: res, ResumeId }))
            return res
        }))
    }

    DeleteStrength(StrengthId: string, ResumeId: string) {

        return this.ApiService.DeleteStrength(StrengthId).pipe(map((res) => {
            this.store.dispatch(new StrengthDeleteAction({ strength: res, ResumeId }))
            return res
        }))
    }

    // language

    SaveLanguage(ResumeId: string, data) {
        return this.ApiService.SaveLanguage(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new LanguageAddAction({ language: res, ResumeId }))
            return res
        }))
    }
    UpdateLanguage(LanguageId: string, data, ResumeId: string) {

        return this.ApiService.UpdateLanguage(LanguageId, data).pipe(map((res) => {
            this.store.dispatch(new LanguageUpdateAction({ language: res, ResumeId }))
            return res
        }))
    }


    DeleteLanguage(LanguageId: string, ResumeId: string) {
        return this.ApiService.DeleteLanguage(LanguageId).pipe(map((res) => {
            this.store.dispatch(new LanguageDeleteAction({ language: res, ResumeId }))
            return res
        }))
    }

    // objective 

    SaveObjective(ResumeId: string, data) {
        console.log(ResumeId, data)
        return this.ApiService.SaveObjective(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new ObjectiveAddAction({ objectives: res, ResumeId }))
            return res
        }))
    }

    UpdateObjective(ObjectiveId: string, data, ResumeId: string) {
        return this.ApiService.UpdateObjective(ObjectiveId, data).pipe(map((res) => {
            this.store.dispatch(new ObjectiveUpdateAction({ objectives: res, ResumeId }))
            return res
        }))
    }


    DeleteObjective(ObjectiveId: string, ResumeId: string) {
        return this.ApiService.DeleteObjective(ObjectiveId).pipe(map((res) => {
            this.store.dispatch(new ObjectiveDeleteAction({ objectives: res, ResumeId }))
            return res
        }))
    }

    // reference 

    SaveProjectDetails(ResumeId: string, data) {
        return this.ApiService.SaveProjectDetails(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new ProjectDetailAddAction({ projectDetails: res, ResumeId }))
            return res
        }))
    }

    UpdateProjectDetails(ProjectDetailsId: string, data, ResumeId: string) {
        return this.ApiService.UpdateProjectDetails(ProjectDetailsId, data).pipe(map((res) => {
            this.store.dispatch(new ProjectDetailUpdateAction({ projectDetails: res, ResumeId }))
            return res
        }))
    }


    DeleteProjectDetails(ProjectDetailsId: string, ResumeId: string) {
        return this.ApiService.DeleteProjectDetails(ProjectDetailsId).pipe(map((res) => {
            this.store.dispatch(new ProjectDetailDeleteAction({ projectDetails: res, ResumeId }))
            return res
        }))
    }

    // reference

    SaveReference(ResumeId: string, data) {
        return this.ApiService.SaveReference(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new ReferenceAddAction({ reference: res, ResumeId }))
            return res
        }))
    }

    UpdateReference(ReferenceId: string, data, ResumeId: string) {

        return this.ApiService.UpdateReference(ReferenceId, data).pipe(map((res) => {
            this.store.dispatch(new ReferenceUpdateAction({ reference: res, ResumeId }))
            return res
        }))
    }


    DeleteReference(ReferenceId: string, ResumeId: string) {

        return this.ApiService.DeleteReference(ReferenceId).pipe(map((res) => {
            this.store.dispatch(new ReferenceDeleteAction({ reference: res, ResumeId }))
            return res
        }))
    }

    // achievments

    SaveAchivements(ResumeId: string, data) {

        return this.ApiService.SaveAchivements(ResumeId, data).pipe(map((res) => {
            this.store.dispatch(new AwardsAddAction({ AwardsAndAchivements: res, ResumeId }))
            return res
        }))
    }

    UpdateAchivements(ReferenceId: string, data, ResumeId: string) {
        return this.ApiService.UpdateAchivements(ReferenceId, data).pipe(map((res) => {
            this.store.dispatch(new AwardsUpdateAction({ AwardsAndAchivements: res, ResumeId }))
            return res
        }))
    }


    DeleteAchivements(ReferenceId: string, ResumeId: string) {
        return this.ApiService.DeleteAchivements(ReferenceId).pipe(map((res) => {
            this.store.dispatch(new AwardsDeleteAction({ AwardsAndAchivements: res, ResumeId }))
            return res
        }))
    }

    updateOnBoarding(data: { onboarding: number }) {
        return this.ApiService.updateOnBoarding(data).pipe(map((res) => {
            this.store.dispatch(new UserProfileUpdateAction(res))
            return res
        }))
    }


}























