import { ValidationException } from '../../commonCore/models/exceptions';
import workinService from '../_share/services/workinService';
export class ExcerciseModel {
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

    public import(data: any): void {
        this.name = data.name;
        this.description = data.description;
        this.recommendation = data.recommendation;
    }
}