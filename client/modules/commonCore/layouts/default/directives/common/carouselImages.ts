import { AfterViewChecked, Component, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ModalPopUpEvent } from '../../../../event';
import { EventManager } from '../../../../eventManager';
import { BaseComponent } from '../../../../models/ui/baseComponent';
import { ComponentType, ModalType } from '../../../../models/ui/componentType';
import cloudinary from 'cloudinary';

declare var $: any;
@Component({
    selector: "carousel-images",
    templateUrl: "./carouselImages.html",
    styles: [
        ``
    ]
})
export class CarouselImages extends BaseComponent implements AfterViewChecked {
    ngAfterViewChecked(): void {

        if (this._images && this._images.length > 0) {
            if (this.element.nativeElement.querySelector('.active') == null) {
                if (this.element.nativeElement.querySelector('.item') != null)
                    this.element.nativeElement.querySelector('.item').classList.add('active');
            }
        }
    }

    private _images;
    public canShow: boolean;

    @Input()
    set images(newImages) {
        this._images = [];
        //this._images=newImages;
        if (newImages)
            for (let i = 0; i < newImages.length; i++) {
                if (newImages[i].name)
                    newImages[i].url = cloudinary.utils.url(newImages[i].name, {
                        cloud_name: 'dbas3m4wb'
                    });
            }
        this._images = newImages;
    }

    get images() {
        return this._images;
    }

    constructor(private element: ElementRef, http: Http, routeActivated: ActivatedRoute) {
        super(http, ComponentType.Control, routeActivated)
        this.canShow = this._images && this._images.length > 0;
    }

}
