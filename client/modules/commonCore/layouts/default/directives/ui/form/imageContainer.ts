import { ElementRef, Component } from '@angular/core';

@Component({
    selector: 'image-container',
    template: `
        <input type="file" (change)="changeListner($event)" />
        <img class="image" />
    `,
})
export class ImageContainerComponent {
    constructor(private element: ElementRef) {}

    changeListner(event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');
console.log(event.target.files[0]);
        reader.onload = function(e:any) {
            var src = e.target.result;
            image.src = src;
        };

        reader.readAsDataURL(event.target.files[0]);
    }
}