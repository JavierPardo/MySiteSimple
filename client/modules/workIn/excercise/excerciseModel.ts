import { ValidationException } from '../../commonCore/models/exceptions';
import workinService from '../../_share/services/workinService';
export class UserRegisterModel {
    public name: string = "";
    public description: string = "";
    public recommendation: string = "";
    public isValid(): boolean {
        let validationErrors: ValidationException = new ValidationException();
        if (!this.name) {
            validationErrors.add("registration.signin.emailRequired");
        }
        validationErrors.throwIfHasError();
        return !validationErrors.hasError();
    }
}