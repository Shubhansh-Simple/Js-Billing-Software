/* utils.py */

/*
 * HTML FUNCTIONS IN THIS FILE
 *
 * - updateInnerHTML
 * - prepareBillItemHTML
 * - prepareEntireBillHTML
 * - prepareSelectWidgetItemHTML
 * - prepareIcecreamQuantityHTML
 * - prepareIcecreamAmountHTML
 * - prepareRecordNotFoundHTML
 */

// local
import { icecreamData }        from "./icecreamData.js";
import { getCalculatedAmount } from "./helpers.js";


///////////////////////
// UPDATE INNER HTML //
///////////////////////
function updateInnerHTML(ele_id, output_type, value) {
  /* 
   * Update Inner Html using given id  & value with html text decoration 
   *
   * Parameter:
   *    ele_id      - id of element which need to be updated
   *    output_type - in what formatter type you want the value as mention below eg.
   *
   * for eg.
   *    <small>8 ctn</small>      # output_type : quantity
   *    <small>20 rs</small>      # output_type : amount
   *    <small>20</small>         # output_type : null || ''
   */

  const el = document.getElementById(ele_id);
  if (!el) return;

  let formattedValue;

  switch (output_type) {
    case 'quantity':
      formattedValue = prepareIcecreamQuantityHTML(value);
      break;
    case 'amount':
      formattedValue = prepareIcecreamAmountHTML(value);
      break;
    default:
      formattedValue = value;
  }

  el.innerHTML = formattedValue;
}


////////////////////////////
// PREPARE BILL ITEM HTML //
////////////////////////////
function prepareBillItemHTML( serialNo, icecream_id, icecream_name, rate, quantity ){
  /* 
   * Prepare and return bill item's row <tr> html code of the bill table 
   * 
   * For eg.
   *<tr id="tableRowShowId_2">
      <!--Serial No.-->
      <td><i id="serialNumberShowId_2" class="text-dark">1.)</i></td>

      <!--Icecream Ordered-->
      <th>Large Pista Cup</th>

      <!--Quantity Ordered-->
      <td id="quantityShowId_2">2<small>ctn</small></td>

      <!-- Icecream M.R.P -->
      <td>240<small>rs</small></td>

      <!--Action Buttons-->
      <td>
        <!-- Edit Button -->
        <button type="button" class="btn btn-sm btn-warning" onclick="updateIcecream('quantityShowId_2')">Edit</button>

        <!-- Delete Button -->
        <button type="button" class="btn btn-sm btn-danger" onclick="deleteIcecream('tableRowShowId_2')">Del</button>
      </td>
    </tr>
   */

  /* Setting HTML IDs to those html node whose values need to be updated in future */
  let serial_number_show_id     = `serialNumberShowId_${icecream_id}`;
  let table_row_show_id         = `tableRowShowId_${icecream_id}`;
  let icecream_quantity_show_id = `quantityShowId_${icecream_id}`;
  let icecream_amount_show_id   = `amountShowId_${icecream_id}`;

  /* Calculating amount for each icecream after discount */
  let amount = getCalculatedAmount(quantity, rate);

  /* Constructed HTML code with calculated per icecream box amount after discount */
  let billItem = `
          <tr id='tableRowShowId_${icecream_id}'>
            <!--Serial No.-->
            <td>
              <i id="${serial_number_show_id}" class="text-dark">${serialNo}.)</i>
            </td>

            <!--Icecream Ordered-->
            <th>
              ${icecream_name}
            </th>

            <!--Quantity Ordered-->
            <td id=${icecream_quantity_show_id}>${quantity}
                <small>ctn</small>
            </td>

            <!-- Icecream M.R.P -->
            <td>${rate}<small>rs</small></td>

            <!-- Icecream Amount = ( Ordered Quantity X M.R.P ) - 22 % -->
            <td id=${icecream_amount_show_id}>${amount}<small>rs</small></td>

            <!--Action Buttons-->
            <td></td>
            <td></td>
            <td>
              <!-- Edit Button -->
              <button type='button' class='btn btn-sm btn-primary' onclick="updateIcecream('${icecream_quantity_show_id}', '${icecream_amount_show_id}')">
                Edit
              </button>
            </td>

            <td>
              <!-- Delete Button -->
              <button type='button' class='btn btn-sm btn-danger' onclick="deleteIcecream('${table_row_show_id}')">
                Del
              </button>
            </td>

          </tr>
          `
  // Return generated html table's row code with calculated amount of item
  return [billItem, amount];
}


