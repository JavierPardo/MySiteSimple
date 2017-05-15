import { IConnector } from '../../../commonCore/connectors/iconnector';
import configHelper from '../../../commonCore/helpers/configHelper';

import { PromiseFactory, Promise } from "../../../commonCore/models/promise";

let resumeService = {
    getGenInfo: getGeneralInformation,
    getObjectives: getPersonalObjectives
};
export default resumeService;
function getGeneralInformation(): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = configHelper.getAppConfig().api.baseUrl + "resume/gen-info";
    return connector.get(url);
}

function getPersonalObjectives(): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = configHelper.getAppConfig().api.baseUrl + "resume/per-obj";
    return connector.get(url);
}