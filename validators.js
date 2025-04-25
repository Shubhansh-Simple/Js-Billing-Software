/* validators.js */

/*
 * FUNCTION IN THIS FILE
 *
 * - isValidQuantity
 * - isValidQuantityRadioObject 
 * - isValidIcecreamSelectObject
 */


///////////////////////
// IS VALID QUANTITY //
///////////////////////
function isValidQuantity(quantity_input){
  /* 
   * Returns true if the given quantity is an valid quantity and pass below criteria 
   *
   * Return:
   *    [num_quantity, error_msg]
   *
   * Success : [7, '']
   * Fail    : [0, 'Invalid input: "f" is not an valid integer']
   *
   * CRITERIA
   * quantity must be an valid int
   * 0 < quantity < 11
   */

  let num_quantity = Number(quantity_input);         // first convert it into an number
  let error_msg    = '';

  // CHECK FOR VALID INTEGER
  if (!Number.isInteger(num_quantity)){
    error_msg = `Invalid input: "${quantity_input}" is not an valid integer.`;
  }

  // CHECK FOR VALID RANGE
  if ( num_quantity < 1 || num_quantity > 10){
    error_msg = `Invalid input: "${num_quantity}" must lie between 1 and 10.`;
  }

  return [num_quantity, error_msg];
}


/////////////////////////////////////
// IS VALID ICECREAM SELECT OBJECT //
/////////////////////////////////////
function isValidIcecreamSelectObject(icecream){
  /* Check weather provided parameter is valid icecream's select widget object or not */

  if ( icecream && typeof icecream  === 'object' && icecream.hasAttribute('id') && icecream.hasAttribute('value')){ return true; }

  // Invalid Object
  return false;
}


////////////////////////////////////
// IS VALID QUANTITY RADIO OBJECT //
////////////////////////////////////
function isValidQuantityRadioObject(quantity){
  /* Check weather provided parameter is valid quantity's radio button object or not */

  if ( quantity && typeof quantity  === 'object' && quantity.hasAttribute('value')){ return true; }

  // Invalid Object
  return false;
}


export { isValidQuantity,
         isValidQuantityRadioObject,
         isValidIcecreamSelectObject };
