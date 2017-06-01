let route = {
    exercise: {
        MyExcercises: { name: "My Excercises", path: "WorkIn/Excercise" },
        AddExcercise: { name: "Add Excercise", path: "WorkIn/Excercise/Add" },
        ShowExcercise: { name: "Show Excercise", path: "WorkIn/Excercise/:Id" },
        EditExcercise: { name: "Edit Excercise", path: "WorkIn/Excercise/Edit/:Id" },
        DeleteExcercise: { name: "Delete Excercise", path: "WorkIn/Excercise/Delete/:Id" }
    },
    serie: {
        MySeries: { name: "My Series", path: "WorkIn/Serie" },
        AddSerie: { name: "Add Serie", path: "WorkIn/Serie/Add" },
        ShowSerie: { name: "Show Serie", path: "WorkIn/Serie/:Id" },
        EditSerie: { name: "Edit Serie", path: "WorkIn/Serie/Edit/:Id" },
        DeleteSerie: { name: "Delete Serie", path: "WorkIn/Serie/Delete/:Id" }
    },
    foodRecipe: {
        MyFoodRecipes: { name: "My Food Recipes", path: "WorkIn/FoodRecipe" },
        AddFoodRecipe: { name: "Add Food Recipe", path: "WorkIn/FoodRecipe/Add" },
        ShowFoodRecipe: { name: "Show Food Recipe", path: "WorkIn/FoodRecipe/:Id" },
        EditFoodRecipe: { name: "Edit Food Recipe", path: "WorkIn/FoodRecipe/Edit/:Id" },
        DeleteFoodRecipe: { name: "Delete Food Recipe", path: "WorkIn/FoodRecipe/Delete/:Id" }
    },
};
export default route;