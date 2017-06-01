import { ExcerciseModel } from '../excerciseModel';
import { CommonEvent } from '../../../commonCore/event';
import workinService from '../../_share/services/workinService';
import { ValidationException } from '../../../commonCore/models/exceptions';
import { AfterViewInit } from '@angular/core/core';
import { Component } from '@angular/core';
import { BasePage } from "modules/commonCore/models/ui/basePage";

@Component({
    selector: "MyExcercise",
    templateUrl: "./myExcercise.html"
})
export class MyExcercise extends BasePage implements AfterViewInit {
    public myExcercises: any[];

   ngAfterViewInit(){
       this.ngAfterViewInit();
       let self = this;
       workinService.getExcercises()
        .error(function (errors: any) {
            let exceptions = new ValidationException();
            errors.forEach(error => {
                exceptions.add(error);
            });
            self.eventManager.publish(CommonEvent.ValidationFail, exceptions);
        })
            .then(function (responseServer: any) {
                responseServer.messages.forEach(element => {
                    self.eventManager.publish(CommonEvent.ShowMessage, responseServer.messages);
                });
                responseServer.items.forEach(element => {
                    let excercise = new ExcerciseModel();
                    excercise.import(element);
                    self.myExcercises.add(excercise);
                });

            });
   }

}
