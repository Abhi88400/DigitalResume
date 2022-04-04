import { awardsAchivements } from "../models/award_achivements"
import { contactDetails } from "../models/contact-details"
import { education } from "../models/education"
import { employmentHistory } from "../models/employment-history"
import { industrialExposure } from "../models/industrial-Exposures"
import { interests } from "../models/interests"
import { languages } from "../models/languages"
import { objectives } from "../models/objectives"
import { projectDetails } from "../models/project-Details"
import { references } from "../models/refrences"
import { Resume } from "../models/resume"
import { skills } from "../models/skills"
import { strengths } from "../models/strengths"
import { weakness } from "../models/weakness"
import { Action } from "./index"

export const RESUME_ADD_SUCCESS = "[RESUME_ADD SUCCESS]"
export const RESUME_UPDATE = "[RESUME_UPDATE] "
export const RESUME_DELETE = "[RESUME_DELETE]"
export const RESUME_LIST_REQUEST = "[RESUME_LIST_REQUEST]"
export const RESUME_LIST_SUCCESS = "[RESUME_LIST_SUCCESS] "
export const RESUME_ERROR = "[RESUME_ERROR]"


//RESUME

export class ResumeListRequestAction implements Action {

    readonly type = RESUME_LIST_REQUEST

}


export class ResumeListSuccessAction implements Action {

    readonly type = RESUME_LIST_SUCCESS
    constructor(public payload: Resume[]) {

    }

}
export class ResumeErrorAction implements Action {

    readonly type = RESUME_ERROR
    constructor() {

    }

}

export class ResumeUpdateAction implements Action {
    readonly type = RESUME_UPDATE
    constructor(public payload: Resume) {

    }
}

export class ResumeDeleteAction implements Action {
    readonly type = RESUME_DELETE
    constructor(public payload: string) {

    }
}

export class ResumeAddAction implements Action {
    readonly type = RESUME_ADD_SUCCESS
    constructor(public payload: Resume) {

    }
}


// NESTED

export const RESUME_CONTACT_DETAILS_ADD = "RESUME CONTACT DETAILS ADD"
export const RESUME_CONTACT_DETAILS_UPDATE = "RESUME CONTACT DETAILS UPDATE"

export const RESUME_EDUCATION_DETAILS_ADD = "RESUME EDUCATION_DETAILS ADD"
export const RESUME_EDUCATION_DETAILS_UPDATE = "RESUME EDUCATION_DETAILS UPDATE"
export const RESUME_EDUCATION_DETAILS_DELETE = "RESUME EDUCATION_DETAILS DELETE"

export const RESUME_AWARD_ACHIVEMENTS_ADD = "RESUME AWARD_ACHIVEMENTS ADD"
export const RESUME_AWARD_ACHIVEMENTS_UPDATE = "RESUME AWARD_ACHIVEMENTS UPDATE"
export const RESUME_AWARD_ACHIVEMENTS_DELETE = "RESUME AWARD_ACHIVEMENTS DELETE"

export const RESUME_PROJECT_DETAILS_ADD = "RESUME PROJECT_DETAILS ADD"
export const RESUME_PROJECT_DETAILS_UPDATE = "RESUME PROJECT_DETAILS UPDATE"
export const RESUME_PROJECT_DETAILS_DELETE = "RESUME PROJECT_DETAILS DELETE"

export const RESUME_LANGUAGE_ADD = "RESUME LANGUAGE ADD"
export const RESUME_LANGUAGE_UPDATE = "RESUME LANGAUGE  UPDATE"
export const RESUME_LANGUAGE_DELETE = "RESUME LANGAUGE  DELETE"

export const RESUME_INTEREST_ADD = "RESUME INTEREST ADD"
export const RESUME_INTEREST_UPDATE = "RESUME INTEREST  UPDATE"
export const RESUME_INTEREST_DELETE = "RESUME INTEREST  DELETE"

export const RESUME_REFERENCE_ADD = "RESUME REFERENCE ADD"
export const RESUME_REFERENCE_UPDATE = "RESUME REFERENCE  UPDATE"
export const RESUME_REFERENCE_DELETE = "RESUME REFERENCE  DELETE"

export const RESUME_EMPLOYMENT_HISTORY_ADD = " RESUME EMPLOYMENT HISTORY ADD"
export const RESUME_EMPLOYMENT_HISTORY_UPDATE = " RESUME EMPLOYMENT HISTORY ADD"
export const RESUME_EMPLOYMENT_HISTORY_DELETE = " RESUME EMPLOYMENT HISTORY DELETE"

