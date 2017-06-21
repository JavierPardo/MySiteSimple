import { AfterViewChecked, Component, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ModalPopUpEvent } from '../../../../event';
import { EventManager } from '../../../../eventManager';
import { BaseComponent } from '../../../../models/ui/baseComponent';
import { ComponentType, ModalType } from '../../../../models/ui/componentType';

declare var $: any;
@Component({
    selector: "carousel-images",
    templateUrl: "./carouselImages.html"
})
export class CarouselImages extends BaseComponent implements AfterViewChecked{
    ngAfterViewChecked(): void {
            console.log('reload');
        if (this.canShow) {
            console.log('reload1');
        alert(this.element.nativeElement.innetHtml);
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
        console.log('images changed');
        console.log(newImages);
        this.canShow = newImages && newImages.length > 0;
        this._images = newImages;
    }

    get images(): string {
        return this._images;
    }

    constructor(private element: ElementRef, http: Http, routeActivated: ActivatedRoute) {
        super(http, ComponentType.Control,routeActivated)
    }

}
