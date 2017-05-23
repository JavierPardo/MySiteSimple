import { IConnector } from '../../../commonCore/connectors/iconnector';
import configHelper from '../../../commonCore/helpers/configHelper';

import { PromiseFactory, Promise } from "../../../commonCore/models/promise";

let resumeService = {
    getGenInfo: getGeneralInformation,
    getObjectives: getPersonalObjectives,
    education: {
        getCollegeHist: getCollegeHist,
        getCertifications: getCertifications
    }
};
export default resumeService;
function getGeneralInformation(): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = configHelper.getUrlCombined(configHelper.getAppConfig().api.baseUrl + "/resume/gen-info");
    return connector.get(url);
}

function getPersonalObjectives(): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = configHelper.getUrlCombined(configHelper.getAppConfig().api.baseUrl + "/resume/per-obj");
    return connector.get(url);
}

function getCollegeHist() {
    let connector = window.ioc.resolve("IConnector");
    let url = configHelper.getUrlCombined(configHelper.getAppConfig().api.baseUrl + "/resume/education/college");
    return connector.get(url);
}

function getCertifications() {
    let connector = window.ioc.resolve("IConnector");
    let url = configHelper.getUrlCombined(configHelper.getAppConfig().api.baseUrl + "/resume/education/certification");
    return connector.get(url);
}