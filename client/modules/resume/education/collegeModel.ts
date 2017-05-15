
export class CollegeModel {
    public collegeName: string ="";
     public location: string ="";
     public startYear: string ="";
     public endYear: string ="";
    
    public import(item: CollegeModel) {
        this.location = item.location;
        this.startYear = item.startYear;
        this.endYear=item.endYear;
        this.collegeName = item.collegeName;
    }
}