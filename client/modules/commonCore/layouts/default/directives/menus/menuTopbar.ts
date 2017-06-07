import authService from '../../../../services/authService';
import { ResourceHelper } from '../../../../helpers/resourceHelper';
import { Http } from '@angular/http';
import { ComponentType } from '../../../../models/ui/componentType';
import { BaseComponent } from '../../../../models/ui/baseComponent';
import { Router } from '@angular/router';

import { AfterViewInit, Component, Input } from "@angular/core";
import helper from '../../../../helpers'

@Component({
    selector: "menu-topbar",
    templateUrl: "./menuTopbar.html",
})
export class MenuTopbar extends BaseComponent implements AfterViewInit {

    @Input() showCollapseButton: boolean = true;

    private router: Router;
    public isAuthenticated: boolean;

    constructor(router: Router, http: Http) {
        super(http, ComponentType.Control, null)
        this.router = router;
        this.menuItems = helper.config.getModuleMenuItems(true);
        this.isAuthenticated = authService.isAuthenticated(authService.getUserProfile());
    }

    ngAfterViewInit(){
        super.ngAfterViewInit();
        
    }
    public menuItems: any = [];
    public title: string = "";
}