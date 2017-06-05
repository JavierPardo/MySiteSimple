import { ValidationException } from '../../../commonCore/models/exceptions';
import { forEach } from '@angular/router/src/utils/collection';
import { UserRegisterModel } from './userRegisterModel';
import authService from '../../../commonCore/services/authService';
import { AuthenticatedEvent, CommonEvent } from '../../../commonCore/event';
import helper from '../../../commonCore/helpers';
import userService from '../../_share/services/userService';
import { BasePage } from '../../../commonCore/models/ui/basePage';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: "user-register",
    templateUrl: "userRegister.html",
})
export class UserRegister extends BasePage {
    public model: UserRegisterModel = new UserRegisterModel();
    private router: Router;
    constructor(router: Router, routedActivated: ActivatedRoute) {

        super(routedActivated);
        this.router = router;
        authService.removeAuth();
        // this.setResources(["signin"]);
        // this.i18n.load(['signin']);
    }
    public onForgotPasswordClicked(event: any) {
        // this.router.navigate(["Forgot Password"]);
        // console.log(this.i18n.resolve('signin.yourEmail'));
    }
    public onRegisterClicked(event: any) {
        let self: UserRegister = this;
        if (!this.model.isValid()) { return; }
        userService.postUser(this.model)
        .error(function (errors: any) {
            let exceptions = new ValidationException();
            errors.forEach(error => {
                exceptions.add(error);
            });
            self.eventManager.publish(CommonEvent.ValidationFail, exceptions);
        })
            .then(function (responseServer: any) {
            });
        return false;
    }
}