//////////////////////////////
// PREPARE ENTIRE BILL HTML //
//////////////////////////////
function prepareEntireBillHTML(){
  /* Construct and return bill's html code as per local storage */

  let totalling        = 0;                             // count the total icecream boxes in bill
  let entireBill       = '';                            // for storing html codes 
  let sub_total_amount = 0;                             // summation of all 22% less amount value

  if (localStorage.getItem('totalling') > 0){

    let counter     = 1;                                // serial number calculation
    let billItem    = '';                               // each item's html row
    let each_amount = 0;                                // each item's 22% less amount of an item

    const numeric_ids = [];

    /* Collect only numeric ids */
    Object.keys(localStorage).forEach(key=>{
      if (!isNaN(key)){ numeric_ids.push(key) }
    });

    const sorted_ids = numeric_ids.sort((a,b) => Number(a) - Number(b));  // sort the ids

    sorted_ids.map(key => {
        let icecream  = icecreamData[key];              // ordered icecream i.e. { "name": "Large Vanilla Cup", "price": 240, "optgroup": "10rs" },
        let quantity  = localStorage.getItem(key);      // ordered quantity
        totalling    += parseInt(quantity);             // count total icecream quantity
        
        [ billItem, each_amount ] = prepareBillItemHTML(counter, key, icecream.name, icecream.price, quantity);
        entireBill               += billItem;                     // append bill item row's html code
        sub_total_amount         += parseFloat(each_amount);      // calculate 22% less amount total
        counter                  += 1;
    });
  }

  // Decimal upto 2 places
  sub_total_amount = sub_total_amount.toFixed(2);
  sub_total_amount = parseFloat(sub_total_amount);

  /* Return items in HTML, total quantity & total amount of all icecream */
  return [entireBill, totalling, sub_total_amount];
}


/////////////////////////////////////
// PREPARE ICECREAM TOTALLING HTML //
/////////////////////////////////////
function prepareIcecreamQuantityHTML(quantity){
  /* 
   * Return quantity with html decoration code
   * for eg.
   *    5 <small>ctn</small>
   */

  return `${quantity} <small>ctn</small>`
}


//////////////////////////////////
// PREPARE ICECREAM AMOUNT HTML //
//////////////////////////////////
function prepareIcecreamAmountHTML(amount){
  /*
   * Return quantity with html decoration code
   * for eg.
   *    5 <small>rs</small>
   */
  return `${amount} <small>rs</small>`
}


//////////////////////////////////////
// PREPARE SELECTE WIDGET ITEM HTML //
//////////////////////////////////////
function prepareSelectWidgetItemHTML(){
  /* 
   * Prepare and return html codes for the icecream select widget 
   *
   * for eg.
   * <optgroup label="10rs">
   *    <option id="1" value="240">Large Vanilla Cup</option>
   *    <option id="2" value="240">Large Pista Cup</option>
   * </optgroup>
   */

  let selectWidgetItems = `<!-- OPTGROUPING START -->
                           <optgroup label=${icecreamData[1].optgroup}>`;

  let previous_optgroup = icecreamData[1].optgroup;           // our first optgroup i.e. 10rs icecream

  // Append icecream data to the selection widget, one by one
  Object.keys(icecreamData).forEach(key => {
  
    let current_optgroup         = icecreamData[key].optgroup;
    let select_widget_item_value = `<option id=${key} value=${icecreamData[key].price}>${icecreamData[key].name}</option>` 

    /* If they belongs to same optgroup then just append <option> */
    if ( previous_optgroup === current_optgroup ){
      selectWidgetItems += select_widget_item_value
    }

    /* If they belongs to another optgroup then add another <optgroup> first before <option> */
    else{
      selectWidgetItems += `
        </optgroup>

        <optgroup label="${icecreamData[key].optgroup}">
          ${select_widget_item_value}
      `
    }

    // Updating the optgroup for next iteration
    previous_optgroup = current_optgroup;
  });

  // Closing the last </optgroup> html tag
  selectWidgetItems += `
    </optgroup>
  `

  // Return generated html for icecream selection widget
  return selectWidgetItems;
}


///////////////////////////////////
// PREPARE RECORD NOT FOUND HTML //
///////////////////////////////////
function prepareRecordNotFoundHTML(){
  /*Preare and return no record found html code*/

  let record_not_found_html = `
        <tr>
          <th colspan=7>No Record Found</th>
        </tr>
  `
  return record_not_found_html
}


export { updateInnerHTML,
         prepareEntireBillHTML,
         prepareBillItemHTML,
         prepareIcecreamAmountHTML,
         prepareIcecreamQuantityHTML,
         prepareSelectWidgetItemHTML,
         prepareRecordNotFoundHTML };
