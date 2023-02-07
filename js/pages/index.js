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
    recipes.forEach(recipe => arrayAppliances.push(recipe.appliance));
    arrayAppliances=[...new Set(arrayAppliances)];
    return arrayAppliances;
}

function getArrayAllUtensils(recipes){
    let arrayUtensils=[];
    recipes.forEach(recipe => arrayUtensils.push(...recipe.ustensils));
    arrayUtensils=[...new Set(arrayUtensils)];
    return arrayUtensils;
}

function displayFilterOptions(recipes){
    const allIngredients=getArrayAllIngredients(recipes);
    const allAppliances=getArrayAllAppliances(recipes);
    const allUtensils=getArrayAllUtensils(recipes);
    const optionsIngredientsContainer=document.querySelector(".filter-ingredient-container .filter-options-container ul ");
    const optionsAppliancesContainer=document.querySelector(".filter-appliance-container .filter-options-container ul");
    const optionsUtensilsContainer=document.querySelector(".filter-utensil-container .filter-options-container ul");

    allIngredients.forEach(ingredient => {
        const option=document.createElement("li");
        option.textContent=ingredient;
        optionsIngredientsContainer.appendChild(option);
    })

    allAppliances.forEach(appliance => {
        const option=document.createElement("li");
        option.textContent=appliance;
        optionsAppliancesContainer.appendChild(option);
    })
    
    allUtensils.forEach(utensil => {
        const option=document.createElement("li");
        option.textContent=utensil;
        optionsUtensilsContainer.appendChild(option);
    })

}

function expandOptions(){
    const inputFilterContainer=document.querySelectorAll(".input-container");
    inputFilterContainer.forEach(input => input.addEventListener("click",function(e){
        const optionContainer=input.nextElementSibling;
        optionContainer.classList.toggle("hidden");
        if(optionContainer.dataset.expanded === "true"){
            input.firstElementChild.placeholder="Ingrédients";
            input.lastElementChild.classList.replace("fa-chevron-up","fa-chevron-down");
            input.parentElement.classList.replace("col-7","col-3");
            input.parentElement.classList.add("col-lg-2");
            optionContainer.dataset.expanded="false";
        }else{
            input.firstElementChild.placeholder="Rechercher un "+input.firstElementChild.placeholder.toLowerCase();
            input.lastElementChild.classList.replace("fa-chevron-down","fa-chevron-up");
            input.parentElement.classList.replace("col-3","col-7");
            input.parentElement.classList.remove("col-lg-2");
            optionContainer.dataset.expanded="true";
        }
    }))
}

function init(){
    displayRecipes(recipes);
    displayFilterOptions(recipes);
    expandOptions();
}

init();