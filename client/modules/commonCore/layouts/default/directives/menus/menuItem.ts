import { Input, Component } from "@angular/core";

import { MenuItemModel } from '../../../../models/app/imodule';


@Component({
    selector: "menu-item",
    templateUrl: "./menuItem.html",
})
export class MenuItem {
    @Input() items: Array<MenuItemModel>;
    @Input() isChild: boolean;
    ngOnInit() {
    }
}