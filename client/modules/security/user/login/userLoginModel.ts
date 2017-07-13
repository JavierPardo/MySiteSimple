import { ValidationException } from '../../../commonCore/models/exceptions';
export class UserLoginModel {
    public alias: string = "";
    public pwd: string = "";
    public isValid(): boolean {
        let validationErrors: ValidationException = new ValidationException();
        if (!this.alias) {
            validationErrors.add("registration.signin.aliasRequired");
        }
        if (!this.pwd) {
            validationErrors.add("registration.signin.pwdRequired");
        }
        validationErrors.throwIfHasError();
        return !validationErrors.hasError();
    }
}