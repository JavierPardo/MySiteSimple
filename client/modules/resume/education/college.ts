import resumeService from '../_share/services/resumeService';
import { CollegeModel } from './collegeModel';
import { DefaultUnauthenticatedLayout } from '../../commonCore/layouts/default/unauthenticatedLayout';
import { Component } from '@angular/core';
import { BasePage } from "modules/commonCore/models/ui/basePage";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "college",
    templateUrl: "./college.html"
})
export class College extends BasePage {

    public colHist: any[]= [];

    constructor(routedActivated: ActivatedRoute) {

        super(routedActivated);
        let self: College = this;
        resumeService.education.getCollegeHist()
            .error(function (error: any) {
                console.log(error
                );
            })
            .then(function (genCollHist: any) {
                for (let colDet of genCollHist) {
                    var college=new CollegeModel();
                    college.import(genCollHist);
                    self.colHist.add(college);
                }
            })

    }
}
