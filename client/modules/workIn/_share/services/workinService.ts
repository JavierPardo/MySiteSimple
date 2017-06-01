import helper from '../../../commonCore/helpers';
import { PromiseFactory, Promise } from "../../../commonCore/models/promise";

let workinService = {
    create:create,
    getExcercises:getExcercises
};

function create(model: any): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = getAPIUrl("WorkIn/Excercise");
    return connector.put(url, model);
}

function getAPIUrl(path: String): String {
    return helper.config.getUrlCombined(helper.config.getAppConfig().api.baseUrl + "/"+path);
}
function getExcercises(): Promise{
    
    let connector = window.ioc.resolve("IConnector");
    let url = getAPIUrl("WorkIn/Excercise");
    return connector.get(url);
}
export default workinService;