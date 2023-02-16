let currentRecipes=recipes;

//let stateRecipes=[];

const searchBar=document.querySelector("#search-bar-recipes");

function searchRecipes(recipes,input){
    let recipesSearched=[];
    input=input.toLowerCase();
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

function containsIngredients(ingredients,input){
    let contains=false;
    for(let ingredient of ingredients){
        if(ingredient.ingredient.toLowerCase().includes(input)){
            contains=true;
            break;
        }
    }
    return contains;
}

function searchByTag(recipes,tag){
    let recipesSearched=[];
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
