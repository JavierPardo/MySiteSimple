import { Component } from '@angular/core';
import { BasePage } from "modules/commonCore/models/ui/basePage";

@Component({
    selector: "AddExcercise",
    templateUrl: "./addExcercise.html"
})
export class AddExcercise extends BasePage {    
    public model:  = new UserRegisterModel();
}
