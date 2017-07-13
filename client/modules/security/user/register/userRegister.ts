import { ValidationException } from '../../../commonCore/models/exceptions';
import { forEach } from '@angular/router/src/utils/collection';
import { UserRegisterModel } from './userRegisterModel';
import { AuthenticatedEvent, CommonEvent } from '../../../commonCore/event';
import helper from '../../../commonCore/helpers';
import { BasePage } from '../../../commonCore/models/ui/basePage';
import { MessageModel } from '../../../commonCore/models/ui/messageModel';
import authService from '../../../commonCore/services/authService';
import userService from '../../_share/services/userService';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: "user-register",
    templateUrl: "userRegister.html",
})
export class UserRegister extends BasePage {
    public model: UserRegisterModel = new UserRegisterModel();
    constructor(router: Router, routedActivated: ActivatedRoute) {

        super(routedActivated,router);
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
            .then(function (responseServer: any) {
                let systemMessages=[];
                if(responseServer.messages)
                responseServer.messages.forEach(function(message){
                    systemMessages[systemMessages.length]=new MessageModel(message, []);
                });
                self.eventManager.publish(CommonEvent.ShowMessage, systemMessages);
                self.router.navigate(['user/login']);
            });
        return false;
    }
}