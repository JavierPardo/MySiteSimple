import { EditExcercise } from './excercise/editExcercise/editExcercise';
import { ViewExcercise } from './excercise/viewExcercise/viewExcercise';
/// <reference path="../extension.d.ts" />
import { MyExcercise } from './excercise/myExcercise/myExcercise';
import route from './_share/config/route';
import { AuthenticationMode } from '../commonCore/enum';
import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import module from './_share/config/module';
import { CommonCoreModule } from "modules/commonCore/commonCore.module";

@NgModule({
  declarations: [
    MyExcercise,
    EditExcercise,
    ViewExcercise
  ],
  imports: [
    CommonCoreModule,
    RouterModule.forRoot([
      { path: route.exercise.MyExcercises.path, component: MyExcercise, data: { authentication: AuthenticationMode.Require }  },
      { path: route.exercise.AddExcercise.path, component: EditExcercise, data: { authentication: AuthenticationMode.Require }  },
      { path: route.exercise.DeleteExcercise.path, component: MyExcercise, data: { authentication: AuthenticationMode.Require }  },
      { path: route.exercise.EditExcercise.path, component: EditExcercise, data: { authentication: AuthenticationMode.Require }  },
      { path: route.exercise.ShowExcercise.path, component: ViewExcercise, data: { authentication: AuthenticationMode.Require }  },
      ])
  ],
  providers: [
  ],
  exports:[
    RouterModule,
    MyExcercise,
    EditExcercise,
    ViewExcercise
  ],
    schemas:[NO_ERRORS_SCHEMA],
})
export class WorkInModule { }
