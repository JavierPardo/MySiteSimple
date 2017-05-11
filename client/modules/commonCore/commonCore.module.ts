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


@NgModule({
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        DefaultLayout,
        DefaultUnauthenticatedLayout,
        MenuSidebar,
        MenuItem,
        BasePage,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        HttpModule,
        RouterModule.forRoot([])
    ],
    exports: [
        DefaultLayout,
        DefaultUnauthenticatedLayout,
        MenuSidebar,
        MenuItem,
        BasePage,
    ],
    providers: [],
    bootstrap: []
})
export class CommonCoreModule { }
