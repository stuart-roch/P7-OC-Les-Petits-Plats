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
    let recipesSearched = [];
    input = input.toLowerCase();
    for (let recipe of recipes){
        if(recipe.name.toLowerCase().includes(input)){
            recipesSearched.push(recipe);
        }else if(containsIngredients(recipe.ingredients,input)){
            recipesSearched.push(recipe);
        }else if(recipe.description.toLowerCase().includes(input)){
            recipesSearched.push(recipe);
        }
    }
    return recipesSearched;
}

/*
    Vérifie que l'un des ingrédients contient l'entrée utilisateur
    params {Object[],String}
    return {boolean}
*/
function containsIngredients(ingredients,input){
    let contains = false;
    for(let ingredient of ingredients){
        if(ingredient.ingredient.toLowerCase().includes(input)){
            contains = true;
            break;
        }
    }
    return contains;
}

/*
    Retourne une liste de recettes dont les recettes contiennent l'ingrédient,
    l'appareil ou l'ustensil selon le tag
    params {Object[],String}
    return {Object[]}
*/
function searchByTag(recipes,tag){
    let recipesSearched = [];
    if(tag.className.includes("ingredient")){
        for(let recipe of recipes){
            for(let ingredient of recipe.ingredients){
                if(ingredient.ingredient.toLowerCase() === tag.textContent){
                    recipesSearched.push(recipe);
                }
            }
        }
    }
    if(tag.className.includes("appliance")){
        for(let recipe of recipes){
            if(recipe.appliance.toLowerCase() === tag.textContent){
                recipesSearched.push(recipe);
            }
        }
    }
    if(tag.className.includes("utensil")){
        for(let recipe of recipes){
            for(let ustensil of recipe.ustensils){
                if(ustensil.toLowerCase() === tag.textContent){
                    recipesSearched.push(recipe);
                }
            }
        }
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
    tags.forEach(tag => recipesSearched = searchByTag(recipesSearched,tag));
    return recipesSearched;
}

/*
    Evenement de recherche des recettes selon l'entrée utilisateur
    dans la barre de recherche principal
*/
searchBar.addEventListener("input",function(e){
    const optionSelected = document.querySelectorAll(".option-selected");
    const filterContainer = document.querySelector(".filter-container .row")
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
        currentRecipes = searchRecipes(recipes,searchBar.value);
        if(optionSelected.length !== 0){
            currentRecipes = searchByTags(currentRecipes,optionSelected);
        }
        if(currentRecipes !== undefined){
            displayRecipes(currentRecipes);
            addFilterOptions(currentRecipes);
            addFilterTag();
        }
    }else{
        if(optionSelected.length !== 0){
            currentRecipes = searchByTags(recipes,optionSelected);
        }else{
            currentRecipes = recipes;
        }
        displayRecipes(currentRecipes);
        addFilterOptions(currentRecipes);
        addFilterTag();
    }
})
