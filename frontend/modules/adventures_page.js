
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  return params.get("city");
}
//Implementation of fetch call with a paramterized input based on city

async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let adven = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    return adven.json();
  }catch(e){
    return null;
  }
  
  

}
// console.log( await fetchAdventures("goa"));


//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  function add(id,name,cph,currency,image,duration,category){
    let elemData = document.getElementById("data");
    let divCol = document.createElement("div");
    divCol.setAttribute("class","col-sm-6 col-lg-3 mb-5")
    let divCard = document.createElement("div");
    divCard.setAttribute("class","card activity-card")
    let link = document.createElement("a")
    link.setAttribute("href",`detail/?adventure=${id}`);
    link.setAttribute("id",id);
    let elemImg = document.createElement("img");
    elemImg.setAttribute("src",image);
    elemImg.setAttribute("class","card-img-top activity-card img")
    let divBan = document.createElement("div");
    divBan.setAttribute("class","category-banner px-0 mx-0")
    divBan.innerText = `${category}`;
    let divCon1 = document.createElement("div");
    divCon1.setAttribute("class","card-body text-center d-flex justify-content-between w-100");
    divCon1.innerHTML = `<h5 class="card-title">${name}</h5>
                          <p class="card-text">₹${cph}</p>`
    let divCon2 = document.createElement("div");
    divCon2.setAttribute("class","card-body text-center d-flex justify-content-between w-100");
    divCon2.innerHTML = `<h5 class="card-title">Duration</h5>
                          <p class="card-text">${duration} hours</p>`
    


    
    
    link.append(divCard)
    elemData.append(divCol)
    divCol.append(link)
    divCard.append(elemImg,divBan,divCon1,divCon2)
    
  }
 
  adventures.forEach((i) => {
    add(i.id, i.name, i.costPerHead, i.currency, i.image, i.duration, i.category);
  });
 
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let a = list.filter( (e) => {
    if(e.duration >= low && e.duration <= high){
      return e.duration
    }
  })

  return a;
  

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let listt = [];
  for(let i = 0 ; i<categoryList.length ; i++){
    let a = list.filter( e => e.category == categoryList[i])
    a.forEach( v => listt.push(v))
  }
  
  return listt
  
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let fbc = filterByCategory(list,filters.category);
  
  
  let durationText = filters.duration;
  let durationText1 = durationText.split("-");
  let finalDText = durationText1.map( v => parseInt(v))
  let fbd = filterByDuration(list, finalDText[0], finalDText[1])
  // console.log(fbc)
  // console.log(fbd)
  if (filters.category.length > 0 && filters.duration == ""){
    return fbc
  }
  else if (filters.duration != "" && filters.category.length == 0){
    return fbd
  }else if(filters.category.length > 0 && filters.duration != ""){
    let combineList = []
    fbc.forEach(i => combineList.push(i));
    let finalCombineList = combineList.filter( (e) => {
      if(e.duration >= finalDText[0] && e.duration <= finalDText[1]){
        return e.duration
      }
    })
    // console.log(finalCombineList)
    return finalCombineList;
  }
  else{
    return list
  }
  
  




  // Place holder for functionality to work in the Stubs
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters))


  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let a = JSON.parse(localStorage.getItem("filters"));
  


  // Place holder for functionality to work in the Stubs
  return a;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let pillNameList = filters.category
  function addPill(pillName){
    let domS = document.getElementById("category-list");
    let div = document.createElement("div");
    div.setAttribute("class","category-filter")
    div.innerText = `${pillName}`
    domS.append(div)
  }
  pillNameList.forEach( e => addPill(e));
  
  
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
