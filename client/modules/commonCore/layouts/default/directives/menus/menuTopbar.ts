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
    
    private router: Router;

    constructor( router: Router, http: Http) {
        super(http, ComponentType.Control,null)      
        this.router = router;
        
    let resourceHelper: ResourceHelper = window.ioc.resolve("IResource");
    }
    ngAfterViewInit() {
        this.initializedSidebar();
    }
    /* tslint:disable */
    private initializedSidebar(): any {
       
    }
    /* tslint:enable */
}