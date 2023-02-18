import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let param = new URLSearchParams(search);
  // console.log(param.get("adventure"))


  // Place holder for functionality to work in the Stubs
  return param.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{

    let advend = await fetch(`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`);
    return await advend.json();
    
  }catch(e){
    return null;
  }
   // Place holder for functionality to work in the Stubs
  
}
// console.log(await fetchAdventureDetails("2447910730"));

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure);
 
  let adventureDetailHeading = document.getElementById("adventure-name");
  adventureDetailHeading.innerHTML = `${adventure.name}`
  let adventureDetailSubHeading = document.getElementById("adventure-subtitle");
  adventureDetailSubHeading.innerHTML = `${adventure.subtitle}`
  let photoGallery = document.getElementById("photo-gallery")
  // let mainDiv = document.createElement("div")
  // mainDiv.setAttribute("id","carouselExampleIndicators")
  // mainDiv.setAttribute("class","carousel slide")
  // mainDiv.setAttribute("data-bs-ride","carousel")
  let innerCarousel = document.createElement("div")
  innerCarousel.setAttribute("class","carousel-inner")
  function addImage(image){
    let imageDiv = document.createElement("div");
    
    let imageElem = document.createElement("img");
    imageElem.setAttribute("class","activity-card-image d-block w-100 ");
    imageElem.setAttribute("src",image);
    imageDiv.append(imageElem);
    innerCarousel.append(imageDiv)
  }
  // let indicatorDiv = document.createElement("div")
  
  // indicatorDiv.setAttribute("class","carousel-indicators")
  let mainDiv = document.createElement("div")
  mainDiv.setAttribute("id","carouselExampleIndicators")
  mainDiv.setAttribute("class","carousel slide")
  mainDiv.setAttribute("data-bs-ride","carousel")
  mainDiv.append(innerCarousel)
  photoGallery.append(mainDiv)
  adventure.images.forEach( (v) => {
    addImage(v);
  })
  let adventureContent = document.getElementById("adventure-content");
  adventureContent.innerHTML = `${adventure.content}`

  
  
  

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let imageHTML = images.map((image, idx) => `<div class="carousel-item ${idx==0 && 'active'}">
  <img src="${image}" class="activity-card-image d-block w-100" alt="..."></div>`)
 
let photoGallery = document.getElementById("photo-gallery")
photoGallery.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner">
${imageHTML}
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOut = document.getElementById("reservation-panel-sold-out")
  let form = document.getElementById("reservation-panel-available")
  let cph = document.getElementById("reservation-person-cost");
  if(adventure.available){
    form.style.display = "block";
    soldOut.style.display = "none";
    cph.innerHTML = `${adventure.costPerHead}`;
  }else{
    form.style.display = "none";
    soldOut.style.display = "block";
  }
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = document.getElementById("reservation-cost")
  totalCost.innerHTML = `${adventure.costPerHead * persons}`

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let data = {
    name:"",
    date:"", 
    person:"", 
    adventure:"",

  }
  data.adventure = adventure.id
  let a = document.getElementsByClassName("form-control")
  let submit = document.getElementById("myForm");
  a[0].addEventListener("input",(e)=>{
    data.name = e.target.value;
  })
  a[1].addEventListener("input",(e)=>{
    data.date = e.target.value;
  })
  a[2].addEventListener("input",(e)=>{
    data.person = e.target.value;
    console.log(data)
  })
  submit.addEventListener("submit",(e)=>{
    e.preventDefault();
    fetch(`${config.backendEndpoint}/reservations/new/`,{
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json"
      },
    }).then((r)=>{
      if (r.ok){
        alert("Success!");
        location.reload();
      }else{
        alert("Failure!");
      }
    })
    
  })
  
  
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let banner = document.getElementById("reserved-banner");
  if(!adventure.reserved){
    banner.style.display = "none"
  }else{
    banner.style.display = "block"
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