export const RESUME_INDUSTRIAL_EXPOSURE_ADD = " RESUME INDUSTRIAL_EXPOSURE ADD"
export const RESUME_INDUSTRIAL_EXPOSURE_UPDATE = " RESUME INDUSTRIAL_EXPOSURE ADD"
export const RESUME_INDUSTRIAL_EXPOSURE_DELETE = " RESUME INDUSTRIAL_EXPOSURE  DELETE"

export const RESUME_OBJECTIVES_ADD = " RESUME OBJECTIVES ADD"
export const RESUME_OBJECTIVES_UPDATE = " RESUME OBJECTIVES ADD"
export const RESUME_OBJECTIVES_DELETE = " RESUME OBJECTIVES  DELETE"

export const RESUME_STRENGTH_ADD = " RESUME STRENGTH ADD"
export const RESUME_STRENGTH_UPDATE = " RESUME STRENGTH ADD"
export const RESUME_STRENGTH_DELETE = " RESUME STRENGTH  DELETE"

export const RESUME_WEAKNESS_ADD = " RESUME WEAKNESS ADD"
export const RESUME_WEAKNESS_UPDATE = " RESUME WEAKNESS ADD"
export const RESUME_WEAKNESS_DELETE = " RESUME WEAKNESS  DELETE"

export const RESUME_SKILL_ADD = " RESUME SKILL ADD"
export const RESUME_SKILL_UPDATE = " RESUME SKILL ADD"
export const RESUME_SKILL_DELETE = " RESUME SKILL  DELETE"

// contactDetail
export class ContactDetailAddAction implements Action {
    readonly type = RESUME_CONTACT_DETAILS_ADD

    constructor(public payload: { contactDetails: contactDetails, ResumeId: string }) {
    }
}
export class ContactDetailUpdateAction implements Action {
    readonly type = RESUME_CONTACT_DETAILS_UPDATE

    constructor(public payload: { contactDetails: contactDetails, ResumeId: string }) {
    }
}


// ProjectDetail
export class ProjectDetailAddAction implements Action {
    readonly type = RESUME_PROJECT_DETAILS_ADD

    constructor(public payload: { projectDetails: projectDetails, ResumeId }) {
    }
}
export class ProjectDetailUpdateAction implements Action {
    readonly type = RESUME_PROJECT_DETAILS_UPDATE

    constructor(public payload: { projectDetails: projectDetails, ResumeId }) {
    }
}
export class ProjectDetailDeleteAction implements Action {
    readonly type = RESUME_PROJECT_DETAILS_DELETE

    constructor(public payload: { projectDetails: projectDetails, ResumeId }) {
    }
}



//weakness


export class WeaknessAddAction implements Action {
    readonly type = RESUME_WEAKNESS_ADD

    constructor(public payload: { weakness: weakness, ResumeId }) {
    }
}
export class WeaknessUpdateAction implements Action {
    readonly type = RESUME_WEAKNESS_UPDATE

    constructor(public payload: { weakness: weakness, ResumeId }) {
    }
}
export class WeaknessDeleteAction implements Action {
    readonly type = RESUME_WEAKNESS_DELETE

    constructor(public payload: { weakness: weakness, ResumeId }) {

    }
}

//REFERENCE
export class ReferenceAddAction implements Action {
    readonly type = RESUME_REFERENCE_ADD

    constructor(public payload: { reference: references, ResumeId }) {

    }
}
export class ReferenceUpdateAction implements Action {
    readonly type = RESUME_REFERENCE_UPDATE

    constructor(public payload: { reference: references, ResumeId }) {

    }
}
export class ReferenceDeleteAction implements Action {
    readonly type = RESUME_REFERENCE_DELETE

    constructor(public payload: { reference: references, ResumeId }) {

    }
}
//Strength

export class StrengthAddAction implements Action {
    readonly type = RESUME_STRENGTH_ADD

    constructor(public payload: { strength: strengths, ResumeId }) {

    }
}
export class StrengthUpdateAction implements Action {
    readonly type = RESUME_STRENGTH_UPDATE

    constructor(public payload: { strength: strengths, ResumeId }) {

    }
}
export class StrengthDeleteAction implements Action {
    readonly type = RESUME_STRENGTH_DELETE

    constructor(public payload: { strength: strengths, ResumeId }) {

    }
}

//EDucation


export class EducationDetailAddAction implements Action {
    readonly type = RESUME_EDUCATION_DETAILS_ADD

    constructor(public payload: { education: education, ResumeId }) {
        console.log(payload.education)
    }
}
export class EducationDetailUpdateAction implements Action {
    readonly type = RESUME_EDUCATION_DETAILS_UPDATE

