import { AfterContentInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ModalPopUpEvent } from "../../../../event";
import { EventManager } from "../../../../eventManager";

import { ModalType } from '../../../../models/ui/componentType';

declare var $: any;
@Component({
    selector: "carousel-images",
    templateUrl: "./carouselImages.html"
})
export class CarouselImages  {
    
    private _images;
    public canShow: boolean = false;

    @Input()
    set images(newImages) {
        this.canShow = newImages && newImages.length > 0;
        this._images = newImages;
    }

    get images(): string {
        return this._images;
    }
    constructor(private element: ElementRef) {
    }

}
