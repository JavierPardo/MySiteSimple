import { ValidationException } from '../../../commonCore/models/exceptions';
import workinService from '../../_share/services/workinService';
import { ActivatedRoute } from '@angular/router';
import { ExcerciseModel } from '../excerciseModel';
import { Component } from '@angular/core';
import { BasePage } from "modules/commonCore/models/ui/basePage";
import { CommonEvent, AuthenticatedEvent, ApplicationStateEvent, ValidationEvent, ModalPopUpEvent } from '../../../commonCore/event';
import { ModalType } from "modules/commonCore/models/ui/componentType";

@Component({
    selector: "EditExcercise",
    templateUrl: "./editExcercise.html"
})
export class EditExcercise extends BasePage {
    public model: ExcerciseModel = new ExcerciseModel();
    public canUpdate: Boolean;
    public isNew: Boolean;
    public excerciseImages;
    constructor(private route: ActivatedRoute) {
        super(route)
        let self = this;
        route.params.subscribe((queryParam: any) => {
            self.isNew = queryParam["Id"] == undefined;
            if (!self.isNew) {
                let excerciseId = queryParam["Id"];
                workinService.getExcercise(excerciseId)
                    .error(function (errors: any) {
                        let exceptions = new ValidationException();
                        errors.forEach(error => {
                            exceptions.add(error.key, error.params);
                        });
                    })
                    .then(function (responseServer: any) {
                        let excercise: ExcerciseModel = new ExcerciseModel();
                        self.model.import(responseServer.excercise);
                        self.canUpdate = !!self.model.id;
                        if (!self.model.id) {
                            let exceptions = new ValidationException();
                            exceptions.add('excercise.notAuthorized', []);
                            self.eventManager.publish(ValidationEvent.ValidationFail, exceptions);
                            self.eventManager.publish(ApplicationStateEvent.UnAuthorizeRequest);

                        }
                    });
            }
        });
    }

    public onCreateClicked($event) {
        let self: EditExcercise = this;
        console.log(self.model)
        workinService.create(self.model)
            .error(function (errors: any) {
                let exceptions = new ValidationException();
                errors.forEach(error => {
                    exceptions.add(error.key, [error.msg]);
                });
                self.eventManager.publish(CommonEvent.ValidationFail, exceptions);
            })
            .then(function (responseServer: any) {
            });
    }

    public onUpdateClicked($event) {
        let self: EditExcercise = this;
        workinService.update(this.model)
            .error(function (errors: any) {
                let exceptions = new ValidationException();
                errors.forEach(error => {
                    exceptions.add(error.key, [error.msg]);
                });
                self.eventManager.publish(CommonEvent.ValidationFail, exceptions);
            })
            .then(function (responseServer: any) {
            });
    }

    fileChange(event) {
        console.log(event);
        console.log('end-end');
    }

    onManageImagesClicked() {
        this.excerciseImages = this.model.newImages;
        let opts = {
            modalType: ModalType.ManageImages,
            callback: this.loadNewImage.bind(this),
            images:this.excerciseImages
        }
        this.eventManager.publish(ModalPopUpEvent.Show, opts);
    }

    loadNewImage(images) {
        console.log(images);
        this.excerciseImages = null;

        this.excerciseImages = images;
        this.model.newImages=this.excerciseImages;
    }
}
