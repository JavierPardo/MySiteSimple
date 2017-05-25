import { ApplicationStateEvent, LoadingIndicatorEvent } from './event';
import { EventManager } from './eventManager';
import { IApplicationState } from './models/app/iapplicationState';
import {Injector} from "@angular/core";
import {Router} from "@angular/router"; 

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
        let router: Router = this.injector.get(Router);
        //router.navigate([configHelper.getAppConfig().loginUrl]);
    }
    private onApplicationInit(args: any) {
        /* Consider to move to event */
        document.title = 'Javier PG';//configHelper.getAppConfig().app.name;
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