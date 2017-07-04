import helper from '../../../commonCore/helpers';
import { PromiseFactory, Promise } from "../../../commonCore/models/promise";

let workinService = {
    create: create,
    update: update,
    getExcercises: getExcercises,
    getExcercise: getExcercise,
    sendImages: sendImages,
    getImages: getImages
};
function getImages(model: any): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = getAPIUrl("WorkIn/Excercise/" + model + "/Images");
    return connector.get(url, model);
}

function create(model: any): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = getAPIUrl("WorkIn/Excercise");
    return connector.put(url, model);
}

function update(model: any): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = getAPIUrl("WorkIn/Excercise");
    return connector.post(url, model);
}
function sendImages(model): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = getAPIUrl("WorkIn/Excercise/Images");
    return connector.put(url, model);
}
function getExcercise(id): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = getAPIUrl("WorkIn/Excercise/" + id);
    return connector.get(url);
}

function getAPIUrl(path: String): String {
    return helper.config.getUrlCombined(helper.config.getAppConfig().api.baseUrl + "/" + path);
}
function getExcercises(): Promise {

    let connector = window.ioc.resolve("IConnector");
    let url = getAPIUrl("WorkIn/Excercise");
    return connector.get(url);
}
export default workinService;