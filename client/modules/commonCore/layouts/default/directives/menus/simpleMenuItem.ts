import { Input, Component } from "@angular/core";

import { MenuItemModel } from '../../../../models/app/imodule';


@Component({
    selector: "simple-menu-item",
    templateUrl: "./simpleMenuItem.html",
})
export class SimpleMenuItem {
    @Input() items: Array<MenuItemModel>;
    @Input() isChild: boolean;
    ngOnInit() {
    }
}