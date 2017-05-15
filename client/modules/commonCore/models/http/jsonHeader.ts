import {Http, Headers} from "@angular/http";
import configHelper from "../../helpers/configHelper";
import authService from "../../services/authService";

export class JsonHeaders extends Headers {
    constructor() {
        super();
        this.append("Access-Control-Allow-Origin", "*");
        this.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        this.append("Access-Control-Max-Age", "1000");
        this.append("Access-Control-Allow-Headers", "x-requested-with, Content-Type, origin, authorization, accept, client-security-token");
        this.append("Content-Type", "application/json");
        this.append("accept", "application/json");
        let token: any = authService.getAuth().token;
        if (!!token && !String.isNullOrWhiteSpace(token.value)) {
            this.append(configHelper.getAppConfig().auth.token, token.value);
        }
    }
}