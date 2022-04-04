
import { contactDetails } from './contact-details'
import { education } from './education'
import { employmentHistory } from './employment-history'
import { skills } from './skills'
import { strengths } from './strengths'
import { weakness } from './weakness'
import { languages } from './languages'
import { interests } from './interests'
import { projectDetails } from './project-Details'
import { objectives } from './objectives'
import { industrialExposure } from './industrial-Exposures'
import { awardsAchivements } from './award_achivements'
import { references } from './refrences'



export interface Resume {
    _id: string
    user_id: string
    name: string
    image_url: string
    video_url: string
    views: Number
    contact_details: contactDetails
    education: education[]
    skills: skills[]
    strengths: strengths[]
    weakness: weakness[]
    languages: languages[]
    interests: interests[]
    projectDetails: projectDetails[]
    objectives: objectives[]
    industrialExposures: industrialExposure[]
    award_achivements: awardsAchivements[]
    employment_history: employmentHistory[]
    refrences: references[]
}

   



    // refrences: [{type: mongoose.Schema.Types.ObjectId, ref: 'refrences'}],
