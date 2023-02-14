function displayRecipes(recipes){
    const recipesSection=document.querySelector(".section-recipes .row");
    recipesSection.innerHTML="";
    recipes.forEach(recipe => {
        const recipeModel=new RecipeFactory(recipe);
        recipesSection.appendChild(recipeModel.getRecipeCardDOM());
    })
}

function getArrayAllIngredients(recipes){
    let arrayIngredients=[];
    recipes.forEach(recipe => arrayIngredients.push(...recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())));
    arrayIngredients=[...new Set(arrayIngredients)];
    return arrayIngredients;
}

function getArrayAllAppliances(recipes){
    let arrayAppliances=[];
    recipes.forEach(recipe => arrayAppliances.push(recipe.appliance.toLowerCase()));
    arrayAppliances=[...new Set(arrayAppliances)];
    return arrayAppliances;
}

function getArrayAllUtensils(recipes){
    let arrayUtensils=[];
    recipes.forEach(recipe => arrayUtensils.push(...recipe.ustensils.map(utensil => utensil.toLowerCase())));
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

    optionsAppliancesContainer.innerHTML="";
    optionsIngredientsContainer.innerHTML="";
    optionsUtensilsContainer.innerHTML="";

    allIngredients.forEach(ingredient => {
        const optionContainer=document.createElement("li");
        const option=document.createElement("p");
        option.setAttribute("class","option-ingredient");
        option.textContent=ingredient;
        optionsIngredientsContainer.appendChild(optionContainer);
        optionContainer.appendChild(option);
    })

    allAppliances.forEach(appliance => {
        const optionContainer=document.createElement("li");
        const option=document.createElement("p");
        option.setAttribute("class","option-appliance");
        option.textContent=appliance;
        optionsAppliancesContainer.appendChild(optionContainer);
        optionContainer.appendChild(option);
    })
    
    allUtensils.forEach(utensil => {
        const optionContainer=document.createElement("li");
        const option=document.createElement("p");
        option.setAttribute("class","option-utensil");
        option.textContent=utensil;
        optionsUtensilsContainer.appendChild(optionContainer);
        optionContainer.appendChild(option);
    })

}

function expandOptions(){
    const inputFilterContainer=document.querySelectorAll(".input-container");
    inputFilterContainer.forEach(input => input.addEventListener("click",function(e){
        const optionContainer=input.nextElementSibling;
        optionContainer.classList.toggle("hidden");
        if(input.parentElement.dataset.expanded === "true"){
            input.lastElementChild.classList.replace("fa-chevron-up","fa-chevron-down");
            input.parentElement.classList.replace("col-12","col-3");
            input.parentElement.classList.replace("col-lg-7","col-lg-2");
            input.parentElement.dataset.expanded="false";
        }else{
            input.lastElementChild.classList.replace("fa-chevron-down","fa-chevron-up");
            input.parentElement.classList.replace("col-3","col-12");
            input.parentElement.classList.replace("col-lg-2","col-lg-7");
            input.parentElement.dataset.expanded="true";
            input.firstElementChild.focus();
        }
    }))
}

function addFilterTag(){
    const filterTagContainer=document.querySelector(".filter-selected-container ul");

    const options = [...document.querySelectorAll(".option-ingredient"),
    ...document.querySelectorAll(".option-appliance"),
    ...document.querySelectorAll(".option-utensil")];
    
    options.forEach(option => {
        option.addEventListener("click",function(e){
            const optionSelectedContainer=document.createElement("li");
            const optionSelected=document.createElement("strong");
            optionSelectedContainer.className=option.className+"-selected"+" option-selected";
            optionSelected.textContent=option.textContent;
            const closeIcon=document.createElement("i");
            closeIcon.setAttribute("class","fa-regular fa-circle-xmark");
            removeFilterTag(closeIcon);
            filterTagContainer.append(optionSelectedContainer);
            optionSelectedContainer.append(optionSelected)
            optionSelectedContainer.append(closeIcon);
            //stateRecipes.push({tag:option,previousRecipes:currentRecipes});
            currentRecipes=searchByTag(currentRecipes,option);
            displayRecipes(currentRecipes);
            displayFilterOptions(currentRecipes);
            addFilterTag();
        })
    })
}

function removeFilterTag(closeIcon){
    const filterTagContainer=document.querySelector(".filter-selected-container ul");
    const optionSelected=document.querySelectorAll(".option-selected");
    const searchBar=document.querySelector("#search-bar-recipes");
    closeIcon.addEventListener("click",function(e){
        filterTagContainer.removeChild(closeIcon.parentNode);
        //currentRecipes=stateRecipes.filter(state => state.tag.textContent === tag.textContent)[0].previousRecipes;
        currentRecipes=searchRecipes(recipes,searchBar.value);
        currentRecipes=searchByTags(recipes,optionSelected);
        console.log(currentRecipes);
        displayRecipes(currentRecipes);
        displayFilterOptions(currentRecipes);
        addFilterTag();
    })
}

function init(){
    displayRecipes(recipes);
    displayFilterOptions(recipes);
    expandOptions();
    addFilterTag();
}

init();