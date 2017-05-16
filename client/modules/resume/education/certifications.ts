import { CertificationModel } from './certificationModel';
import resumeService from '../_share/services/resumeService';
import { DefaultUnauthenticatedLayout } from '../../commonCore/layouts/default/unauthenticatedLayout';
import { Component } from '@angular/core';
import { BasePage } from "modules/commonCore/models/ui/basePage";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "certifications",
    templateUrl: "./certifications.html"
})
export class Certifications extends BasePage {

    public certifications: any[] = [];

    constructor(routedActivated: ActivatedRoute) {

        super(routedActivated);
        let self: Certifications = this;
        resumeService.education.getCertifications()
            .error(function (error: any) {
                console.log(error);
            })
            .then(function (certificats: any) {
                for (let cert of certificats) {
                    var certification = new CertificationModel();
                    certification.import(cert);
                    self.certifications[self.certifications.length] = certification;
                }
            })

    }
}
