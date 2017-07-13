import resumeService from '../_share/services/resumeService';
import { DefaultUnauthenticatedLayout } from '../../commonCore/layouts/default/unauthenticatedLayout';
import { Component } from '@angular/core';
import { BasePage } from "modules/commonCore/models/ui/basePage";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "objectives",
    templateUrl: "./objectives.html"
})
export class Objectives extends BasePage {

    public objectives: string[];
    constructor(routedActivated: ActivatedRoute) {

        super(routedActivated,null);
        let self = this;
        resumeService.getObjectives()
            .error(function (error: any) {
                console.log(error
                );
            })
            .then(function (objectives: any) {
                self.objectives = objectives
            })

    }
}
