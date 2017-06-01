/// <reference path="../extension.d.ts" />
import { MyExcercise } from './excercise/myExcercise/myExcercise';
import route from './_share/config/route';
import { AuthenticationMode } from '../commonCore/enum';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import module from './_share/config/module';
import { CommonCoreModule } from "modules/commonCore/commonCore.module";

@NgModule({
  declarations: [
    MyExcercise
  ],
  imports: [
    CommonCoreModule,
    RouterModule.forRoot([
      { path: route.exercise.MyExcercises.path, component: MyExcercise, data: { authentication: AuthenticationMode.None }  },
      { path: route.exercise.AddExcercise.path, component: MyExcercise, data: { authentication: AuthenticationMode.None }  },
      { path: route.exercise.DeleteExcercise.path, component: MyExcercise, data: { authentication: AuthenticationMode.None }  },
      { path: route.exercise.EditExcercise.path, component: MyExcercise, data: { authentication: AuthenticationMode.None }  },
      { path: route.exercise.ShowExcercise.path, component: MyExcercise, data: { authentication: AuthenticationMode.None }  },
      ])
  ],
  providers: [
  ],
  exports:[
    RouterModule,
    MyExcercise
  ]
})
export class WorkInModule { }
