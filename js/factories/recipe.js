class RecipeFactory{
    constructor(data){
        this.id=data.id;
        this.name=data.name;
        this.servings=data.servings;
        this.ingredients=data.ingredients;
        this.time=data.time;
        this.description=data.description;
        this.appliance=data.appliance;
        this.ustensils=data.ustensils;
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getServings(){
        return this.servings;
    }

    getIngredients(){
        return this.ingredients;
    }

    getTime(){ 
        return this.time;
    }

    getDescription(){
        return this.description;
    }

    getAppliance(){
        return this.appliance;
    }

    getUstensils(){
        return this.ustensils;
    }

    getRecipeCardDOM(){
        const card=document.createElement("article");
        card.setAttribute("class","recipe-card col-12 col-md-6 col-xl-4");

        const img=document.createElement("div");
        img.setAttribute("class","recipe-card_img");
        card.appendChild(img);

        const textTopContainer=document.createElement("div");
        textTopContainer.setAttribute("class","recipe-card_top-text");
        card.appendChild(textTopContainer);
        
        const name=document.createElement("strong");
        name.setAttribute("class","recipe-card_name col-8");
        name.textContent=this.getName();
        textTopContainer.appendChild(name);
        
        const timeContainer=document.createElement("div");
        timeContainer.setAttribute("class","recipe-card_time-container col-3");
        textTopContainer.appendChild(timeContainer);

        const clockIcon=document.createElement("i");
        clockIcon.setAttribute("class","fa-regular fa-clock");
        timeContainer.appendChild(clockIcon);

        const time=document.createElement("strong");
        time.setAttribute("class","recipe-card_time");
        time.textContent=this.getTime()+" min";
        timeContainer.appendChild(time);
        
        const textBotContainer=document.createElement("div");
        textBotContainer.setAttribute("class","recipe-card_bottom-text");
        card.appendChild(textBotContainer);

        const textIngredients=document.createElement("div");
        textIngredients.setAttribute("class","recipe-card_ingredients col-6");
        this.getIngredients().forEach(ingredient => {
            const textIngredient=document.createElement("p");
            if(ingredient["unit"] !== undefined){
                textIngredient.innerHTML="<strong>"+ingredient["ingredient"]+": </strong>"+ingredient["quantity"]+" "+ingredient["unit"];
            }else if(ingredient["quantity"] !== undefined){
                textIngredient.innerHTML="<strong>"+ingredient["ingredient"]+": </strong>"+ingredient["quantity"];
            }else{
                textIngredient.innerHTML="<strong>"+ingredient["ingredient"];
            }
            textIngredients.append(textIngredient);
        })
        textBotContainer.appendChild(textIngredients);

        const description=document.createElement("p");
        description.setAttribute("class","recipe-card_description col-6");
        description.textContent=this.getDescription();
        textBotContainer.appendChild(description);
        
        return card;
    }
}