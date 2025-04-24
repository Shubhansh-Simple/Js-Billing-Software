/* backend.js */

/*
 * FUNCTION IN THIS FILE
 *
 * - window.onload()
 * - selectedIcecream
 * - readIcecream
 * - addIcecream
 * - updateIcecream
 * - deleteIcecream
 * - removeAllIcecream
 * - resetBtnName
 */

// local
import icecreamData from "./icecreamData.js";
import { prepareTodayDate,
         prepareBillItemHTML,
         prepareEntireBillHTML,
         prepareIcecreamQuantityHTML,
         prepareSelectWidgetItemHTML,
         prepareRecordNotFoundHTML }  from "./utils.js";

import { isValidQuantity, isValidQuantityRadioObject, isValidIcecreamSelectObject } from "./validators.js";


// Global variable
var selected_icecream = '';


/////////////////////////////
// ON PAGE LOAD COMPLETELY //
/////////////////////////////
window.onload = function(){
  /*
   * Prepopulate imp section of webpage through JS once page loaded completely
   */

  // Prepare's today's date
  document.getElementById('todayDate').innerHTML = prepareTodayDate();

  // Updating the select widget items through JS
  document.getElementById('icecreamSelectWidgetId').innerHTML += prepareSelectWidgetItemHTML();

  // Read icecream record from localStorage
  readIcecream();
}


///////////////////////
// SELECTED ICECREAM //
///////////////////////
function selectedIcecream(icecream){
  /*
   * Retrieve the selected icecream from quantity radio button
   *
   * <option id="1" value="240">Large Vanilla Cup</option>"
   *   .id is 1
   *   .value is 240
   *   .text  is Large Vanilla Cup
   */
  selected_icecream = icecream;
}


///////////////////
// READ ICECREAM //
///////////////////
function readIcecream(){
  /* Read the icecream data from local storage and represent as a icecream bill*/

  let [icecreamEntries, totalling] = prepareEntireBillHTML();

  if (totalling == 0){ icecreamEntries = prepareRecordNotFoundHTML() }

  // Construct bill from localStorage if it's not empty
  document.getElementById('billItemsShowId').innerHTML = icecreamEntries;

  // Update bill icecream totalling
  document.getElementById('totallingShowId').innerHTML = prepareIcecreamQuantityHTML(totalling);

  // Setting total icecream quantity into the localStorage
  localStorage.setItem('totalling', totalling);
}


/////////////////////
// CREATE ICECREAM //
/////////////////////
function addIcecream(){
  /*
   * Add the icecream & it's quantity to the local storage and reflect changes to frontend
   * Handles already exists entry
   */

  console.log("You are calling addIcecream()");

  // ICECREAM QUANTITY INPUT
  const selected_quantity = document.querySelector('input[name="quantityRadioBtnId"]:checked');  // retrieve quantity object from quantity radio btn


  /* VALIDATE ICECREAM SELECT WIDGET INPUT */
  if ( !isValidIcecreamSelectObject(selected_icecream) ){
    alert('Invalid Input: Please select an valid icecream');

    // Exits the function, immediately
    return;
  }

  /* VALIDATE ICECREAM QUANTITY WIDGET INPUT */
  if ( !isValidQuantityRadioObject(selected_quantity) ){
    alert('Invalid Input: Please select an valid quantity');

    // Exits the function, immediately
    return;
  }

  let icecream_id      = selected_icecream.id;                                                   // retrieve id from selected icecream object
  let ordered_quantity = parseInt(selected_quantity.value);                                      // retrieve quantity from selected quantity object
  let totalling        = parseInt(localStorage.getItem('totalling'));                            // icecream totalling

  /*
   * NEWLY ADDED ICECREAM
   */
  if ( localStorage.getItem(icecream_id) === null ){

    if (totalling === 0){ document.getElementById('billItemsShowId').innerHTML = '' };           // Remove the 'Item Not Found' msg if freshly added 1st time

    const serial_number = localStorage.length;                                                   // count total entries (included totalling)

    // UPDATE LOCAL STORAGE - quantity
    localStorage.setItem(icecream_id, ordered_quantity);                                         // add icecream's quantity in local storage

    // UPDATE FRONT END - HTML
    document.getElementById('billItemsShowId').innerHTML += prepareBillItemHTML(serial_number,                         // APPEND
                                                                                icecream_id,
                                                                                selected_icecream.text,
                                                                                ordered_quantity);
  }

  /*
   * ICECREAM ALREADY EXISTS
   */
  else{
    let current_quantity = parseInt(localStorage.getItem(icecream_id));  // quantity that exists before newly ordered quantity
    let new_quantity     = current_quantity + ordered_quantity;          // total quantity after newly ordered

    // UPDATE LOCAL STORAGE - quantity
    localStorage.setItem(icecream_id, new_quantity);

    // UPDATE FRONT END - quantity
    document.getElementById(`quantityShowId_${icecream_id}`).innerHTML = prepareIcecreamQuantityHTML(new_quantity);    // ASSIGN
  }

  /*
   * FINALLY TOTALLING UPDATED IN LOCAL STORAGE & ON FRONTEND AS WELL
   */

  // UPDATE LOCAL STORAGE - totalling
  totalling += ordered_quantity;
  localStorage.setItem('totalling', totalling);

  // UPDATE FRONT END - totalling
  document.getElementById('totallingShowId').innerHTML = prepareIcecreamQuantityHTML(totalling);

  // Show success messsage of added icecream in button
  document.getElementById('msgSubmitId').innerHTML = 'Added!';
  window.onload = setTimeout( resetOrderBtnName, 2000 );
}


