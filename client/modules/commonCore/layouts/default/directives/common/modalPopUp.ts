import { Component, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ModalPopUpEvent, LoadingIndicatorEvent } from '../../../../event';
import { EventManager } from '../../../../eventManager';
import { BaseComponent } from '../../../../models/ui/baseComponent';
import { ComponentType, ModalType } from '../../../../models/ui/componentType';
import resizeImage from 'resize-image';
@Component({
    selector: "modal-popup",
    templateUrl: "./modalPopUp.html"
})
export class ModalPopUp extends BaseComponent {
    public model: boolean = false;
    private callback: any;
    public images;
    public newImages;
    constructor(private element: ElementRef, http: Http, routeActivated: ActivatedRoute) {
        super(http, ComponentType.Control, routeActivated);
        let self: ModalPopUp = this;
        let eventManager: EventManager = window.ioc.resolve("IEventManager");
        eventManager.subscribe(ModalPopUpEvent.Show, (options: any) => self.onShow(options));
        this.newImages = [];
    }
    public onShow(options: any): void {
        this.model = true;
        this.callback = options.callback;
        this.images = options.images
        this.newImages=[];
    }
    public onOkClicked(): void {
        this.processNewImages();
        this.callback(this.images);
        this.onCloseClicked();
    }
    public onCloseClicked(): void {
        this.model = false;
    }

    processNewImages() {
        let self = this;
        self.eventManager.publish(LoadingIndicatorEvent.Show, 'processing images...');

        for (let imageForProcess of this.newImages) {
            let img = new Image();
            img.onload = function () {
                var data = resizeImage.resize(img, 320, 240, resizeImage.JPEG);
                self.images[self.images.length] = data;
            };
            img.src = imageForProcess;
        }
        self.eventManager.publish(LoadingIndicatorEvent.Hide);

    }

    onSelectFileClicked(event) {
        let self: ModalPopUp = this;
        //self.eventManager.publish(LoadingIndicatorEvent.Show, 'loading image....');
        var reader = new FileReader();
        self.eventManager.publish(LoadingIndicatorEvent.Show, 'loading image....');

        reader.onloadend = function (e: any) {
            var src = e.target.result;
            self.newImages[self.newImages.length] = src;
            self.eventManager.publish(LoadingIndicatorEvent.Hide);
        };

        reader.readAsDataURL(event.target.files[0]);

    }
}
