import { MessageModel } from '../../../commonCore/models/ui/messageModel';
import { ValidationException } from '../../../commonCore/models/exceptions';
import authService from '../../../commonCore/services/authService';
import { AuthenticatedEvent, CommonEvent, LoadingIndicatorEvent } from '../../../commonCore/event';
import helper from '../../../commonCore/helpers';
import userService from '../../_share/services/userService';
import { BasePage } from '../../../commonCore/models/ui/basePage';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';

@Component({
    selector: "user-logout",
    template: "",
})
export class UserLogout extends BasePage implements AfterViewInit {
    public router: Router;
    constructor(router: Router, routedActivated: ActivatedRoute) {

        super(routedActivated,router);
        let self = this;
        self.router = router;
        self.eventManager.publish(LoadingIndicatorEvent.Show);

    }
    ngAfterViewInit() {
        let self = this;
        self.eventManager.publish(AuthenticatedEvent.AuthenticationChanged, false);
        self.eventManager.publish(LoadingIndicatorEvent.Hide);
    }
}