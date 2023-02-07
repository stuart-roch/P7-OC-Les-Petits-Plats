function displayRecipes(recipes){
    const recipesSection=document.querySelector(".section-recipes .row");
    recipes.forEach(recipe => {
        const recipeModel=new RecipeFactory(recipe);
        recipesSection.appendChild(recipeModel.getRecipeCardDOM());
    })
}

function getArrayAllIngredients(recipes){
    let arrayIngredients=[];
    recipes.forEach(recipe => arrayIngredients.push(...recipe.ingredients.map(ingredient => ingredient.ingredient)));
    arrayIngredients=[...new Set(arrayIngredients)];
    return arrayIngredients;
}

function getArrayAllAppliances(recipes){
    let arrayAppliances=[];
    recipes.forEach(recipe => arrayIngredients.push(recipe.appliance));
    arrayAppliances=[...new Set(arrayAppliances)];
    return arrayAppliances;
}

function getArrayAllUtensils(recipes){
    let arrayUtensils=[];
    recipes.forEach(recipe => arrayIngredients.push(...recipe.ustensils));
    arrayUtensils=[...new Set(arrayUtensils)];
    return arrayUtensils;
}
function displayFilterOptions(recipes){
    
}

function init(){
    displayRecipes(recipes);
}

init();