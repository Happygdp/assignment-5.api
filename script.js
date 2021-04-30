
const button = document.getElementById("search");

button.addEventListener("click", () => {
    const inputData = document.getElementById("inputData").value;
    if(inputData === ""){
        document.getElementById("container-main").innerHTML = `<h1 class="notFoundmsg">Nothing Found</h1>`
    }else{
        document.getElementById("contanair").innerHTML = "";
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`)
    .then(res => res.json())
    .then(data => {
        
        if(data.meals === null){
            document.getElementById("container-main").innerHTML = `<h1 class="notFoundmsg">Nothing Found</h1>`;
        }else{
                allFoods(data)
        }

        document.getElementById("inputData").value = "";
        })
    }
} )

    const allFoods = (data)=>{
        const parentDiv = document.getElementById("contanair")
        const foodArray = data.meals;
        foodArray.forEach((items) => {
            const idMeal = items.idMeal;
            const foodName = items.strMeal;
            const img = items.strMealThumb;
            const childDiv = document.createElement("div");
            childDiv.className = 'food'
            childDiv.innerHTML = `
            
            
            <a  href = "#" onclick = "foodDetails('${idMeal}')"><img src = "${img}"> </a>
            <a  href = "#" onclick = "foodDetails('${idMeal}')"><h1 class="foodName">${foodName}</h1> </a>
            
            `
            parentDiv.appendChild(childDiv);
            
        });
        

    }
    

    const foodDetails = (id) =>{
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
           
            document.getElementById("foodDetails").style.display = "block";
            const foodItem = data.meals[0];
            const foodName = foodItem.strMeal;
            const foodImage = foodItem.strMealThumb;
            const strIngredient1 = foodItem.strIngredient1;
            const strIngredient2 = foodItem.strIngredient2;
            const strIngredient3 = foodItem.strIngredient3;
            const strIngredient4 = foodItem.strIngredient4;
            const strIngredient5 = foodItem.strIngredient5;
            
            document.getElementById("foodDetails").innerHTML = `
            <img src = "${foodImage}" alt = "" height = "200" width="100%">
            <h3>${foodName}</h3>
            <h5>Ingredients: </h5>
            <ul>
                
                <li>${strIngredient1}</li>
                <li>${strIngredient2}</li>
                <li>${strIngredient3}</li>
                <li>${strIngredient4}</li>
                <li>${strIngredient5}</li>
            </ul>
            `
           
        
        
        })
    }