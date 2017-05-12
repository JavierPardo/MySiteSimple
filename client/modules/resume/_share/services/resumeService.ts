import { IConnector } from '../../../commonCore/connectors/iconnector';
import configHelper from '../../../commonCore/helpers/configHelper';

import { PromiseFactory, Promise } from "../../../commonCore/models/promise";

let resumeService = {
    getGenInfo: getGeneralInformation
};
export default resumeService;
function getGeneralInformation(): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = getAPIGeneralInformation();
    return connector.get(url);
}
function getAPIGeneralInformation(): string {
    return configHelper.getAppConfig().api.baseUrl + "resume/gen-info";
}