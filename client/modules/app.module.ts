/// <reference path="extension.d.ts" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { CommonCoreModule } from './commonCore/commonCore.module';
import { DefaultLayout } from './commonCore/layouts/default/defaultLayout';
import { ResumeModule } from "./resume/resume.module";
import { SecurityModule } from "modules/security/security.module";

// export function initialConfigLoad() {
//   var config = new ConfigurationService();
//   return () => config.load();
// };

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot([
      {path:'', redirectTo:'resume', pathMatch:'full'}
    ]),
    CommonCoreModule,
    ResumeModule,
    SecurityModule
  ],
  providers: [
    ],
  bootstrap: [DefaultLayout]
})
export class AppModule { }
