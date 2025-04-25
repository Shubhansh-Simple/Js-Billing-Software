/* backend.js */

/*
 * FUNCTION IN THIS FILE
 *
 * - window.onload()
 * - invoiceNumberInput
 * - selectedIcecream
 * - readIcecream
 * - addIcecream
 * - updateIcecream
 * - deleteIcecream
 * - removeAllIcecream
 * - resetOrderBtnName
 * - resetResetBtnName
 */

// local
import {icecreamData} from "./icecreamData.js";
import { 
         updateInnerHTML,
         prepareBillItemHTML,
         prepareEntireBillHTML,
         prepareSelectWidgetItemHTML,
         prepareRecordNotFoundHTML }  from "./utils.js";

import { isValidQuantity,
         isValidQuantityRadioObject,
         isValidIcecreamSelectObject } from "./validators.js";

import { getTodaysDate,
         getCalculatedAmount, 
         getDiscountAndFinalAmount } from "./helpers.js";


// Global variable
var selected_icecream = '';


/////////////////////////////
// ON PAGE LOAD COMPLETELY //
/////////////////////////////
window.onload = function(){
  /*
   * Prepopulate imp section of webpage through JS once page loaded completely
   */

  /*
   * UPDATING FRONT END
   */
  updateInnerHTML('todaysDateShowId', null, getTodaysDate());                                          // update today's date
  document.getElementById('icecreamSelectWidgetId').innerHTML += prepareSelectWidgetItemHTML();      // append selected widget items

  // Read icecream record from localStorage
  readIcecream();
}


//////////////////////////
// INVOICE NUMBER INPUT //
//////////////////////////
function invoiceNumberInput(){
  /* Update the invoice number in existing bill with absolutely no validation */

  const invoice_number = prompt('Please enter your invoice number here - ')
  updateInnerHTML('invoiceShowId', null, invoice_number);
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

  let [icecreamEntries, totalling, sub_total] = prepareEntireBillHTML();

  if (totalling == 0){ icecreamEntries = prepareRecordNotFoundHTML() }

  /* Recalculate discount & final_amount from sub_total */
  let [discount_amount, final_amount] = getDiscountAndFinalAmount(sub_total);

  /*
   * UPDATING FRONT END
   */
  updateInnerHTML('billItemsShowId', null, icecreamEntries);    // Construct bill from localStorage if it's not empty
  updateInnerHTML('totallingShowId', 'quantity', totalling);    // item boxes total counting
  updateInnerHTML('subTotalShowId', 'amount', sub_total);        // sub total amount
  updateInnerHTML('discountShowId', 'amount', discount_amount);  // discount amount
  updateInnerHTML('totalShowId', 'amount', final_amount);        // final amount ( 22% + 5% less )

  /*
   * UPDATING LOCAL STORAGE
   */

  // Setting total icecream quantity into the localStorage
  localStorage.setItem('totalling', totalling);

  // Setting sub total amount into the localStorage
  localStorage.setItem('sub_total', sub_total);
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


  if ( !isValidIcecreamSelectObject(selected_icecream) ){                                        // validate selection else exit!
    alert('Invalid Input: Please select an valid icecream or refresh the page');
    return;
  }

  if ( !isValidQuantityRadioObject(selected_quantity) ){
    alert('Invalid Input: Please select an valid quantity or refresh the page');                 // validate quantity else exit!
    return;
  }

  let icecream_id      = selected_icecream.id;                                                   // retrieve id from selected icecream object
  let ordered_quantity = parseInt(selected_quantity.value);                                      // retrieve quantity from selected quantity object
  let totalling        = parseInt(localStorage.getItem('totalling'));                            // icecream box counting
  let change_in_amount = 0;                                                                      // storing single unit amount
  let sub_total        = parseFloat(localStorage.getItem('sub_total'));                          // total amount with 22% discount

  /*
   * NEWLY ADDED ICECREAM
   */
  if ( localStorage.getItem(icecream_id) === null ){

    if (totalling === 0){ updateInnerHTML('billItemsShowId', null, '') };                        // Remove the 'Item Not Found' msg if fresh application page

    const serial_number = localStorage.length - 1;                                               // count total entries ( handle totalling, sub_total )

    // UPDATE LOCAL STORAGE - quantity
    localStorage.setItem(icecream_id, ordered_quantity);                                         // add icecream's quantity in local storage

    let [ billItem, amount ] = prepareBillItemHTML(serial_number,                                // APPEND TABLE'S ROW & returns icecream's amount ( 22 % less )
                                                   icecream_id,
                                                   selected_icecream.text,                       // icecream's name
                                                   selected_icecream.value,                      // icecream's price
                                                   ordered_quantity);
    /* Amount Of Single Item */
    change_in_amount = Number(amount);

    // UPDATE FRONT END - HTML
    document.getElementById('billItemsShowId').innerHTML += billItem;
  }

  /*
   * ICECREAM ITEM ALREADY EXISTS
   */
  else{
    let old_quantity            = parseInt(localStorage.getItem(icecream_id));                      // quantity that exists before newly ordered quantity
    let updated_quantity        = old_quantity + ordered_quantity;                                  // total quantity after newly ordered
    let updated_amount          = getCalculatedAmount(updated_quantity, selected_icecream.value);   // get updated amount after increasing the ordered quantity
    let ordered_quantity_amount = getCalculatedAmount(ordered_quantity, selected_icecream.value);   // amount of quantity ordered

    /* Amount Of Single Item */
    change_in_amount = Number(ordered_quantity_amount);

    // UPDATE LOCAL STORAGE - quantity
    localStorage.setItem(icecream_id, updated_quantity);

    // UPDATE FRONT END - quantity
    updateInnerHTML(`quantityShowId_${icecream_id}`, 'quantity', updated_quantity);     // update quantity to that item
    updateInnerHTML(`amountShowId_${icecream_id}`, 'amount', updated_amount);           // update amount to that item
  }

  /*
   * FINALLY UPDATE TOTALLING, SUB_TOTAL, DISCOUNT, FINAL AMOUNT FIELD IN LOCAL STORAGE & FRONTEND
   */

  /* Increase sub_total by change in amount due to new items */
  sub_total   += change_in_amount;
  sub_total    = sub_total.toFixed(2);
  sub_total    = parseFloat(sub_total);

  /* Recalculate discount & final_amount from sub_total */
  let [discount_amount, final_amount] = getDiscountAndFinalAmount(sub_total);

  /*
   * UPDATE LOCAL STORAGE
   */
  totalling += ordered_quantity;
  localStorage.setItem('totalling', totalling);
  localStorage.setItem('sub_total', sub_total);

  /*
   * UPDATING FRONT END
   */
  updateInnerHTML('totallingShowId', 'quantity', totalling);     // item boxes total counting
  updateInnerHTML('subTotalShowId', 'amount', sub_total);        // sub total amount
  updateInnerHTML('discountShowId', 'amount', discount_amount);  // discount amount
  updateInnerHTML('totalShowId', 'amount', final_amount);        // final amount ( 22% + 5% less )


  // Show success messsage of added icecream in button
  updateInnerHTML('msgSubmitId', null, 'Added!');

  window.onload = setTimeout( resetOrderBtnName, 2000 );
}


