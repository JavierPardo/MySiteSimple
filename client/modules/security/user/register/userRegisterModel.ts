import userService from '../../_share/services/userService';
import { ValidationException } from '../../../commonCore/models/exceptions';
export class UserRegisterModel {
    public email: string = "";
    public password: string = "";
    public name: string = "";
    public userName: string = "";
    public isValid(): boolean {
        let validationErrors: ValidationException = new ValidationException();
        if (!this.email|| this.email === '') {
            validationErrors.add("user.register.emailRequired");
        }
        if (!this.password|| this.password === '') {
            validationErrors.add("user.register.pwdRequired");
        }
        if (!this.name|| this.name === '') {
            validationErrors.add("user.register.nameRequired");
        }
        if (!this.userName|| this.userName === '') {
            validationErrors.add("user.register.userNameRequired");
        }
        validationErrors.throwIfHasError();
        return !validationErrors.hasError();
    }
}