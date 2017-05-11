
import { BaseLayout } from "./baseLayout";
import { ApplicationStateEvent } from "../../event";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
export class BaseApplication extends BaseLayout {
    constructor(http: Http, routeActivated: ActivatedRoute) {
        super(http, routeActivated);
        // let router: Router = injector.get(RootRouter);
        // console.log("Router in application:", router);
    }
    protected onInit() {
        super.onInit();
        this.eventManager.publish(ApplicationStateEvent.Init);
    }
    protected onBeforeReady() {
        super.onBeforeReady();
        this.eventManager.publish(ApplicationStateEvent.BeforeReady);
    }
    protected onReady() {
        super.onReady();
        this.eventManager.publish(ApplicationStateEvent.Ready);
    }
    protected onUnload() {
        super.onUnload();
        this.eventManager.publish(ApplicationStateEvent.Unload);
    }
}