import { ExcerciseModel } from '../excerciseModel';
import { CommonEvent } from '../../../commonCore/event';
import workinService from '../../_share/services/workinService';
import { ValidationException } from '../../../commonCore/models/exceptions';
import { AfterViewInit } from '@angular/core/core';
import { Component } from '@angular/core';
import { BasePage } from "modules/commonCore/models/ui/basePage";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "ViewExcercise",
    templateUrl: "./viewExcercise.html"
})
export class ViewExcercise extends BasePage implements AfterViewInit {
    public myExcercise: ExcerciseModel = new ExcerciseModel();
    public canEdit: boolean = false;
    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
        let id = activatedRoute.snapshot.params['Id'];
        workinService.getExcercise(id)
            .error(function (errors: any) {
                let exceptions = new ValidationException();
                errors.forEach(error => {
                    exceptions.add(error.key, error.params);
                });
            })
            .then(function (responseServer: any) {
                let self: ViewExcercise = this;
                let excercise = new ExcerciseModel();
                excercise.import(responseServer.excercise);
                self.myExcercise = excercise;
            });
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        let self = this;
    }

}
