import { ApplicationStateEvent, AuthenticatedEvent, LoadingIndicatorEvent, RountingEvent } from './event';
import { EventManager } from './eventManager';
import { IApplicationState } from './models/app/iapplicationState';
import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import authService from './services/authService';
import helper from './helpers';

export class ApplicationState implements IApplicationState {
    private eventManager: EventManager;
    private injector: Injector = null;
    public registerEvents(): void {
        let self: ApplicationState = this;
        self.eventManager = window.ioc.resolve("IEventManager");
        self.eventManager.subscribe(ApplicationStateEvent.Init, (args: any) => self.onApplicationInit(args));
        self.eventManager.subscribe(ApplicationStateEvent.BeforeReady, (args: any) => self.onApplicationBeforeReady(args));
        self.eventManager.subscribe(ApplicationStateEvent.Ready, (args: any) => self.onApplicationReady(args));
        self.eventManager.subscribe(ApplicationStateEvent.UnAuthorizeRequest, (routeInstruction: any) => self.onUnAuthorizeRequest(routeInstruction));
        self.eventManager.subscribe(ApplicationStateEvent.Unload, (args: any) => self.onApplicationUnload(args));
    }
    public setInjector(injector: Injector): void {
        this.injector = injector;
    }
    public getInjector(): Injector {
        return this.injector;
    }
    private onUnAuthorizeRequest(routeInstruction: any) {
        let self: ApplicationState = this;
        self.eventManager.publish(AuthenticatedEvent.AuthenticationChanged,authService.isAuthenticated(authService.getUserProfile()));
    }
    private onApplicationInit(args: any) {
        /* Consider to move to event */
        document.title = helper.config.getAppConfig().app.name;
    }
    private onApplicationBeforeReady(args: any) {
    }
    private onApplicationReady(args: any) {
        console.log("onApplicationReady");
        this.eventManager.publish(LoadingIndicatorEvent.Hide);
    }
    private onApplicationUnload(args: any) {
    }
}
export class ApplicationStateFactory {
    private static appStateInstance: IApplicationState = null;
    public static getInstance(): IApplicationState {
        if (!ApplicationStateFactory.appStateInstance) {
            ApplicationStateFactory.appStateInstance = new ApplicationState();
        }
        return ApplicationStateFactory.appStateInstance;
    }
}