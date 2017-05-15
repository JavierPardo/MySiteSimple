
export class GeneralInformationModel {
    public name: string = "";
    public location: string = "";
    public emailAdresses: string[] = [""];
    public birthDate: string = "";
    public import(item: any) {
        this.location = item.location;
        this.name = item.name;
        this.emailAdresses=item.email;
        this.birthDate = item.birthdate;
    }
}