import { Router } from '@angular/router';

import { AfterViewInit, Component, Input } from "@angular/core";
import helper from '../../../../helpers'

@Component({
    selector: "menu-topbar",
    templateUrl: "./menuTopbar.html",
})
export class MenuTopbar implements AfterViewInit {
    
    private router: Router;

    constructor( router: Router) {        
        this.router = router;
    }
    ngAfterViewInit() {
        this.initializedSidebar();
    }
    /* tslint:disable */
    private initializedSidebar(): any {
       
    }
    /* tslint:enable */
}