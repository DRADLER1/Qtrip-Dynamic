import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let reservation = await fetch(`${config.backendEndpoint}/reservations/`);

    return await reservation.json();
  }catch(e){
    return null;
  }

  // Place holder for functionality to work in the Stubs
 
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let banner = document.getElementById("no-reservation-banner")
  let tableShow = document.getElementById("reservation-table-parent")
  if(reservations.length == 0){
    banner.style.display = "block";
    tableShow.style.display = "none";
    
  }else{
    banner.style.display = "none";
    tableShow.style.display = "block";

  }
  let tableBod = document.getElementById("reservation-table");
  console.log(tableBod)


  //Conditionally render the no-reservation-banner and reservation-table-parent
  const options = {year: 'numeric', month: 'long', day: 'numeric', hour:"numeric" , minute:"numeric", second : "numeric"};
  function tableInput(Bid,Bname,adventureName,person,date,price,Btime,adventure){
    let dateT = new Date(date);
    let time = new Date(Btime)
    let tableBody = document.getElementById("reservation-table");
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `
    <td>${Bid}</td>
    <td>${Bname}</td>
    <td>${adventureName}</td>
    <td>${person}</td>
    <td>${dateT.toLocaleDateString("en-IN")}</td>
    <td>${price}</td>
    <td>${time.toLocaleString("en-IN",options)}</td>
    <td><div class="reservation-visit-button" id=${Bid                 }><a href="/frontend/pages/adventures/detail/?adventure=${adventure}">Visit Adventure</a></div></td>
    `
    
    tableBody.append(tableRow);
  }
  reservations.forEach( v => tableInput(v.id,v.name,v.adventureName,v.person,v.date,v.price,v.time,v.adventure) )
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
