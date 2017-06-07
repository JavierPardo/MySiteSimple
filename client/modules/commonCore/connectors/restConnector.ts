import { MessageModel } from '../models/ui/messageModel';
import { SystemMessage } from '../layouts/default/directives/common/systemMessage';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
// import {Observable} from "rxjs/Observable";

import { ValidationException } from '../models/exceptions';
import { JsonHeaders } from '../models/http/jsonHeader';
import { PromiseFactory, Promise } from "../models/promise";
import { CommonEvent, HttpCode, LoadingIndicatorEvent } from '../event';
import { EventManager } from "../eventManager";
import { IConnector } from "./iconnector";
@Injectable()
export class RESTConnector implements IConnector {
    private static http: Http;
    private static eventManager: EventManager;
    constructor() {
        let http: Http = window.appState.getInjector().get(Http);
        this.setHttp(http);
    }
    public setHttp(http: Http) {
        RESTConnector.http = http;
        RESTConnector.eventManager = window.ioc.resolve("IEventManager");
    }
    public getJSON(jsonPath: string) {
        RESTConnector.eventManager.publish(LoadingIndicatorEvent.Show);
        let def = PromiseFactory.create();
        let headers = new JsonHeaders();
        RESTConnector.http.get(jsonPath, { headers: headers })
            .map((response: any) => response.json())
            .subscribe((data: any) => { def.resolve(data); });
        return def;
    }

    public post(url: string, data: any): Promise {
        RESTConnector.eventManager.publish(LoadingIndicatorEvent.Show);
        let def = PromiseFactory.create();
        let headers = new JsonHeaders();
        let dataToSend = JSON.stringify(data);
        RESTConnector.http.post(url, dataToSend, { headers: headers })
            .map((response: any) => response.json())
            .subscribe(
            (data: any) => this.handleResponse(def, data),
            (exception: any) => this.handleException(def, exception)
            );
        return def;
    }

    public put(url: string, data: any): Promise {
        RESTConnector.eventManager.publish(LoadingIndicatorEvent.Show);
        let def = PromiseFactory.create();
        let headers = new JsonHeaders();
        let dataToSend = JSON.stringify(data);
        RESTConnector.http.put(url, dataToSend, { headers: headers })
            .map((response: any) => response.json())
            .subscribe(
            (data: any) => this.handleResponse(def, data),
            (exception: any) => this.handleException(def, exception)
            );
        return def;
    }

    public get(url: string): Promise {
        RESTConnector.eventManager.publish(LoadingIndicatorEvent.Show);
        let def = PromiseFactory.create();
        let headers = new JsonHeaders();
        RESTConnector.http.get(url, { headers: headers })
            .map((response: any) => response.json())
            .subscribe(
            (data: any) => this.handleResponse(def, data),
            (exception: any) => this.handleException(def, exception)
            );
        return def;
    }

    public delete(url: string): Promise {
        RESTConnector.eventManager.publish(LoadingIndicatorEvent.Show);
        let def = PromiseFactory.create();
        let headers = new JsonHeaders();
        RESTConnector.http.delete(url, { headers: headers })
            .map((response: any) => response.json())
            .subscribe(
            (data: any) => this.handleResponse(def, data),
            (exception: any) => this.handleException(def, exception)
            );
        return def;
    }

    private handleResponse(def: Promise, response: any): any {
        RESTConnector.eventManager.publish(LoadingIndicatorEvent.Hide);
        if (!response.errors || response.errors.length === 0) {
            def.resolve(response.data);
            return;
        }
        if (response.messages && response.messages.length > 0) {
            this.handleMessages(response);
        }
        let validationError: ValidationException = this.getValidationExceptionFromResponse(response.errors);
        RESTConnector.eventManager.publish(CommonEvent.ValidationFail, validationError);
        def.reject(response.errors);
    }
    private handleMessages(response: any): any {
        //RESTConnector.eventManager.publish(LoadingIndicatorEvent.Hide);
        if (!response.messages || response.messages.length === 0)
            return;
        let messages: any = this.getMessagesFromResponse(response.errors);
        RESTConnector.eventManager.publish(CommonEvent.ShowMessage, messages);
    }
    private handleException(def: Promise, exception: any) {
        RESTConnector.eventManager.publish(LoadingIndicatorEvent.Hide);
        let error: ValidationException = this.getError(exception);
        def.reject(error.errors);
        RESTConnector.eventManager.publish(CommonEvent.ValidationFail, error);
    }
    private getValidationExceptionFromResponse(responseErrors: Array<any>) {
        let validationEror: ValidationException = new ValidationException();
        responseErrors.forEach(function (errorItem: any) {
            validationEror.add(errorItem.key, errorItem.params);
        });
        return validationEror;
    }
    private getMessagesFromResponse(responseMessages: Array<any>) {
        let messages: any = [];
        responseMessages.forEach(function (messagesItem: any) {
            messages.add(messagesItem.key, messagesItem.params);
        });
        return messages;
    }
    private getError(exception: any): ValidationException {
        let validationEror: ValidationException;
        switch (exception.status) {
            case HttpCode.BadRequest:
                validationEror = new ValidationException("common.httpError.badRequest");
                break;
            case HttpCode.NotFound:
                validationEror = new ValidationException("common.httpError.notFound");
                break;
            case HttpCode.UnAuthorized:
                validationEror = new ValidationException("common.httpError.unAuthorized");
                break;
            case HttpCode.Forbidden:
                validationEror = new ValidationException("common.httpError.forbidden");
                break;
            default:
                validationEror = new ValidationException("common.httpError.genericError");
                break;
        }
        return validationEror;
    }
}
