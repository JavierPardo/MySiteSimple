import { IoCContainer, IoCFactory } from '../commonCore/models/ioc/iocFactory';
import helper from '../commonCore/helpers';
import { ApplicationStateFactory } from '../applicationState';
import { HttpModule, Http, XHRBackend, BaseRequestOptions, BrowserXhr, RequestOptions, ResponseOptions, BaseResponseOptions, XSRFStrategy } from '@angular/http';
import { Injectable, ReflectiveInjector } from "@angular/core";
import { NoCheckCookieXSRFStrategy } from "modules/commonCore/services/noCheckCookieXSRFStrategy";


export class ConfigurationService {
  private injector : ReflectiveInjector;

  constructor() {
    this.injector=  ReflectiveInjector.resolveAndCreate([
  {
    provide: Http,
    deps: [XHRBackend, BaseRequestOptions],
    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions);
    }
  },
  BrowserXhr,
  BaseRequestOptions,
  { provide: RequestOptions, useFactory: () => new BaseRequestOptions() },
  { provide: ResponseOptions, useClass: BaseResponseOptions },
  XHRBackend,
  { provide: XSRFStrategy, useFactory: () => new NoCheckCookieXSRFStrategy("", "") },
]);

   }

  load():void {
  this.configInjector(this.injector);
  this.configIoC();

}

 configInjector(injector: any):void {
  ApplicationStateFactory.getInstance().setInjector(injector);
  window.appState = ApplicationStateFactory.getInstance();
}
configIoC():void {
  let config: any = helper.config.getAppConfig();
  let ioc: IoCContainer = IoCFactory.create();
  ioc.import(config.ioc);
  window.ioc = ioc;
  //let resourceHelper: ResourceHelper = window.ioc.resolve("IResource");
  //resourceHelper.load(["common"]);
}
}