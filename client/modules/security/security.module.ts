import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserLogin } from './user/login/userLogin';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthenticationMode } from '../commonCore/enum';
import { CommonCoreModule } from "../commonCore/commonCore.module";
import route from './_share/config/route';

@NgModule({
  declarations: [
      UserLogin
  ],
  imports: [
    CommonCoreModule,
    RouterModule.forRoot([
      { path: route.authentication.login.path,  component: UserLogin, data: { authentication: AuthenticationMode.None }  },
    ])
  ],
  providers: [
  ],
  exports:[
    RouterModule
  ]
})
export class SecurityModule { }
