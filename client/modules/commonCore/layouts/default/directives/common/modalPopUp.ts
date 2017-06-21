import { Component, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ModalPopUpEvent } from '../../../../event';
import { EventManager } from '../../../../eventManager';
import { BaseComponent } from '../../../../models/ui/baseComponent';
import { ComponentType, ModalType } from '../../../../models/ui/componentType';
@Component({
    selector: "modal-popup",
    templateUrl: "./modalPopUp.html"
})
export class ModalPopUp extends BaseComponent {
    private image:any;
    public model: boolean = false;
    private callback: any;
    public images;
    constructor(private element: ElementRef, http: Http, routeActivated: ActivatedRoute) {
        super(http,ComponentType.Control,routeActivated);
        let self: ModalPopUp = this;
        let eventManager: EventManager = window.ioc.resolve("IEventManager");
        eventManager.subscribe(ModalPopUpEvent.Show, (options: any) => self.onShow(options));
    }
    public onShow(options: any): void {
        this.model = true;
        this.callback=options.callback;
        this.images=options.images
    }
    public onOkClicked(): void {
        this.callback(this.images);
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
            let allImages=self.images
            allImages[allImages.length]=src;
            self.images=allImages;
        };

        reader.readAsDataURL(event.target.files[0]);
    }
}