/////////////////////
// UPDATE ICECREAM //
/////////////////////
function updateIcecream(icecream_quantity_show_id){
  /*Update specific icecream quantity in localStorage and in frontend as well*/

  console.log('Updating icecream');

  const icecream_id  = icecream_quantity_show_id.split('_')[1];                                          // retrieve icecream's id from rows id
  let icecream_name  = icecreamData[icecream_id].name;                                                   // retrieve icecream's name from icecream's id

  // UPDATED QUANTITY INPUT
  const input_quantity              = prompt(`Please enter the new quantity for "${icecream_name}"`);  // taking quantity input from user
  let [updated_quantity, error_msg] = isValidQuantity(input_quantity);                                 // is this a valid integer quantity

  /* Input quantity is valid */
  if (error_msg === ''){

    // OLD COUNTING
    let old_totalling            = parseInt(localStorage.getItem('totalling'));
    let old_quantity             = parseInt(localStorage.getItem(icecream_id));

    const difference_in_quantity = updated_quantity - old_quantity;
    let final_totalling          = old_totalling + difference_in_quantity;                               // change in totalling

    // UPDATE FRONT END - quantity & totalling
    document.getElementById(icecream_quantity_show_id).innerHTML = prepareIcecreamQuantityHTML(updated_quantity);
    document.getElementById('totallingShowId').innerHTML         = prepareIcecreamQuantityHTML(final_totalling);

    // UPDATE LOCAL STORAGE - quantity & totalling
    localStorage.setItem(icecream_id, updated_quantity);
    localStorage.setItem('totalling', final_totalling);
  }

  /* Input quantity is invalid */
  else{ alert(error_msg); }
}


/////////////////////
// DELETE ICECREAM //
/////////////////////
function deleteIcecream(table_row_show_id){
  /*Delete specific icecream entry from localStorage and from frontend as well*/

  console.log('Deleting icecream');

  const icecream_id   = table_row_show_id.split('_')[1];         // retrieve icecream's id from row id
  const icecream_name = icecreamData[icecream_id].name;          // retrieve icecream name from data

  /* ARE YOU SURE TO PERFORM THIS ACTION ? */
  if (!confirm(`Are you really want to delete "${icecream_name}" record ?`)){ return; }

  let quantity  = parseInt(localStorage.getItem(icecream_id));   // quantity of deleted item
  let totalling = parseInt(localStorage.getItem('totalling'));   // total item we have
  totalling    -= quantity;                                      // decrement totalling from deleted quantity

  // UPDATE FRONT END
  document.getElementById('totallingShowId').innerHTML = prepareIcecreamQuantityHTML(totalling);
  document.getElementById(table_row_show_id).remove();           // delete specific row from bill table

  // UPDATE LOCAL STORAGE
  localStorage.removeItem(icecream_id);
  localStorage.setItem('totalling', totalling);

  // IF NO RECORD FOUND THEN DEFAULT MSG
  if (totalling == 0){
    document.getElementById('billItemsShowId').innerHTML = prepareRecordNotFoundHTML()       // clear all records from front end as well
  }
}


/////////////////////////
// REMOVE ALL ICECREAM //
/////////////////////////
function removeAllIcecream(){
  /*Remove all the icecreams from the local storage and clearn frontend entries as well*/

  console.log('Removing all icecreams from localStorage');

  /* ARE YOU SURE TO PERFORM THIS ACTION ? */
  if (!confirm(`Are you really want to delete all records ?`)){ return; }

  // UPDATE FRONT END
  document.getElementById('billItemsShowId').innerHTML = prepareRecordNotFoundHTML()       // clear all records from front end as well
  document.getElementById('totallingShowId').innerHTML = prepareIcecreamQuantityHTML(0);   // Set totalling to 0 ctn in bill

  // UPDATE LOCAL STORAGE
  localStorage.clear();                                                                    // delete entire data from local storage
  localStorage.setItem('totalling', 0);                                                    // set 'totalling' to it's initial value

  // Show success messsage of added icecream in button
  document.getElementById('msgResetId').innerHTML = 'Reset Successfully!';
  window.onload = setTimeout( resetResetBtnName, 2000 );
}


//////////////////////////
// RESET ORDER BTN NAME //
//////////////////////////
function resetOrderBtnName(){
  /*
   * Reset Button name to default
   */
  document.getElementById('msgSubmitId').innerHTML = 'Order Icecream';
}


//////////////////////////
// RESET RESET BTN NAME //
//////////////////////////
function resetResetBtnName(){
  /*
   * Reset Button name to default
   */
  document.getElementById('msgResetId').innerHTML = 'Reset Record';
}


/* MARK IT AS GLOBAL FUNCTION */
window.selectedIcecream  = selectedIcecream;
window.readIcecream      = readIcecream;
window.addIcecream       = addIcecream;
window.updateIcecream    = updateIcecream;
window.deleteIcecream    = deleteIcecream;
window.removeAllIcecream = removeAllIcecream;
window.resetOrderBtnName = resetOrderBtnName;
window.resetResetBtnName = resetResetBtnName;
