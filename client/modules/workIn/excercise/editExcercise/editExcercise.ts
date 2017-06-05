import { ValidationException } from '../../../commonCore/models/exceptions';
import workinService from '../../_share/services/workinService';
import { ActivatedRoute } from '@angular/router';
import { ExcerciseModel } from '../excerciseModel';
import { Component } from '@angular/core';
import { BasePage } from "modules/commonCore/models/ui/basePage";
import { CommonEvent } from '../../../commonCore/event';

@Component({
    selector: "EditExcercise",
    templateUrl: "./editExcercise.html"
})
export class EditExcercise extends BasePage {
    public model: ExcerciseModel = new ExcerciseModel();
    public isNew: Boolean;
    constructor(private route: ActivatedRoute) {
        super(route)
        let self = this;
        route.params.subscribe((queryParam: any) => {
            self.isNew = queryParam["Id"] == undefined
        });
    }

    public onCreateClicked($event) {
        let self: EditExcercise = this;
        workinService.create(this.model)
        .error(function (errors: any) {
            let exceptions = new ValidationException();
            errors.forEach(error => {
                exceptions.add(error);
            });
            self.eventManager.publish(CommonEvent.ValidationFail, exceptions);
        })
            .then(function (responseServer: any) {
            });
    }

    public onUpdateClicked($event) {
    }
}
