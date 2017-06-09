import { IModule } from '../commonCore/models/app/imodule';

import resume from "../resume/_share/config/module";
import workin from "../workIn/_share/config/module";
//import setting from "../setting/_share/config/module";
import {Languages} from "../commonCore/enum";
let modules: Array<IModule> = [
    resume,
    workin
    //securiry,
    //setting
];
export default {
    app: {
        name: "Javing Tech"
    },
    ioc: "./config/ioc",
    modules: modules,
    loginUrl: "/user/login",
    defaultUrl: "WorkIn/Excercise",
    defaultPublicUrl: "resume/generalInformation",
    localization: {
        lang: Languages.EN
    },
    auth: {
        token: "authtoken"
    },
    api: {
          baseUrl: "api"
    },
    localeUrl: "/assets/locales/"
};