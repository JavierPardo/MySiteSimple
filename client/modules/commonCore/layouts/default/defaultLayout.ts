import { BaseApplication } from '../../models/ui/baseApplication';

import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "default-layout",
    templateUrl: "./defaultLayout.html",
})
export class DefaultLayout extends BaseApplication {
    
    constructor(http: Http, routeActivated: ActivatedRoute) {
        super(http, routeActivated);
        // let router: Router = injector.get(RootRouter);
        // console.log("Router in application:", router);
    }
}