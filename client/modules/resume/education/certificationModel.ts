
export class CertificationModel {
    public name: string = "";
    public description: string = "";
    public instructor: string = "";
    public date: string = "";
    public institution: string = "";

    public import(item: any) {
        this.name = item.name;
        this.description = item.description;
        this.instructor = item.instructor;
        this.date = item.date;
        this.institution = item.institution;
    }
}