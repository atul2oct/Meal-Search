// its fetch meals from api and return it
async function fetchMealsFromApi(url,value) {
    const response=await fetch(`${url+value}`);
    const meals=await response.json();
    return meals;
}



// its show's all meals card in main acording to search input value
function showMealList(){
    let inputValue = document.getElementById("my-search").value;
    let arr=JSON.parse(localStorage.getItem("favouritesList"));
    let url="https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let html = "";
    let meals=fetchMealsFromApi(url,inputValue);
    meals.then(data=>{
        if (data.meals) {
            data.meals.forEach((element) => {
                let isFav=false;
                for (let index = 0; index < arr.length; index++) {
                    if(arr[index]==element.idMeal){
                        isFav=true;
                    }
                }
                if (isFav) {
                    html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn-pink" onclick="showMealDetails(${element.idMeal})">More Details</button>
                            <button id="main${element.idMeal}" class="btn btn-outline-secondary active" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
                } else {
                    html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn-pink" onclick="showMealDetails(${element.idMeal})">More Details</button>
                            <button id="main${element.idMeal}" class="btn btn-outline-secondary" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
                }  
            });
        } else {
            html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                The meal you are looking for was not found.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        document.getElementById("main").innerHTML = html;
    });
}

