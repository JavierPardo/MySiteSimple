import {Component, Input} from "@angular/core";
import {LoadingIndicatorEvent} from "../../../../event";
import {EventManager} from "../../../../eventManager";

@Component({
    selector: "loading-indicator",
    templateUrl: "./loadingIndicator.html"
})
export class LoadingIndicator {
    public model: boolean = false;
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
            self.model = true;
    }
    public onHide(): void {
        this.showRequest = false;
        this.model = false;
    }
}
