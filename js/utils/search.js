let currentRecipes=recipes;

//let stateRecipes=[];

const searchBar=document.querySelector("#search-bar-recipes");

function searchRecipes(recipes,input){
    input=input.toLowerCase();
    const recipesSearched=recipes.filter(recipe => recipe.name.toLowerCase().includes(input) || containsIngredients(recipe.ingredients,input) || recipe.description.toLowerCase().includes(input));
    return recipesSearched;
}

function containsIngredients(ingredients,input){
    let contains=false;
    ingredients.forEach(ingredient => {
        if(contains){
            contains=true;
        }else{
            contains=ingredient.ingredient.toLowerCase().includes(input);
            //console.log(ingredient.ingredient,contains,input);
        }
    });
    return contains;
}

function containsStrictIngredients(ingredients,input){
    let contains=false;
    ingredients.forEach(ingredient => {
        if(ingredient.ingredient.toLowerCase() === input){
            contains=true;
        }
    });
    return contains;
}

function searchByTag(recipes,tag){
    let recipesSearched;
    if(tag.className.includes("ingredient")){
        recipesSearched=recipes.filter(recipe => containsStrictIngredients(recipe.ingredients,tag.textContent));
    }
    if(tag.className.includes("appliance")){
        recipesSearched=recipes.filter(recipe => recipe.appliance.toLowerCase() === tag.textContent);
    }
    if(tag.className.includes("utensil")){
        recipesSearched=recipes.filter(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()).includes(tag.textContent));
    }
    return recipesSearched;
}

function searchByTags(recipes,tags){
    let recipesSearched=recipes;
    tags.forEach(tag => recipesSearched=searchByTag(recipesSearched,tag));
    return recipesSearched;
}

searchBar.addEventListener("input",function(e){
    const optionSelected=document.querySelectorAll(".option-selected");
    if(searchBar.value.length >=3){
        currentRecipes=searchRecipes(recipes,searchBar.value);
        if(optionSelected.length !== 0){
            currentRecipes=searchByTags(currentRecipes,optionSelected);
        }
        if(currentRecipes !== undefined){
            displayRecipes(currentRecipes);
            displayFilterOptions(currentRecipes);
            addFilterTag();
            //console.log(currentRecipes);
        }
    }else{
        if(optionSelected.length !== 0){
            currentRecipes=searchByTags(recipes,optionSelected);
        }else{
            currentRecipes=recipes;
        }
        //currentRecipes=recipes;
        displayRecipes(currentRecipes);
        displayFilterOptions(currentRecipes);
        addFilterTag();
    }
})
