import { TechnicalSkills } from './skill/technicalSkills';
import { Lenguages } from './skill/lenguages';
import { Experience } from './experience/experience';
import { Certifications } from './education/certifications';
import { College } from './education/college';
import { Career } from './education/career';
import { Objectives } from './personalInformation/objectives';
import route from './_share/config/route';
import { AuthenticationMode } from '../commonCore/enum';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import module from './_share/config/module';
import { CommonCoreModule } from "modules/commonCore/commonCore.module";
import { GeneralInformation } from "modules/resume/personalInformation/generalInformation";

@NgModule({
  declarations: [
    GeneralInformation,
    Objectives,
    Career,
    Certifications,
    College,
    Experience,
    Lenguages,
    TechnicalSkills
  ],
  imports: [
    CommonCoreModule,
    RouterModule.forRoot([
      { path: 'resume', redirectTo: route.personalInformation.generalInformation.path, pathMatch:'full' },
      { path: route.personalInformation.generalInformation.path,  component: GeneralInformation, data: { authentication: AuthenticationMode.None }  },
      { path: route.personalInformation.objectives.path,  component: Objectives, data: { authentication: AuthenticationMode.None }  },
      { path: route.education.career.path,  component: Career, data: { authentication: AuthenticationMode.None }  },
      { path: route.education.certifications.path,  component: Certifications, data: { authentication: AuthenticationMode.None }  },
      { path: route.education.college.path,  component: College, data: { authentication: AuthenticationMode.None }  },
      { path: route.experience.experience.path,  component: Experience, data: { authentication: AuthenticationMode.None }  },
      { path: route.skills.lenguages.path,  component: Lenguages, data: { authentication: AuthenticationMode.None }  },
      { path: route.skills.technicalSkills.path,  component: TechnicalSkills, data: { authentication: AuthenticationMode.None }  },
    ])
  ],
  providers: [
  ],
  exports:[
    RouterModule,    
    GeneralInformation,
    Objectives,
    Career,
    Certifications,
    College,
    Experience,
    Lenguages,
    TechnicalSkills
  ]
})
export class ResumeModule { }
