import { UserRegisterModel } from '../../user/register/userRegisterModel';
import { UserLoginModel } from '../../user/login/userLoginModel';
import helper from '../../../commonCore/helpers';
import { PromiseFactory, Promise } from "../../../commonCore/models/promise";

let userService = {
    signin: signin,    
    postUser: postUser
};
export default userService;
function signin(signinModel: UserLoginModel): Promise {
    let connector = window.ioc.resolve("IConnector");
    let url = getAPISigninUrl();
    return connector.post(url, signinModel);
}
function getAPISigninUrl(): string {
    return helper.config.getAppConfig().api.baseUrl + "user/signin";
}
function postUser(user: UserRegisterModel): Promise{
    let connector = window.ioc.resolve("IConnector");
    let url = getAPIRegisterUrl();
    return connector.post(url, user);
}
function getAPIRegisterUrl(): string {
    return helper.config.getAppConfig().api.baseUrl + "user/register";
}