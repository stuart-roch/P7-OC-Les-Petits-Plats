function displayRecipes(recipes){
    const recipesSection=document.querySelector(".section-recipes .row");
    recipes.forEach(recipe => {
        const recipeModel=new RecipeFactory(recipe);
        recipesSection.appendChild(recipeModel.getRecipeCardDOM());
    })
}

async function init(){
    displayRecipes(recipes);
}

init();