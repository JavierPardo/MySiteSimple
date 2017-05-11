import { ComponentType } from './componentType';
import { BaseComponent } from "./baseComponent";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
export class BaseLayout extends BaseComponent {
    constructor(http: Http, routeActivated: ActivatedRoute) {
        super(http, ComponentType.Layout,  routeActivated);
    }
}