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
    loginUrl: "/Login",
    defaultUrl: "/MyResume",
    localization: {
        lang: Languages.EN
    },
    auth: {
        token: "authtoken"
    },
    api: {
          baseUrl: "http://localhost:9000/api/"
    },
    localeUrl: "/assets/locales/"
};