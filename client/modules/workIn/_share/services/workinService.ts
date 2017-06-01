import helper from '../../../commonCore/helpers';
import { PromiseFactory, Promise } from "../../../commonCore/models/promise";

let workinService = {
    create:create
};

function create(model: any): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = getAPIUrl("WorkIn/Excercise");
    return connector.put(url, model);
}

function getAPIUrl(path: String): String {
    return helper.config.getUrlCombined(helper.config.getAppConfig().api.baseUrl + "/"+path);
}
export default workinService;