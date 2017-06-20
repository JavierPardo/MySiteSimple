import { Component, ElementRef, Input } from '@angular/core';
import {ModalPopUpEvent} from "../../../../event";
import {EventManager} from "../../../../eventManager";

import { ModalType } from '../../../../models/ui/componentType';
@Component({
    selector: "modal-popup",
    templateUrl: "./modalPopUp.html"
})
export class ModalPopUp {
    private image:any;
    public model: boolean = false;
    private callback: any;
    constructor(private element: ElementRef) {
        let self: ModalPopUp = this;
        let eventManager: EventManager = window.ioc.resolve("IEventManager");
        console.log('subcribing event ',ModalPopUpEvent.Show);
        eventManager.subscribe(ModalPopUpEvent.Show, (options: any) => self.onShow(options));
        // eventManager.subscribe(ModalPopUpEvent.Hide, () => self.onHide());
    }
    public onShow(options: any): void {
        this.model = true;
        this.callback=options.callback;
    }
    public onOkClicked(): void {
        this.callback(this.image);
        this.onCloseClicked();
    }
    public onCloseClicked(): void {
        this.model = false;
    }
    
    onSelectFileClicked(event) {
        let self: ModalPopUp=this;
        var reader = new FileReader();
        var imageEl = this.element.nativeElement.querySelector('.image');
        reader.onloadend = function (e: any) {
            var src = e.target.result;        
            imageEl.src = src;
            self.image=src;
        };

        reader.readAsDataURL(event.target.files[0]);
    }
}
