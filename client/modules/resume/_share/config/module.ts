import { MenuItemModel, Module, IModule } from '../../../commonCore/models/app/imodule';
import route from './route'

let umModule: IModule = createModule();
export default umModule;
function createModule() {
    let module = new Module("modules/resume", "resume");

    module.menus.push(
        new MenuItemModel(
            "Personal Information", null, "fa fa-th-large", true,
            new MenuItemModel(route.personalInformation.generalInformation.name, route.personalInformation.generalInformation.path, ""),
            new MenuItemModel(route.personalInformation.objectives.name, route.personalInformation.objectives.path, "")
        )
    );
    
    module.menus.push(
        new MenuItemModel(
            "Education", null, "fa fa-th-large", true,
            new MenuItemModel(route.education.college.name, route.education.college.path, ""),
            new MenuItemModel(route.education.career.name, route.education.career.path, ""),
            new MenuItemModel(route.education.certifications.name, route.education.certifications.path, "")
        )
    );
    
    module.menus.push(
        new MenuItemModel(
            "Experience", null, "fa fa-th-large", true,
            new MenuItemModel(route.experience.experience.name, route.experience.experience.path, "")
        )
    );
    
    module.menus.push(
        new MenuItemModel(
            "Skills", null, "fa fa-th-large", true,
            new MenuItemModel(route.skills.technicalSkills.name, route.skills.technicalSkills.path, ""),
            new MenuItemModel(route.skills.lenguages.name, route.skills.lenguages.path, "")
            )
    );
    module.addRoutes([
    ]);
    return module;
}
