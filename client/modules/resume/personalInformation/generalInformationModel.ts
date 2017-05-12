
export class GeneralInformationModel {
    public name: string = "";
    public location: string = "";
    public emailAdresses: string[] = [""];
    public birthDate: string = "";
    public import(item: any) {
        console.log("parsing object"+item);
        this.location = item.location;
        this.name = item.name;
        this.emailAdresses=item.email;
        this.birthDate = item.birthdate;
        console.log(this);
    }
}