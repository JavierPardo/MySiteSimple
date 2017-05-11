import { BaseApplication } from '../../models/ui/baseApplication';
import { BaseLayout } from '../../models/ui/baseLayout';


import { Component, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";



@Component({
    selector: "default-unauthenticated-layout",
    templateUrl: "./unauthenticatedLayout.html",
})
export class DefaultUnauthenticatedLayout extends BaseApplication {
    @Input() isAuthenticated: boolean;
    private router: Router;
    constructor(http: Http, router: Router, routeActivated: ActivatedRoute) {
        super(http, routeActivated);
        this.router = router;
    }
    protected onReady() {
        super.onReady();
        // this.router.navigate(["Login"]);
    }
}
