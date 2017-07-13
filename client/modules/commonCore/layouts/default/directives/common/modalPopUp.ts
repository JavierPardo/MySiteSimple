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
        let modalImages = options.images

        this.images = [];
        if (modalImages)
            for (let i = 0; i < modalImages.length; i++) {
                
            }
        this.images = modalImages;


        this.newImages = [];
    }
    public onOkClicked(): void {
        let self: ModalPopUp = this;
        this.processNewImages().then(function () {
            self.eventManager.publish(LoadingIndicatorEvent.Hide);
            self.callback(self.images);
            self.onCloseClicked();
        });
    }
    public onCloseClicked(): void {
        this.model = false;
    }

    deleteItem($index, list) {
        let r = confirm("Do you want to delete that image?");
        if (r == true) {
            list.splice($index, 1);
        }
    }

    processNewImages(): Promise<any> {
        let self = this;
        var imageProcessor = new Promise(function (resolve, reject) {
            if (self.newImages.length != 0) {
                self.eventManager.publish(LoadingIndicatorEvent.Show, 'processing images...');
            }
            else {
                resolve();
            }
            for (let imageForProcess of self.newImages) {
                let isLast = self.newImages[self.newImages.length - 1] === imageForProcess;
                let img = new Image();
                img.onload = function () {
                    var data = resizeImage.resize(img, 320, 240, resizeImage.JPEG);
                    self.images[self.images.length] = { url: data };
                    if (isLast) {

                        resolve();
                    }
                };
                img.src = imageForProcess;
            }
        });
        return imageProcessor;

    }

    onSelectFileClicked(event) {
        let self: ModalPopUp = this;
        if (!event.target.files || event.target.files.length <= 0)
            return;
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