    constructor(public payload: { education: education, ResumeId }) {
console.log(payload.education)
    }
}
export class EducationDetailDeleteAction implements Action {
    readonly type = RESUME_EDUCATION_DETAILS_DELETE

    constructor(public payload: { education: education, ResumeId }) {

    }
}



//LANGUAGE

export class LanguageAddAction implements Action {
    readonly type = RESUME_LANGUAGE_ADD

    constructor(public payload: { language: languages, ResumeId }) {

    }
}
export class LanguageUpdateAction implements Action {
    readonly type = RESUME_LANGUAGE_UPDATE

    constructor(public payload: { language: languages, ResumeId }) {

    }
}
export class LanguageDeleteAction implements Action {
    readonly type = RESUME_LANGUAGE_DELETE

    constructor(public payload: { language: languages, ResumeId }) {

    }
}


//EmploymentHistory

export class EmploymentHistoryAddAction implements Action {
    readonly type = RESUME_EMPLOYMENT_HISTORY_ADD

    constructor(public payload: { employmentHistory: employmentHistory, ResumeId }) {

    }
}

export class EmploymentHistoryUpdateAction implements Action {
    readonly type = RESUME_EMPLOYMENT_HISTORY_UPDATE

    constructor(public payload: { employmentHistory: employmentHistory, ResumeId }) {

    }
}
export class EmploymentHistoryDeleteAction implements Action {
    readonly type = RESUME_EMPLOYMENT_HISTORY_DELETE

    constructor(public payload: { employmentHistory: employmentHistory, ResumeId }) {

    }
}

//IndustrialExposure

export class IndustrialExposureAddAction implements Action {
    readonly type = RESUME_INDUSTRIAL_EXPOSURE_ADD

    constructor(public payload: { industrialExposure: industrialExposure, ResumeId }) {

    }
}

export class IndustrialExposureUpdateAction implements Action {
    readonly type = RESUME_INDUSTRIAL_EXPOSURE_UPDATE

    constructor(public payload: { industrialExposure: industrialExposure, ResumeId }) {

    }
}
export class IndustrialExposureDeleteAction implements Action {
    readonly type = RESUME_INDUSTRIAL_EXPOSURE_DELETE

    constructor(public payload: { industrialExposure: industrialExposure, ResumeId }) {

    }
}

//Interest

export class InterestAddAction implements Action {
    readonly type = RESUME_INTEREST_ADD

    constructor(public payload: { interest: interests, ResumeId }) {

    }
}

export class InterestUpdateAction implements Action {
    readonly type = RESUME_INTEREST_UPDATE

    constructor(public payload: { interest: interests, ResumeId }) {

    }
}

export class InterestDeleteAction implements Action {
    readonly type = RESUME_INTEREST_DELETE

    constructor(public payload: { interest: interests, ResumeId }) {

    }
}

//Awards And Achivements

export class AwardsAddAction implements Action {
    readonly type = RESUME_AWARD_ACHIVEMENTS_ADD

    constructor(public payload: { AwardsAndAchivements: awardsAchivements, ResumeId }) {

    }
}

export class AwardsUpdateAction implements Action {
    readonly type = RESUME_AWARD_ACHIVEMENTS_UPDATE

    constructor(public payload: { AwardsAndAchivements: awardsAchivements, ResumeId }) {

    }
}

export class AwardsDeleteAction implements Action {
    readonly type = RESUME_AWARD_ACHIVEMENTS_DELETE

    constructor(public payload: { AwardsAndAchivements: awardsAchivements, ResumeId }) {

    }
}

//Objectives


export class ObjectiveAddAction implements Action {
    readonly type = RESUME_OBJECTIVES_ADD

    constructor(public payload: { objectives: objectives, ResumeId }) {

    }
}

export class ObjectiveUpdateAction implements Action {
    readonly type = RESUME_OBJECTIVES_UPDATE

    constructor(public payload: { objectives: objectives, ResumeId }) {

    }
}

export class ObjectiveDeleteAction implements Action {
    readonly type = RESUME_OBJECTIVES_DELETE

    constructor(public payload: { objectives: objectives, ResumeId }) {

    }
}

//Skills


export class SkillAddAction implements Action {
    readonly type = RESUME_SKILL_ADD

    constructor(public payload: { skills: skills, ResumeId }) {

    }
}

export class SkillUpdateAction implements Action {
    readonly type = RESUME_SKILL_UPDATE

    constructor(public payload: { skills: skills, ResumeId }) {

    }
}

export class SkillDeleteAction implements Action {
    readonly type = RESUME_SKILL_DELETE

    constructor(public payload: { skills: skills, ResumeId }) {

    }
}
















