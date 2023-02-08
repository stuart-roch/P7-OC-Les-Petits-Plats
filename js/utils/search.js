const searchBar=document.querySelector("#search-bar-recipes");
const recipesSection=document.querySelector(".section-recipes .row");

function searchRecipes(recipes,input){
    input=input.toLowerCase();
    recipesSearched=recipes.filter(recipe => recipe.name.toLowerCase().includes(input) || containsIngredients(recipe.ingredients,input) || recipe.description.toLowerCase().includes(input));
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

searchBar.addEventListener("input",function(e){
    if(searchBar.value.length >=3){
        const searchedRecipes=searchRecipes(recipes,searchBar.value);
        if(searchedRecipes !== undefined){
            recipesSection.innerHTML="";
            displayRecipes(searchedRecipes);
        }
    }else{
        recipesSection.innerHTML="";
        displayRecipes(recipes);
    }
})
