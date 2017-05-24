import { MessageModel } from '../ui/messageModel';

import {CommonEvent} from "../../event";
export class ValidationException {
    constructor(key: string = "", params: any = {}) {
        if (key !== "") {
            this.add(key, params);
        }
    }
    public errors: Array<MessageModel> = [];
    public add(key: string, params: any = {}): any {
        this.errors.push(new MessageModel(key, params));
    }
    public hasError(): boolean {
        return this.errors.length > 0;
    }
    public throwIfHasError(): void {
        window.ioc.resolve("IEventManager").publish(CommonEvent.ValidationFail, this);
    }
}