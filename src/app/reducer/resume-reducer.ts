import { createSelector } from "@ngrx/store";
import { Action } from "../action";
import { RESUME_ADD_SUCCESS, RESUME_AWARD_ACHIVEMENTS_ADD,
     RESUME_AWARD_ACHIVEMENTS_DELETE, RESUME_AWARD_ACHIVEMENTS_UPDATE,
      RESUME_CONTACT_DETAILS_ADD, RESUME_CONTACT_DETAILS_UPDATE, RESUME_DELETE, 
      RESUME_EDUCATION_DETAILS_ADD, RESUME_EDUCATION_DETAILS_DELETE, 
      RESUME_EDUCATION_DETAILS_UPDATE, RESUME_EMPLOYMENT_HISTORY_ADD,
       RESUME_EMPLOYMENT_HISTORY_DELETE, RESUME_EMPLOYMENT_HISTORY_UPDATE, 
       RESUME_ERROR, RESUME_INDUSTRIAL_EXPOSURE_ADD, RESUME_INDUSTRIAL_EXPOSURE_DELETE,
        RESUME_INDUSTRIAL_EXPOSURE_UPDATE, RESUME_INTEREST_ADD, RESUME_INTEREST_DELETE, 
        RESUME_INTEREST_UPDATE, RESUME_LANGUAGE_ADD, RESUME_LANGUAGE_DELETE, RESUME_LANGUAGE_UPDATE,
         RESUME_LIST_REQUEST, RESUME_LIST_SUCCESS, RESUME_OBJECTIVES_ADD, 
         RESUME_OBJECTIVES_DELETE, RESUME_OBJECTIVES_UPDATE, 
         RESUME_PROJECT_DETAILS_ADD, RESUME_PROJECT_DETAILS_DELETE, 
         RESUME_PROJECT_DETAILS_UPDATE, RESUME_REFERENCE_ADD, RESUME_REFERENCE_DELETE,
          RESUME_REFERENCE_UPDATE, RESUME_SKILL_ADD, RESUME_SKILL_DELETE,
           RESUME_SKILL_UPDATE, RESUME_STRENGTH_ADD, RESUME_STRENGTH_DELETE, 
           RESUME_STRENGTH_UPDATE, RESUME_UPDATE, RESUME_WEAKNESS_ADD, 
           RESUME_WEAKNESS_DELETE, RESUME_WEAKNESS_UPDATE } from "../action/resume-action";
import { Resume } from "../models/resume";
import { StoreUtility } from "../utils/store-utility";

export interface ResumeReducerState {

    loaded: boolean;
    loading: boolean;
    error: boolean;
    entities: { [_id: string]: Resume };
    ids: string[];
}

export const InitialState: ResumeReducerState = {
    loaded: false,
    loading: false,
    error: false,
    entities: {},
    ids: []

}

