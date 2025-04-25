/* helpers.js */

/*
 * FUNCTION IN THIS FILE
 *
 * - getTodaysDate
 * - getCalculatedAmount
 * - getFivePercentAmount
 * - getCalculatedFinalAmount
 */

// local
import { icecreamMargin } from "./icecreamData.js";


/////////////////////
// GET TODAYS DATE //
/////////////////////
function getTodaysDate(){
  /*
   * Construct and return good today's date format 
   * for eg.  Tuesday, 30 May 2023
   */


  // Setting Date
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December' ];
  const dayNames   = ['Sun','Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat' ];

  let today = new Date();
  let dd    = String(today.getDate()).padStart(2, '0');
  let mm    = String(today.getMonth());
  let day   = String(today.getDay()); // Sunday is 0
  let yyyy  = today.getFullYear();

  today = dayNames[day]+', '+dd+' '+monthNames[mm]+' '+yyyy;

  return today;
}


///////////////////////////
// GET CALCULATED AMOUNT //
///////////////////////////
function getCalculatedAmount(quantity, rate){
  /* Return amount of ordered quantity with 22% less */

  quantity = Number(quantity);
  rate     = Number(rate);

  let amount = (quantity * rate);                                  // M.R.P amount on ordered quantity
  amount    -= (amount * icecreamMargin.discount_percent) / 100;   // 22% less on M.R.P amount
  amount     = amount.toFixed(2);                                  // round off until two digits

  // final amount
  return parseFloat(amount);
}


/////////////////////////////
// GET FIVE PERCENT AMOUNT //
/////////////////////////////
function getFivePercentAmount(amount){
  /* Return 5% of given amount */

  amount = Number(amount);

  let discount_amount = ( amount * icecreamMargin.overall_discount_percent ) / 100;   // 5% of given amount
  discount_amount     =  discount_amount.toFixed(2);                                                  // round off until two digits

  return parseFloat(discount_amount);
}


//////////////////////////////////
// GET CALCULATED FINAL AMOUNT //
/////////////////////////////////
function getCalculatedFinalAmount(sub_total_amount, discount_amount){
  /* Return sub total amount after providing discount amount */

  let final_amount = Number(sub_total_amount) - Number(discount_amount);
  return Math.ceil(final_amount);
}


///////////////////////////////////
// GET DISCOUNT AND FINAL AMOUNT //
///////////////////////////////////
function getDiscountAndFinalAmount(sub_total_amount){
  /* Calculate and return both discount & final amount from given sub_total amount */

  let discount_amount = getFivePercentAmount(sub_total_amount);
  let final_amount    = getCalculatedFinalAmount(sub_total_amount, discount_amount);

  return [discount_amount, final_amount];
}


export {
  getTodaysDate,
  getCalculatedAmount, 
  getFivePercentAmount, 
  getCalculatedFinalAmount,
  getDiscountAndFinalAmount
};
