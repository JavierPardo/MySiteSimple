import { AuthenticationMode } from '../../enum';
import helper from '../../helpers';
import authService from '../../services/authService';
import { AuthenticatedEvent } from '../../event';
import { IApplicationState } from '../../models/app/iapplicationState';
import { BaseApplication } from '../../models/ui/baseApplication';

import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { ActivatedRoute, Router } from "@angular/router";

declare var $: any;
@Component({
    selector: "default-layout",
    templateUrl: "./defaultLayout.html",
})
export class DefaultLayout extends BaseApplication {
    private router: Router;
    public isAuthenticated: boolean = false;

    constructor(http: Http, routeActivated: ActivatedRoute, router: Router) {
        super(http, routeActivated);
        this.router = router;
        this.onInitialized();
    }
    getStyle(){
        if(this.isAuthenticated)
        return '';
        else
        return '0px';
    }

    private onInitialized() {
        let self: any = this;
        let appState: IApplicationState = window.ioc.resolve("IApplicationState");
        if (!!appState) {
            appState.registerEvents();
        }
        this.registerEvent(AuthenticatedEvent.AuthenticationChanged, function (authenticated: boolean) {
            
            if (!authenticated) {
                self.router.navigate([helper.config.getAppConfig().loginUrl]);
            }
            else
                self.router.navigate([helper.config.getAppConfig().defaultUrl]);
                self.isAuthenticated = authenticated;
        });
        let profile: any = authService.getUserProfile();
        if (authService.isAuthenticated(profile)) {
            this.isAuthenticated = true;
        }
    }
}