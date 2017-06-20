import { AfterViewChecked, Component, ElementRef, Input } from '@angular/core';
import { ModalPopUpEvent } from "../../../../event";
import { EventManager } from "../../../../eventManager";

import { ModalType } from '../../../../models/ui/componentType';

declare var $: any;
@Component({
    selector: "carousel-images",
    templateUrl: "./carouselImages.html"
})
export class CarouselImages implements AfterViewChecked {
    ngAfterViewChecked(): void {
        if (this.canShow) {
            if (this.element.nativeElement.querySelector('.active') == null) {
                this.element.nativeElement.querySelector('.item')
                .classList.add('active');
            }


        }
    }

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
