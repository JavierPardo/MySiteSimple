import helper from '../../helpers';
import { IConnector } from '../../connectors/iconnector';
import { AuthenticationMode } from '../../enum';
import { ApplicationStateEvent, AuthenticatedEvent, RountingEvent } from '../../event';
import { EventManager } from '../../eventManager';
import { ResourceHelper } from '../../helpers/resourceHelper';
import authService from '../../services/authService';
import { Hashtable } from '../list/hashtable';
import { ComponentType } from './componentType';
// import { IConnector } from "../../connectors/iconnector";
// import { EventManager } from "../../eventManager";
import { AfterContentInit, AfterViewInit, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

export class BaseComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy, OnChanges {
    protected connector: IConnector;
    protected eventManager: EventManager;
    protected events: Hashtable<any>;
    public i18n: any;
    public i18nHelper: ResourceHelper;
    public id: string = helper.guid.create();
    public routeActivated: ActivatedRoute;
    constructor(http: Http, componentType: any = ComponentType.Layout,
        routeActivated: ActivatedRoute) {
        this.routeActivated = routeActivated;
        this.connector = window.ioc.resolve("IConnector");
        this.eventManager = window.ioc.resolve("IEventManager");
        let resourceHelper: ResourceHelper = window.ioc.resolve("IResource");
        this.i18nHelper = resourceHelper;
        this.i18n = resourceHelper.getResourceData();
        this.events = new Hashtable<any>();
        if (componentType === ComponentType.Layout) {
            this.connector.setHttp(http);
        }
    }
    routerOnActivate(next: any): boolean | Promise<boolean> {
        let authenticationMode = next.data["authentication"];
        if (!authenticationMode || authenticationMode === AuthenticationMode.None) { return true; }
        let isAuthenticated: boolean = authService.isAuthorized(next);
        if (!isAuthenticated) {
            this.eventManager = window.ioc.resolve("IEventManager");
            this.eventManager.publish(ApplicationStateEvent.UnAuthorizeRequest, next);
        }
        return false;
    }

    ngOnInit() {
        this.onInit();
        let self: BaseComponent = this;
        this.events.getKeys().forEach(function (key) {
            let handler: any = self.events.get(key);
            self.eventManager.subscribe(key, handler);
        });
    }

    ngAfterContentInit() {
        this.onBeforeReady();
    }

    ngAfterViewInit() {
        this.onReady();
        if (this.routeActivated && this.routeActivated != null)
            this.routeActivated.params.subscribe(params => this.routerOnActivate(this.routeActivated.snapshot));

    }

    ngOnDestroy() {
        let self: BaseComponent = this;
        this.events.getKeys().forEach(function (key) {
            self.eventManager.unsubscribe(key);
        });
        this.onUnload();
    }

    ngOnChanges() {
        this.onChange();
    }

    protected onChange() { }
    protected setResources(resources: Array<string>) {
        let resourceHelper: ResourceHelper = window.ioc.resolve("IResource");
        resourceHelper.load(resources);
    }
    protected onInit() {
    }
    protected onBeforeReady() {
    }
    protected onReady() {
    }
    protected onUnload() {
    }
    public registerEvent(key: string, handler: any): void {
        this.events.set(key, handler);
    }
}