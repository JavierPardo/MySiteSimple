import { GeneralInformationModel } from './generalInformationModel';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { BasePage } from "modules/commonCore/models/ui/basePage";
import resumeService from '../_share/services/resumeService';

@Component({
    selector: "general-information",
    templateUrl: "./generalInformation.html"
})
export class GeneralInformation extends BasePage {
    
    public model: GeneralInformationModel= new GeneralInformationModel();;
    
    constructor(routedActivated: ActivatedRoute){
        
        super(routedActivated);
        let self: GeneralInformation = this;
        resumeService.getGenInfo()
        .error(function (error: any){
            console.log(error
            );
        })
        .then(function (genInfoItem:any){
            console.log(genInfoItem);
            self.model.import(genInfoItem);
        })
        
    }
}
