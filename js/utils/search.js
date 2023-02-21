//Recettes affichées sur la page index.html
let currentRecipes = recipes;

// DOM Elements
const searchBar = document.querySelector("#search-bar-recipes");

/*
    Retourne une liste de recettes dont les recettes contiennent l'entrée utilisateur
    dans leurs nom, description ou dans l'un des ses ingrédients 
    params {Object[],String}
    return {Object[]}
*/
function searchRecipes(recipes,input){
    input = input.toLowerCase();
    const recipesSearched = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(input) 
        || containsIngredients(recipe.ingredients,input) 
        || recipe.description.toLowerCase().includes(input));
    return recipesSearched;
}

/*
    Vérifie que l'un des ingrédients contient l'entrée utilisateur
    params {Object[],String}
    return {boolean}
*/
function containsIngredients(ingredients,input){
    let contains = false;
    ingredients.forEach(ingredient => {
        if(contains){
            contains = true;
        }else{
            contains = ingredient.ingredient.toLowerCase().includes(input);
        }
    });
    return contains;
}

/*
    Vérifie que l'un des ingrédients est égale à l'entrée utilisateur
    params {Object[],String}
    return {boolean}
*/
function containsStrictIngredients(ingredients,input){
    let contains = false;
    ingredients.forEach(ingredient => {
        if(ingredient.ingredient.toLowerCase() === input){
            contains = true;
        }
    });
    return contains;
}

/*
    Retourne une liste de recettes dont les recettes contiennent l'ingrédient,
    l'appareil ou l'ustensil selon le tag
    params {Object[],String}
    return {Object[]}
*/
function searchByTag(recipes,tag){
    let recipesSearched;
    if(tag.className.includes("ingredient")){
        recipesSearched = recipes.filter(recipe => containsStrictIngredients(recipe.ingredients,tag.textContent));
    }
    if(tag.className.includes("appliance")){
        recipesSearched = recipes.filter(recipe => recipe.appliance.toLowerCase() === tag.textContent);
    }
    if(tag.className.includes("utensil")){
        recipesSearched = recipes.filter(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()).includes(tag.textContent));
    }
    return recipesSearched;
}

/*
    Retourne une liste de recettes dont les recettes contiennent l'ingrédient,
    l'appareil ou l'ustensil selon plusieurs tags
    params {Object[],String[]}
    return {Object[]}
*/
function searchByTags(recipes,tags){
    let recipesSearched = recipes;
    tags.forEach(tag => recipesSearched=searchByTag(recipesSearched,tag));
    return recipesSearched;
}

/*
    Evenement de recherche des recettes selon l'entrée utilisateur
    dans la barre de recherche principal
*/
searchBar.addEventListener("input",function(e){
    const optionSelected=document.querySelectorAll(".option-selected");
    const filterContainer=document.querySelector(".filter-container .row");
    /*
    Ferme les options de filtres qui sont ouverts lors de la saisie
    dans la barre de recherche principal
    */
    Array.from(filterContainer.children).forEach(child => {
        if(child.dataset.expanded === "true"){
            child.lastElementChild.classList.toggle("hidden");
            child.firstElementChild.firstElementChild.value="";   
            child.firstElementChild.lastElementChild.classList.replace("fa-chevron-up","fa-chevron-down");
            child.classList.replace("col-12","col-3");
            child.classList.replace("col-lg-7","col-lg-2");
            child.dataset.expanded="false";
        }
    })
    if(searchBar.value.length >= 3){
        currentRecipes=searchRecipes(recipes,searchBar.value);
        if(optionSelected.length !== 0){
            currentRecipes=searchByTags(currentRecipes,optionSelected);
        }
        if(currentRecipes !== undefined){
            displayRecipes(currentRecipes);
            displayFilterOptions(currentRecipes);
            addFilterTag();
        }
    }else{
        if(optionSelected.length !== 0){
            currentRecipes=searchByTags(recipes,optionSelected);
        }else{
            currentRecipes=recipes;
        }
        displayRecipes(currentRecipes);
        displayFilterOptions(currentRecipes);
        addFilterTag();
    }
})
