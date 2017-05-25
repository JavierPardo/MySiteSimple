import { MessageModel } from '../../../../models/ui/messageModel';
import helper from '../../../../helpers';
import { ValidationException } from '../../../../models/exceptions';
import { Component, Input } from "@angular/core";
import { ResourceHelper } from "../../../../helpers/resourceHelper";
import { CommonEvent } from "../../../../event";

@Component({
    selector: "system-message",
    templateUrl: "./systemMessage.html"
})
export class SystemMessage {
    public errors: Array<any> = [];
    public messages: Array<any> = [];
    @Input() pattern: string = "*";
    constructor() {
        let eventManager: any = window.ioc.resolve("IEventManager");
        eventManager.subscribe(CommonEvent.ValidationFail, (validation: ValidationException) => { this.onError(validation); });
        eventManager.subscribe(CommonEvent.ShowMessage, (messages: Array<MessageModel>) => { this.onSystemMessage(messages); });
    }
    private onError(validation: ValidationException) {
        let self: SystemMessage = this;
        let resourceHelper: ResourceHelper = window.ioc.resolve("IResource");
        let errors: Array<MessageModel> = [];
        validation.errors.forEach(function (error: MessageModel) {
            if (!helper.regex.isMatch(self.pattern, error.key)) { return; }
            console.log(String.format("pattern {0}, value: {1}", self.pattern, error.key));
            error.msg = String.format(resourceHelper.resolve(error.key), error.params.join(', '));
            errors.push(error);
        });
        this.errors = errors;
        window.setTimeout(function () {
            self.errors = [];
        }, 10000);
    }
    private onSystemMessage(messages: Array<MessageModel>) {
        let self: SystemMessage = this;
        let resourceHelper: ResourceHelper = window.ioc.resolve("IResource");
        let msgs: Array<MessageModel> = [];
        messages.forEach(function (message: MessageModel) {
            if (!helper.regex.isMatch(self.pattern, message.key)) { return; }
            console.log(String.format("pattern {0}, value: {1}", self.pattern, message.key));
            message.msg = String.format(resourceHelper.resolve(message.key), message.params.join(', '));
            msgs.push(message);
        });
        this.messages = msgs;
        window.setTimeout(function () {
            self.messages = [];
        }, 10000);
    }
}
