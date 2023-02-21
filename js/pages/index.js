/*
    Affiche les cartes recettes dans la section recettes
    param {Object[]}
*/
function displayRecipes(recipes){
    const recipesSection = document.querySelector(".section-recipes .row");
    recipesSection.innerHTML = "";
    recipes.forEach(recipe => {
        const recipeModel = new RecipeFactory(recipe);
        recipesSection.appendChild(recipeModel.getRecipeCardDOM());
    })
}

/*
    Retourne une liste d'ingrédients sans doublons compris dans toutes les recettes
    param {Object[]}
    return {String[]}
*/
function getArrayAllIngredients(recipes){
    let arrayIngredients = [];
    recipes.forEach(recipe => arrayIngredients.push(...recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())));
    arrayIngredients = [...new Set(arrayIngredients)];
    return arrayIngredients;
}

/*
    Retourne une liste d'appareils sans doublons compris dans toutes les recettes
    param {Object[]}
    return {String[]}
*/
function getArrayAllAppliances(recipes){
    let arrayAppliances = [];
    recipes.forEach(recipe => arrayAppliances.push(recipe.appliance.toLowerCase()));
    arrayAppliances = [...new Set(arrayAppliances)];
    return arrayAppliances;
}

/*
    Retourne une liste d'ustentils sans doublons compris dans toutes les recettes
    param {Object[]}
    return {String[]}
*/
function getArrayAllUtensils(recipes){
    let arrayUtensils = [];
    recipes.forEach(recipe => arrayUtensils.push(...recipe.ustensils.map(utensil => utensil.toLowerCase())));
    arrayUtensils = [...new Set(arrayUtensils)];
    return arrayUtensils;
}

/*
    Ajoute les options de filtres dans l'élément filter-option 
    de chaque type de filtre
    param {Object[]}
*/
function addFilterOptions(recipes){
    const allIngredients=getArrayAllIngredients(recipes);
    const allAppliances=getArrayAllAppliances(recipes);
    const allUtensils=getArrayAllUtensils(recipes);
    allAppliances.sort();
    allIngredients.sort();
    allUtensils.sort();
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

/*
    Ajoute un événement de click sur l'élément input-container 
    qui permet d'afficher/cacher les options de filtres
*/
function expandOptions(){
    const filterContainer=document.querySelector(".filter-container .row");
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
        }
        /*
        Ferme les options de filtres qui sont ouverts en dehors de celui sélectionnée
        */
        Array.from(filterContainer.children).forEach(child => {
            if(child !== input.parentElement && child.dataset.expanded === "true"){
                child.lastElementChild.classList.toggle("hidden");
                child.firstElementChild.lastElementChild.classList.replace("fa-chevron-up","fa-chevron-down");
                child.classList.replace("col-12","col-3");
                child.classList.replace("col-lg-7","col-lg-2");
                child.dataset.expanded="false";
            }
        })
    }))
}

/*
    Ajoute un événement de click sur chaque élément option-ingredient,
    option-appliance, option-utensil qui crée un tag dans l'élément
    filter-selected-container et affiche les recettes qui contiennent
    le tag choisi
*/
function addFilterTag(){
    const filterTagContainer=document.querySelector(".filter-selected-container ul");

    const options = [...document.querySelectorAll(".option-ingredient"),
    ...document.querySelectorAll(".option-appliance"),
    ...document.querySelectorAll(".option-utensil")];
    
    options.forEach(option => {
        option.addEventListener("click",function(){
            const optionSelectedContainer = document.createElement("li");
            const optionSelected = document.createElement("strong");
            optionSelectedContainer.className = option.className+"-selected"+" option-selected";
            optionSelected.textContent = option.textContent;
            const closeIcon = document.createElement("i");
            closeIcon.setAttribute("class","fa-regular fa-circle-xmark");
            removeFilterTag(closeIcon);
            filterTagContainer.append(optionSelectedContainer);
            optionSelectedContainer.append(optionSelected);
            optionSelectedContainer.append(closeIcon);
            currentRecipes = searchByTag(currentRecipes,option);
            displayRecipes(currentRecipes);
            addFilterOptions(currentRecipes);
            hideOptions();
            addFilterTag();
        })
    })
}

/*
    Ajoute un événement de click sur les buttons closes de chaque tag 
    qui permet le retrait du tag
    et affiche les recettes selon les tags restants et/ou selon l'entrée
    saisi par l'utilisateur sur la barre de recherche principale
*/
function removeFilterTag(closeIcon){
    const filterTagContainer = document.querySelector(".filter-selected-container ul");
    const searchBar = document.querySelector("#search-bar-recipes");
    closeIcon.addEventListener("click",function(){
        filterTagContainer.removeChild(closeIcon.parentNode);
        const optionsSelected = document.querySelectorAll(".option-selected");
        currentRecipes = searchRecipes(recipes,searchBar.value);
        currentRecipes = searchByTags(currentRecipes,optionsSelected);
        displayRecipes(currentRecipes);
        addFilterOptions(currentRecipes);
        hideOptions();
        addFilterTag();
    })
}

/*
    Cache les options qui ont été séléctionné comme tag    
*/
function hideOptions(){

    const options = [...document.querySelectorAll(".option-ingredient"),
    ...document.querySelectorAll(".option-appliance"),
    ...document.querySelectorAll(".option-utensil")];

    const optionsSelected = document.querySelectorAll(".option-selected");

    options.forEach(option => {
        optionsSelected.forEach(optionSelected => {
            if(option.textContent === optionSelected.textContent){
                option.parentElement.style.display = "none";
            }
        })
    })
}

/*
    Affiche les options de filtres selon l'entrée utilisateur
 */
function autoComplete(){
    const inputFilterContainers = document.querySelectorAll(".input-container");
    inputFilterContainers.forEach(inputFilterContainer => inputFilterContainer.firstElementChild.addEventListener("input",function(e){
        const optionContainer = inputFilterContainer.nextElementSibling.firstElementChild;
        Array.from(optionContainer.children).forEach(child => {
            if(!(child.firstElementChild.textContent.includes(e.target.value.toLowerCase()))){
                child.className = "hidden";
            }else{
                child.removeAttribute("class");
            }
        })
    }))
}

/*
    Initialise la page index.html
*/
function init(){
    displayRecipes(recipes);
    addFilterOptions(recipes);
    autoComplete();
    expandOptions();
    addFilterTag();
}

init();