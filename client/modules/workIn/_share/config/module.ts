import { MenuItemModel, Module, IModule } from '../../../commonCore/models/app/imodule';
import route from './route'

let umModule: IModule = createModule();
export default umModule;
function createModule() {
    let module = new Module("modules/resume", "resume");

    module.menus.push(
        new MenuItemModel(
            "Excercise", null, "fa fa-th-large", false,
            new MenuItemModel(route.exercise.MyExcercises.name, route.exercise.MyExcercises.path, ""),
            new MenuItemModel(route.exercise.AddExcercise.name, route.exercise.AddExcercise.path, ""),
            new MenuItemModel(route.exercise.DeleteExcercise.name, route.exercise.DeleteExcercise.path, ""),
            new MenuItemModel(route.exercise.EditExcercise.name, route.exercise.EditExcercise.path, ""),
            new MenuItemModel(route.exercise.ShowExcercise.name, route.exercise.ShowExcercise.path, ""),
        )
    );
    
    module.menus.push(
        new MenuItemModel(
            "Serie", null, "fa fa-th-large", false,            
            new MenuItemModel(route.serie.MySeries.name, route.serie.MySeries.path, ""),
            new MenuItemModel(route.serie.AddSerie.name, route.serie.AddSerie.path, ""),
            new MenuItemModel(route.serie.DeleteSerie.name, route.serie.DeleteSerie.path, ""),
            new MenuItemModel(route.serie.EditSerie.name, route.serie.EditSerie.path, ""),
            new MenuItemModel(route.serie.ShowSerie.name, route.serie.ShowSerie.path, ""),
        )
    );
    
    module.menus.push(
        new MenuItemModel(
            "Food Recipe", null, "fa fa-th-large", false,
            new MenuItemModel(route.foodRecipe.MyFoodRecipes.name, route.foodRecipe.MyFoodRecipes.path, ""),
            new MenuItemModel(route.foodRecipe.AddFoodRecipe.name, route.foodRecipe.AddFoodRecipe.path, ""),
            new MenuItemModel(route.foodRecipe.DeleteFoodRecipe.name, route.foodRecipe.DeleteFoodRecipe.path, ""),
            new MenuItemModel(route.foodRecipe.EditFoodRecipe.name, route.foodRecipe.EditFoodRecipe.path, ""),
            new MenuItemModel(route.foodRecipe.ShowFoodRecipe.name, route.foodRecipe.ShowFoodRecipe.path, "")
        )
    );    
    module.addRoutes([
    ]);
    return module;
}
