import userService from '../../_share/services/userService';
import { ValidationException } from '../../../commonCore/models/exceptions';
export class UserRegisterModel {
    public email: string = "";
    public password: string = "";
    public name: string = "";
    public userName: string = "";
    public isValid(): boolean {
        let validationErrors: ValidationException = new ValidationException();
        if (!this.email) {
            validationErrors.add("registration.signin.emailRequired");
        }
        if (!this.password) {
            validationErrors.add("registration.signin.pwdRequired");
        }
        if (!this.name) {
            validationErrors.add("registration.signin.nameRequired");
        }
        if (!this.userName) {
            validationErrors.add("registration.signin.userNameRequired");
        }
        validationErrors.throwIfHasError();
        return !validationErrors.hasError();
    }

    public registerUser(): void {
        
        userService.postUser(this)
            .error(function (error: any) {
                console.log(error
                );
            })
            .then(function (messages: any) {
                console.log(messages);
            });
    }
}