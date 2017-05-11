
import { AfterViewInit, Component, Input } from "@angular/core";
import helper from '../../../../helpers'

declare var $: any;
@Component({
    selector: "menu-sidebar",
    templateUrl: "./menuSidebar.html",
})
export class MenuSidebar implements AfterViewInit {
    
    @Input() isPublic: boolean= false;

    constructor() {
        this.menuItems = helper.config.getModuleMenuItems(this.isPublic);
    }
    public menuItems: any = [];
    public title: string = "";
    ngAfterViewInit() {
        this.initializedSidebar();
    }
    /* tslint:disable */
    private initializedSidebar(): any {
       
    }
    /* tslint:enable */
}