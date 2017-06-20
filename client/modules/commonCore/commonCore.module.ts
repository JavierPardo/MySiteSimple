import { SimpleMenuItem } from './layouts/default/directives/menus/simpleMenuItem';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigurationService } from './services/configurationService';
import { ValidationDirective } from './directives/validation';
import helper from './helpers';
import { DefaultLayout } from './layouts/default/defaultLayout';
import { LoadingIndicator } from './layouts/default/directives/common/loadingIndicator';
import { ModalPopUp } from './layouts/default/directives/common/modalPopUp';
import { SystemMessage } from './layouts/default/directives/common/systemMessage';
import { MenuItem } from './layouts/default/directives/menus/menuItem';
import { MenuSidebar } from './layouts/default/directives/menus/menuSidebar';
import { BasePage } from './models/ui/basePage';
import { MenuTopbar } from './layouts/default/directives/menus/menuTopbar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { ImageContainerComponent } from "modules/commonCore/layouts/default/directives/ui/form/imageContainer";
import { CarouselImages } from "modules/commonCore/layouts/default/directives/common/carouselImages";

export function initialConfigLoad() {
  var config = new ConfigurationService();
  return () => config.load();
};

@NgModule({
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        DefaultLayout,
        ImageContainerComponent,
        MenuSidebar,
        MenuTopbar,
        SimpleMenuItem,
        MenuItem,
        BasePage,
        LoadingIndicator,
        SystemMessage,
        ValidationDirective,
        ModalPopUp,
        CarouselImages
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
        MenuSidebar,
        MenuItem,
        SystemMessage,
        BasePage,
        LoadingIndicator,
        ValidationDirective,
        ModalPopUp,
        CarouselImages
    ],
    providers: [{
      provide: APP_INITIALIZER,
      useFactory: initialConfigLoad,
      multi: true
    }],
    bootstrap: []
})
export class CommonCoreModule { }