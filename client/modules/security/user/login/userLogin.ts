import { ValidationException } from '../../../commonCore/models/exceptions';
import authService from '../../../commonCore/services/authService';
import { AuthenticatedEvent, CommonEvent } from '../../../commonCore/event';
import helper from '../../../commonCore/helpers';
import userService from '../../_share/services/userService';
import { BasePage } from '../../../commonCore/models/ui/basePage';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserLoginModel } from "./userLoginModel";

@Component({
    selector: "user-login",
    templateUrl: "userLogin.html", 
})
export class UserLogin extends BasePage {
    public model: UserLoginModel = new UserLoginModel();
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
    public onSignInClicked(event: any) {
        let self: UserLogin = this;
        if (!this.model.isValid()) { return; }
        userService.signin(this.model)
        .then(function (token: any) {
            authService.setAuth(token);
            self.eventManager.publish(AuthenticatedEvent.AuthenticationChanged, true);
            self.router.navigate([helper.config.getAppConfig().defaultUrl]);            
            self.eventManager.publish(CommonEvent.ShowMessage, ['Welcome to the system']);
            
        }).error(function(errors){
            let exceptions = new ValidationException();
            errors.forEach(error => {
                exceptions.add(error);
            });
            self.eventManager.publish(CommonEvent.ValidationFail, exceptions);

                errors.forEach(element => { alert(element); });
        });
        return false;
    }
}