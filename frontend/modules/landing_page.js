import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("From init()");
  console.log(`${config.backendEndpoint}/cities`);
  console.log(cities)
  

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let city = await fetch(`${config.backendEndpoint}/cities`);
  return city.json();}
  catch(e){
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let domContent = document.getElementById("data");
  let elemId = document.createElement("div");
  elemId.setAttribute("id",id);
  elemId.setAttribute("class","col-sm-6 col-lg-3 mb-5");
  let elemId2 = document.createElement("div");
  elemId2.setAttribute("class","tile-text text-white text-center");

  let elemTile = document.createElement("div");
  elemTile.setAttribute("class","tile")

  let link = document.createElement("a");
  link.setAttribute("href",`pages/adventures/?city=${id}`)
  
  let elemCity = document.createElement("h5");
  elemCity.setAttribute("class","card-title");
  elemCity.innerText = `${city}`;
  let elemDesc = document.createElement("p");
  elemDesc.innerText = `${description}`;
  let elemImg = document.createElement("img");
  elemImg.setAttribute("src",image);
  link.append(elemTile);
  elemId2.append(elemCity,elemDesc);
  elemTile.append(elemId2,elemImg)
  elemId.append(link);
  domContent.append(elemId)

}

export { init, fetchCities, addCityToDOM };