/////////////////////
// UPDATE ICECREAM //
/////////////////////
function updateIcecream(icecream_quantity_show_id, icecream_amount_show_id){
  /* Update specific icecream quantity in localStorage and in frontend as well */

  console.log('Updating icecream');

  const icecream_id     = icecream_quantity_show_id.split('_')[1];                                              // retrieve icecream's id from rows id
  let selected_icecream = icecreamData[icecream_id];                                                            // retrieve id's icecream object  

  // NEW QUANTITY INPUT
  const input_quantity              = prompt(`Please enter the new quantity for "${selected_icecream.name}"`);  // taking quantity input from user
  let [updated_quantity, error_msg] = isValidQuantity(input_quantity);                                          // is this a valid integer quantity

  /* Input quantity is valid */
  if (error_msg === ''){

    let updated_amount = getCalculatedAmount(updated_quantity, selected_icecream.price);                        // re-calculate amount with updated quantity

    /* OLD DATA */
    let old_totalling  = parseInt(localStorage.getItem('totalling'));
    let old_quantity   = parseInt(localStorage.getItem(icecream_id));
    let old_sub_total  = Number(localStorage.getItem('sub_total'));
    let old_amount     = getCalculatedAmount(old_quantity, selected_icecream.price);

    const difference_in_quantity = updated_quantity - old_quantity;
    const difference_in_amount   = updated_amount   - old_amount;

    /* UPDATED DATA */
    let updated_totalling = old_totalling + difference_in_quantity;                                             // change in totalling
    let updated_sub_total = old_sub_total + difference_in_amount;                                               // change in subtotal
    updated_sub_total     = updated_sub_total.toFixed(2);
    updated_sub_total     = parseFloat(updated_sub_total);


    /* Recalculate discount & final_amount from sub_total */
    let [discount_amount, final_amount] = getDiscountAndFinalAmount(updated_sub_total);

    /*
     * UPDATING FRONT END
     */
    updateInnerHTML(icecream_quantity_show_id, 'quantity', updated_quantity);     // update quantity to that item
    updateInnerHTML(icecream_amount_show_id, 'amount', updated_amount);           // update amount to that item
    updateInnerHTML('totallingShowId', 'quantity', updated_totalling);            // item boxes total counting
    updateInnerHTML('subTotalShowId', 'amount', updated_sub_total);               // sub total amount
    updateInnerHTML('discountShowId', 'amount', discount_amount);                 // discount amount
    updateInnerHTML('totalShowId', 'amount', final_amount);                       // final amount ( 22% + 5% less )

    /* 
     * UPDATING LOCAL STORAGE
     */
    localStorage.setItem(icecream_id, updated_quantity);
    localStorage.setItem('totalling', updated_totalling);
    localStorage.setItem('sub_total', updated_sub_total);
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

  const icecream_id       = table_row_show_id.split('_')[1];         // retrieve icecream's id from row id
  const selected_icecream = icecreamData[icecream_id];               // retrieve icecream name from data

  /* ARE YOU SURE TO PERFORM THIS ACTION ? */
  if (!confirm(`Are you really want to delete "${selected_icecream.name}" record ?`)){ return; }

  let quantity         = parseInt(localStorage.getItem(icecream_id));             // quantity of deleted item
  let totalling        = parseInt(localStorage.getItem('totalling'));             // total item we have
  let sub_total        = parseFloat(localStorage.getItem('sub_total'));           // sub total amount till now
  let change_in_amount = getCalculatedAmount(quantity, selected_icecream.price);  // calculate the amount of deleted icecream

  /* Recalculate sub_total, totalling */
  sub_total -= change_in_amount;                                                  // Decrease sub_total by that amount
  sub_total  = sub_total.toFixed(2);
  sub_total  = parseFloat(sub_total);
  totalling -= quantity;                                                          // decrement totalling from deleted quantity

  /* Recalculate discount & final_amount from sub_total */
  let [discount_amount, final_amount] = getDiscountAndFinalAmount(sub_total);

  /* 
   * UPDATING FRONT END
   */
  updateInnerHTML('totallingShowId', 'quantity', totalling);    // item boxes total counting
  updateInnerHTML('subTotalShowId', 'amount', sub_total);       // sub total amount
  updateInnerHTML('discountShowId', 'amount',discount_amount);  // discount amount
  updateInnerHTML('totalShowId', 'amount', final_amount);       // final amount ( 22% + 5% less )

  /* Remove row from HTML */
  document.getElementById(table_row_show_id).remove();

  /* 
   * UPDATING LOCAL STORAGE
   */
  localStorage.removeItem(icecream_id);
  localStorage.setItem('totalling', totalling);
  localStorage.setItem('sub_total', sub_total);

  // IF NO RECORD FOUND THEN DEFAULT MSG
  if (totalling == 0){
    updateInnerHTML('billItemsShowId', '', prepareRecordNotFoundHTML());                    // clear all records from front end as well
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

  /* 
   * UPDATING FRONT END
   */
  updateInnerHTML('billItemsShowId', null, prepareRecordNotFoundHTML());   // clear all records from front end as well
  updateInnerHTML('totallingShowId', 'quantity', 0);                       // Set totalling to 0 ctn in bill
  updateInnerHTML('subTotalShowId', 'amount', 0);                          // Set sub_total to it's initial value
  updateInnerHTML('discountShowId', 'amount', 0);                          // Set discount to it's initial value
  updateInnerHTML('totalShowId', 'amount', 0);                             // Set total amount to it's initial value

  /* 
   * UPDATING LOCAL STORAGE
   */
  localStorage.clear();                                                                    // delete entire data from local storage
  localStorage.setItem('totalling', 0);                                                    // set 'totalling' to it's initial value
  localStorage.setItem('sub_total', 0);                                                    // set 'sub_total' to it's initial value

  // Show success messsage of added icecream in button
  updateInnerHTML('msgResetId', '', 'Reset Successfully!');
  window.onload = setTimeout( resetResetBtnName, 3000 );
}


//////////////////////////
// RESET ORDER BTN NAME //
//////////////////////////
function resetOrderBtnName(){
  /*
   * Reset Button name to default
   */
  updateInnerHTML('msgSubmitId', '', 'Order Icecream');

}


//////////////////////////
// RESET RESET BTN NAME //
//////////////////////////
function resetResetBtnName(){
  /*
   * Reset Button name to default
   */
  updateInnerHTML('msgResetId', '', 'Reset Record');
}


/* MARK IT AS GLOBAL FUNCTION */
window.invoiceNumberInput = invoiceNumberInput;
window.selectedIcecream   = selectedIcecream;
window.readIcecream       = readIcecream;
window.addIcecream        = addIcecream;
window.updateIcecream     = updateIcecream;
window.deleteIcecream     = deleteIcecream;
window.removeAllIcecream  = removeAllIcecream;
window.resetOrderBtnName  = resetOrderBtnName;
window.resetResetBtnName  = resetResetBtnName;
