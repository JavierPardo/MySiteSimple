import appConfig from '../../config/appConfig';
import { IModule, MenuItemModel } from '../models/app/imodule';

import { Routes } from "@angular/router";

let configHelper = {
    getModuleMenuItems: getModuleMenuItems,
    getRoutes: getRoutes,
    getAppConfig: getAppConfig
};
export default configHelper;
function getAppConfig() {
    return appConfig;
}
function getRoutes() {
    let items: Routes = [];
    appConfig.modules.forEach(function (module: IModule) {
        items = items.concat(module.routes);
    });
    items.concat(
        {
            path: '/',
            redirectTo: getAppConfig().defaultUrl
        }
    )
    return items;
}
function getModuleMenuItems(isPublic: boolean=false): Array<MenuItemModel> {
    let items: Array<MenuItemModel> = new Array<MenuItemModel>();
    appConfig.modules.forEach(function (module: IModule) {
        items = appendModuleMenuItems(items, module, isPublic);
    });
    return items;
}
function appendModuleMenuItems(items: Array<MenuItemModel>, module: IModule, isPublic:boolean) {
    module.menus.forEach(function (MenuItemModel: MenuItemModel) {
        console.log(MenuItemModel.text);
        if(MenuItemModel.isPublic || !isPublic)
            items.push(MenuItemModel);
    });
    return items;
}