import { IModule } from '../commonCore/models/app/imodule';

import resume from "../resume/_share/config/module";
//import securiry from "../security/_share/config/module";
//import setting from "../setting/_share/config/module";
import {Languages} from "../commonCore/enum";
let modules: Array<IModule> = [
    resume
    //securiry,
    //setting
];
export default {
    app: {
        name: "Javing Tech"
    },
    ioc: "./config/ioc",
    modules: modules,
    loginUrl: "user/Login",
    defaultUrl: "resume/generalInformation",
    localization: {
        lang: Languages.EN
    },
    auth: {
        token: "authtoken"
    },
    api: {
          baseUrl: "http://www.javing.tech/api/"
    },
    localeUrl: "/assets/locales/"
};