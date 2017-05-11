import { Routes, Route } from '@angular/router';

export class MenuItemModel {
    constructor(text: string, url: string, cssClass: string, isPublic:boolean =false, ...subItems: Array<MenuItemModel>) {
        this.text = text;
        this.url = url;
        this.class = cssClass;
        this.items = subItems.length > 0 ? subItems : new Array<MenuItemModel>();
    }
    text: string = "";
    url: string = "";
    class: string = "";
    isPublic: boolean=false;
    items: Array<MenuItemModel> = new Array<MenuItemModel>();
}
export interface IModule {
    path: string;
    nameKey: string;
    menus: Array<MenuItemModel>;
    routes: any;
    addRoutes(routes: any): void;
}
export class Module implements IModule {
    constructor(path: string, nameKey: string) {
        this.path = path;
        this.nameKey = nameKey;
        this.menus = new Array<MenuItemModel>();
        this.routes = [];
    }
    public path: string;
    public nameKey: string;
    public menus: Array<MenuItemModel> = [];
    public routes: Routes = [];
    public addRoutes(routes: Routes) {
        if (!routes.length && routes.length <= 0) {
            this.routes.push(routes);
            return;
        }
        for (let index = 0; index < routes.length; index++) {
            let route = routes[index];
            this.routes.push(route);
        }
    }
}
export class JITRoute implements Route {
    constructor(path: string, name: string, component: any, isDefault: boolean = false) {
        this.path = path;
        this.name = name;
        this.component = component;
        this.useAsDefault = isDefault;
    }
    public path: string;
    public name: string;
    public component: any;
    public useAsDefault: boolean;
}
export enum ProfileDisplayMode {
    AvatarAndName,
    Quick
}