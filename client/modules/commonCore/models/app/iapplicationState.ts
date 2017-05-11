
import { Injector } from "@angular/core";

export interface IApplicationState {
    registerEvents(): void;
    setInjector(injector: Injector): void;
    getInjector(): Injector;
}