export function ResumeReducer(state = InitialState, action: Action): ResumeReducerState {

    switch (action.type) {
        case RESUME_LIST_REQUEST: {
            return { ...state, loading: true }
        }

        case RESUME_LIST_SUCCESS: {
            // [{ } , { }]
            const resume = action.payload;
            const NormalizeEntity = StoreUtility.normalize(resume)
            const newEntities = { ...state.entities, ...NormalizeEntity }
            const IDs = resume.map(res => {
                return res._id
            })
            const FilterDublicateIDs = StoreUtility.filterDuplicateIds([...state.ids, IDs])

            return {
                ...state, loading: false, loaded: true,
                error: false, entities: newEntities, ids: FilterDublicateIDs
            }
        }
        case RESUME_ADD_SUCCESS: {
            const resume = action.payload;
            const obj = { [resume._id]: resume };
            const newIds = [...state.ids, resume._id];
            const entities = { ...state.entities, ...obj };
            return { ...state, ...{ entities, ids: newIds } };
        }




        case RESUME_ERROR: {
            return { ...InitialState }
        }

        case RESUME_UPDATE: {

            const resume = action.payload;
            const obj = { [resume._id]: resume }

            const NewEntities = { ...state.entities, ...obj }
            return { ...state, entities: NewEntities }
        }

        case RESUME_DELETE: {
            const id = action.payload;
            const newIds = state.ids.filter(elem => {
                return elem !== id
            })

            const RemoveIdEntity = StoreUtility.removeKey(state.entities, id)
            return { ...state, entities: RemoveIdEntity, ids: newIds }

        }



        case RESUME_CONTACT_DETAILS_ADD:
        case RESUME_CONTACT_DETAILS_UPDATE: {

            const ContactDetails = action.payload.contactDetails
            console.log(ContactDetails)
            const resumeId = action.payload.ResumeId
            const CurrentResumeDetails = JSON.parse(JSON.stringify(state.entities[resumeId]))
            CurrentResumeDetails.contact_details = ContactDetails
            const obj = { [resumeId]: CurrentResumeDetails }
            const NewEntities = { ...state.entities, ...obj }
            return { ...state, entities: NewEntities }
        }

        case RESUME_SKILL_ADD:
            {

                const Skill = action.payload.skills;
                const ResumeId = action.payload.ResumeId;
                const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
                currentResume.skills.push(Skill)
                const obj = { [ResumeId]: currentResume }
                const newEntity = { ...state.entities, ...obj }
                return { ...state, ...{ entities: newEntity } }
            }


        case RESUME_SKILL_UPDATE: {

            const Skill = action.payload.skills;
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.skills = currentResume.skills.filter(data => {
                return data._id !== Skill._id
            })
            currentResume.skills.push(Skill)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }
        }

        case RESUME_SKILL_DELETE: {

            const Skill = action.payload.skills;
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.skills = currentResume.skills.filter(data => {
                return data._id !== Skill._id
            })
            const obj = { [ResumeId]: currentResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };

        }

        case RESUME_EDUCATION_DETAILS_ADD: {

            const Education = action.payload.education
            console.log(Education)
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.education.push(Education)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }
        }

        case RESUME_EDUCATION_DETAILS_UPDATE: {
            const education = action.payload.education;
            console.log(education)
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.education = oldResume.education.filter((data) => data._id !== education._id);
            oldResume.education.push(education);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }

        case RESUME_EDUCATION_DETAILS_DELETE: {
            const education = action.payload.education;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.education = oldResume.education.filter((data) => data._id !== education._id);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }

        case RESUME_AWARD_ACHIVEMENTS_ADD :{
            const AwardsAndAchivements = action.payload.AwardsAndAchivements
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.award_achivements.push(AwardsAndAchivements)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }
        }
        case RESUME_AWARD_ACHIVEMENTS_UPDATE :{
            const AwardsAndAchivements = action.payload.AwardsAndAchivements;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.award_achivements = oldResume.award_achivements.filter((data) => data._id !== AwardsAndAchivements._id);
            oldResume.award_achivements.push(AwardsAndAchivements);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }
        case RESUME_AWARD_ACHIVEMENTS_DELETE :{
            const AwardsAndAchivements = action.payload.AwardsAndAchivements;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.award_achivements = oldResume.award_achivements.filter((data) => data._id !== AwardsAndAchivements._id);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }

        case RESUME_EMPLOYMENT_HISTORY_ADD: {

            const employmentHistory = action.payload.employmentHistory
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.employment_history.push(employmentHistory)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }
        }
        case RESUME_EMPLOYMENT_HISTORY_UPDATE: {

            const employmentHistory = action.payload.employmentHistory;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.employment_history = oldResume.employment_history.filter((data) => data._id !== employmentHistory._id);
            oldResume.employment_history.push(employmentHistory);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }
        case RESUME_EMPLOYMENT_HISTORY_DELETE: {

            const employmentHistory = action.payload.employmentHistory;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.employment_history = oldResume.employment_history.filter((data) => data._id !== employmentHistory._id);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }

        case RESUME_INTEREST_ADD: {
            const interest = action.payload.interest
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.interests.push(interest)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }

        }

        case RESUME_INTEREST_UPDATE: {

            const interest = action.payload.interest;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.interests = oldResume.interests.filter((data) => data._id !== interest._id);
            oldResume.interests.push(interest);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };


        }

        case RESUME_INTEREST_DELETE: {

            const interest = action.payload.interest;
            console.log(interest)
            const resumeId = action.payload.ResumeId;
            console.log(resumeId)
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.interests = oldResume.interests.filter((data) => data._id !== interest._id);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }

        case RESUME_OBJECTIVES_ADD: {
            const objectives = action.payload.objectives
            console.log(objectives)
            const ResumeId = action.payload.ResumeId;
            console.log(ResumeId)
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            console.log(currentResume)
            currentResume.objectives.push(objectives)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }

        }
        case RESUME_OBJECTIVES_UPDATE: {
            const objectives = action.payload.objectives;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.objectives = oldResume.objectives.filter((data) => data._id !== objectives._id);
            oldResume.objectives.push(objectives);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };


        }
        case RESUME_OBJECTIVES_DELETE: {

            const objectives = action.payload.objectives;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.objectives = oldResume.objectives.filter((data) => data._id !== objectives._id);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }

        case RESUME_LANGUAGE_ADD: {
            const language = action.payload.language
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.languages.push(language)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }
        }
        case RESUME_LANGUAGE_UPDATE: {
            const language = action.payload.language;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.languages = oldResume.languages.filter((data) => data._id !== language._id);
            oldResume.languages.push(language);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }
        case RESUME_LANGUAGE_DELETE: {
            const language = action.payload.language;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.languages = oldResume.languages.filter((data) => data._id !== language._id);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };

        }

        case RESUME_INDUSTRIAL_EXPOSURE_ADD: {
            const industrialExposure = action.payload.industrialExposure
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.industrialExposures.push(industrialExposure)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }

        }
        case RESUME_INDUSTRIAL_EXPOSURE_UPDATE: {
            const industrialExposure = action.payload.industrialExposure;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.industrialExposures = oldResume.industrialExposures.filter((data) => data._id !== industrialExposure._id);
            oldResume.industrialExposures.push(industrialExposure);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }
        case RESUME_INDUSTRIAL_EXPOSURE_DELETE: {
            const industrialExposure = action.payload.industrialExposure;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.industrialExposures = oldResume.industrialExposures.filter((data) => data._id !== industrialExposure._id);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }

        case RESUME_PROJECT_DETAILS_ADD: {
            const projectDetails = action.payload.projectDetails
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.projectDetails.push(projectDetails)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }

        }
        case RESUME_PROJECT_DETAILS_UPDATE: {
            const projectDetails = action.payload.projectDetails;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.projectDetails = oldResume.projectDetails.filter((data) => data._id !== projectDetails._id);
            oldResume.projectDetails.push(projectDetails);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }
        case RESUME_PROJECT_DETAILS_DELETE: {
            const projectDetails = action.payload.projectDetails;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.projectDetails = oldResume.projectDetails.filter((data) => data._id !== projectDetails._id);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }

        case RESUME_REFERENCE_ADD: {
            const reference = action.payload.reference
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.refrences.push(reference)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }
        }
        case RESUME_REFERENCE_UPDATE: {
            const reference = action.payload.reference;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.refrences = oldResume.refrences.filter((data) => data._id !== reference._id);
            oldResume.refrences.push(reference);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }
        case RESUME_REFERENCE_DELETE: {
            const reference = action.payload.reference;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.refrences = oldResume.refrences.filter((data) => data._id !== reference._id);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }

        case RESUME_STRENGTH_ADD: {
            const strength = action.payload.strength
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.strengths.push(strength)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }
        }
        case RESUME_STRENGTH_UPDATE: {
            const strength = action.payload.strength;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.strengths = oldResume.strengths.filter((data) => data._id !== strength._id);
            oldResume.strengths.push(strength);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }
        case RESUME_STRENGTH_DELETE: {
            const strength = action.payload.strength;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.strengths = oldResume.strengths.filter((data) => data._id !== strength._id);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }

        case RESUME_WEAKNESS_ADD: {
            const weakness = action.payload.weakness
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.weakness.push(weakness)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }
        }
        case RESUME_WEAKNESS_UPDATE: {
            const weakness = action.payload.weakness;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.weakness = oldResume.weakness.filter((data) => data._id !== weakness._id);
            oldResume.weakness.push(weakness);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } }
        }
        case RESUME_WEAKNESS_DELETE: {
            const weakness = action.payload.weakness;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.weakness = oldResume.weakness.filter((data) => data._id !== weakness._id);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }

        case RESUME_INDUSTRIAL_EXPOSURE_ADD: {
            const industrialExposure = action.payload.industrialExposure
            const ResumeId = action.payload.ResumeId;
            const currentResume = JSON.parse(JSON.stringify(state.entities[ResumeId]))
            currentResume.industrialExposures.push(industrialExposure)
            const obj = { [ResumeId]: currentResume }
            const newEntity = { ...state.entities, ...obj }
            return { ...state, ...{ entities: newEntity } }
        }
        case RESUME_INDUSTRIAL_EXPOSURE_UPDATE: {
            const industrialExposure = action.payload.industrialExposure;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.industrialExposures = oldResume.industrialExposures.filter((data) => data._id !== industrialExposure._id);
            oldResume.industrialExposures.push(industrialExposure);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } }
        }
        case RESUME_INDUSTRIAL_EXPOSURE_DELETE: {
            const industrialExposure = action.payload.industrialExposure;
            const resumeId = action.payload.ResumeId;
            const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
            oldResume.industrialExposures = oldResume.industrialExposures.filter((data) => data._id !== industrialExposure._id);
            const obj = { [resumeId]: oldResume };
            const newEntities = { ...state.entities, ...obj };
            return { ...state, ...{ entities: newEntities } };
        }
        default: {
            return state
        }

    }

}



