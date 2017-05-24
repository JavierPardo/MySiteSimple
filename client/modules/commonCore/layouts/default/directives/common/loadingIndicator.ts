import {Component, Input} from "@angular/core";
import {LoadingIndicatorEvent} from "../../../../event";
import {EventManager} from "../../../../eventManager";

@Component({
    selector: "loading-indicator",
    template: `<div id='loaderIndicator' class='loading {{model}}'>&nbsp;
    LOADING....
    </div>`
})
export class LoadingIndicator {
    public model: string = LoadingIndicatorEvent.Show;
    private showRequest: boolean = false;
    constructor() {
        let self: LoadingIndicator = this;
        let eventManager: EventManager = window.ioc.resolve("IEventManager");
        eventManager.subscribe(LoadingIndicatorEvent.Show, () => self.onShow());
        eventManager.subscribe(LoadingIndicatorEvent.Hide, () => self.onHide());
    }
    public onShow(): void {
        this.showRequest = true;
        let self: LoadingIndicator = this;
        window.setTimeout(function () {
            if (self.showRequest !== true) { return; }
            self.model = "show";
        }, 300);
    }
    public onHide(): void {
        this.showRequest = false;
        this.model = "hide";
    }
}
