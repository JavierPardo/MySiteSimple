import { BaseComponent } from '../../../../../models/ui/baseComponent';
import { ComponentType } from '../../../../../models/ui/componentType';

import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'image-container',
    template: `
        <input type="file" (change)="changeListner($event)" />
        <img class="image" />
    `,
})
export class ImageContainerComponent {
    @Output() image: any = new EventEmitter();
    constructor(private element: ElementRef ) { 
        
    }

    changeListner(event) {
        let self: ImageContainerComponent=this;
        var reader = new FileReader();
        var imageEl = this.element.nativeElement.querySelector('.image');
        imageEl = event.target.files[0];
        reader.onloadend = function (e: any) {
            var src = e.target.result;        
            imageEl.src = src;
            self.image.emit(src);
        };

        reader.readAsDataURL(event.target.files[0]);
    }
}