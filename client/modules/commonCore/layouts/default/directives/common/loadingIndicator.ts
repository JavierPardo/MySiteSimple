import { Component, ElementRef, Input } from '@angular/core';
import { LoadingIndicatorEvent } from "../../../../event";
import { EventManager } from "../../../../eventManager";

@Component({
    selector: "loading-indicator",
    templateUrl: "./loadingIndicator.html"
})
export class LoadingIndicator {
    public model: boolean = false;
    private showRequest: boolean = false;
    private messageIndicator: String = '';
    constructor(private element: ElementRef) {
        let self: LoadingIndicator = this;
        let eventManager: EventManager = window.ioc.resolve("IEventManager");
        eventManager.subscribe(LoadingIndicatorEvent.Show, (message: String) => self.onShow(message));
        eventManager.subscribe(LoadingIndicatorEvent.Hide, () => self.onHide());
    }
    public onShow(message: String): void {
        let self: LoadingIndicator = this;
        self.model = true;
        self.messageIndicator = message;

        if (this.element.nativeElement.querySelector('.loading-layer') != null) {
            this.element.nativeElement.querySelector('.loading-layer').classList.remove('loaded');
        }
    }
    public onHide(): void {
        if (this.element.nativeElement.querySelector('.loading-layer') != null) {
            this.element.nativeElement.querySelector('.loading-layer').classList.add('loaded');
        }

        let self: LoadingIndicator = this;
        setTimeout(function () {
            self.model = false;
            self.messageIndicator = '';
        }, 2300);
    }
}
