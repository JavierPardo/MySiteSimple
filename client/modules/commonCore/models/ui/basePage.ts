import { ComponentType } from './componentType';
import { BaseComponent } from "./baseComponent";
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";

@Component({
    template:''
})
export class BasePage extends BaseComponent {
    public model: any;
    constructor(routeActivated: ActivatedRoute) {
        //console.log("startin basepage");
        super(null, ComponentType.Page, routeActivated);
    }
}