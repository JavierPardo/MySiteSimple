import { ExcerciseModel } from '../excerciseModel';
import { CommonEvent } from '../../../commonCore/event';
import workinService from '../../_share/services/workinService';
import { ValidationException } from '../../../commonCore/models/exceptions';
import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePage } from 'modules/commonCore/models/ui/basePage';

@Component({
    selector: "ViewExcercise",
    templateUrl: "./viewExcercise.html"
})
export class ViewExcercise extends BasePage implements AfterViewInit {
    public model: ExcerciseModel = new ExcerciseModel();
    public canEdit: boolean = false;
    constructor(activatedRoute: ActivatedRoute, router: Router) {
        super(activatedRoute,router);
        let self: ViewExcercise = this;
        let id = activatedRoute.snapshot.params['Id'];
        workinService.getExcercise(id)
            .error(function (errors: any) {
                let exceptions = new ValidationException();
                errors.forEach(error => {
                    exceptions.add(error.key, error.params);
                    console.log(error);
                });
            })
            .then(function (responseServer: any) {
                let excercise: ExcerciseModel = new ExcerciseModel();
                self.model.import(responseServer.excercise);

                self.canEdit=!!self.model.id;
                workinService.getImages(id)
                .then(function(responseServer: any){
                    self.model.images=responseServer.images;
                })
            });
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

}
