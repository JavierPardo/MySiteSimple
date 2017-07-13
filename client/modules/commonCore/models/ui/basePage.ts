import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RountingEvent } from '../../event';
import { ComponentType } from './componentType';
import { BaseComponent } from "./baseComponent";

@Component({
    template: ''
})
export class BasePage extends BaseComponent {
    public model: any;
    public router: Router;
    constructor(routeActivated: ActivatedRoute, router: Router) {

        super(null, ComponentType.Page, routeActivated);
        if (router != null) {
            this.router = router;
            let self: BasePage = this;
            this.eventManager.subscribe(RountingEvent.RedirectPage, (url) => {
                self.router.navigate([url])
            })
        }
    }
}