export const getLoaded = (state: ResumeReducerState) => {

    return state.loaded
}
export const getLoading = (state: ResumeReducerState) => {

    return state.loading
}
export const getError = (state: ResumeReducerState) => {

    return state.error
}
export const getEntity = (state: ResumeReducerState) => {

    return state.entities;
}
export const getIds = (state: ResumeReducerState) => {

    return state.ids
}

export const getResumeList = createSelector(getEntity, (entities) => {
    console.log(StoreUtility.unNormalized(entities), getResumeList)
    return StoreUtility.unNormalized(entities)
})










// case RESUME_ADD_EDUCATION: {
//     +      const education = action.payload.education;
//     +      const resumeId = action.payload.resume_id;
//     +      const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
//     +      oldResume.education.push(education);
//     +      const obj = {[resumeId]: oldResume};
//     +      const newEntities = {...state.entities, ...obj};
//     +      return {...state, ...{entities: newEntities}};
//     +    }
//     +    case RESUME_DELETE_EDUCATION: {
//     +      const education = action.payload.education;
//     +      const resumeId = action.payload.resume_id;
//     +      const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
//     +      oldResume.education = oldResume.education.filter((data) => data._id !== education._id);
//     +      const obj = {[resumeId]: oldResume};
//     +      const newEntities = {...state.entities, ...obj};
//     +      return {...state, ...{entities: newEntities}};
//     +    }
//     +    case RESUME_UPDATE_EDUCATION: {
//     +      const education = action.payload.education;
//     +      const resumeId = action.payload.resume_id;
//     +      const oldResume = JSON.parse(JSON.stringify(state.entities[resumeId]));
//     +      oldResume.education = oldResume.education.filter((data) => data._id !== education._id);
//     +      oldResume.education.push(education);
//     +      const obj = {[resumeId]: oldResume};
//     +      const newEntities = {...state.entities, ...obj};
//     +      return {...state, ...{entities: newEntities}};
//     +    }