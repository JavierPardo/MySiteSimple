import { SimpleMenuItem } from './layouts/default/directives/menus/simpleMenuItem';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigurationService } from './services/configurationService';
import { SystemMessage } from './layouts/default/directives/common/systemMessage';
import { LoadingIndicator } from './layouts/default/directives/common/loadingIndicator';
import { DefaultAuthenticatedLayout } from './layouts/default/authenticatedLayout';
import helper from './helpers';
import { ValidationDirective } from './directives/validation';
import { MenuTopbar } from './layouts/default/directives/menus/menuTopbar';
import { BasePage } from './models/ui/basePage';
import { MenuItem } from './layouts/default/directives/menus/menuItem';
import { MenuSidebar } from './layouts/default/directives/menus/menuSidebar';
import { DefaultUnauthenticatedLayout } from './layouts/default/unauthenticatedLayout';
import { DefaultLayout } from './layouts/default/defaultLayout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { ImageContainerComponent } from "modules/commonCore/layouts/default/directives/ui/form/imageContainer";

export function initialConfigLoad() {
  var config = new ConfigurationService();
  return () => config.load();
};

@NgModule({
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        DefaultLayout,
        ImageContainerComponent,
        DefaultUnauthenticatedLayout,
        DefaultAuthenticatedLayout,
        MenuSidebar,
        MenuTopbar,
        SimpleMenuItem,
        MenuItem,
        BasePage,
        LoadingIndicator,
        SystemMessage,
        ValidationDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        HttpModule,
        RouterModule.forRoot([])
    ],
    exports: [ 
        ImageContainerComponent,       
        BrowserModule,
        FormsModule,
        CommonModule,
        HttpModule,
        SimpleMenuItem,
        DefaultLayout,
        DefaultUnauthenticatedLayout,
        DefaultAuthenticatedLayout,
        MenuSidebar,
        MenuItem,
        SystemMessage,
        BasePage,
        LoadingIndicator,
        ValidationDirective
    ],
    providers: [{
      provide: APP_INITIALIZER,
      useFactory: initialConfigLoad,
      multi: true
    }],
    bootstrap: []
})
export class CommonCoreModule { }