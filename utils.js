/* utils.py */

/*
 * FUNCTION IN THIS FILE
 *
 * - prepareTodayDate
 * - prepareBillItemHTML
 * - prepareEntireBillHTML
 * - prepareSelectWidgetItemHTML
 * - prepareIcecreamQuantityHTML
 * - prepareRecordNotFoundHTML
 */

// local
import icecreamData from "./icecreamData.js";


////////////////////////
// PREPARE TODAY DATE //
////////////////////////
function prepareTodayDate(){
  /*
   * Construct and return good today's date format 
   * for eg.  Tuesday, 30 May 2023
   */


  // Setting Date
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December' ];
  const dayNames   = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

  let today = new Date();
  let dd    = String(today.getDate()).padStart(2, '0');
  let mm    = String(today.getMonth());
  let day   = String(today.getDay()); // Sunday is 0
  let yyyy  = today.getFullYear();

  today = dayNames[day]+', '+dd+' '+monthNames[mm]+' '+yyyy;

  return today;
}


////////////////////////////
// PREPARE BILL ITEM HTML //
////////////////////////////
function prepareBillItemHTML( serialNo, icecream_id, icecream_name, quantity ){
  /* Prepare and return bill item's row <tr> html code of the bill table */

  let serial_number_show_id     = `serialNumberShowId_${icecream_id}`;
  let table_row_show_id         = `tableRowShowId_${icecream_id}`;
  let icecream_quantity_show_id = `quantityShowId_${icecream_id}`;

  // Append rows on clicking 'Add icecream' button
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

            <!--Action Buttons-->
            <td>
              <!-- Edit Button -->
              <button type='button' class='btn btn-sm btn-warning' onclick="updateIcecream('${icecream_quantity_show_id}')">
                Edit
              </button>

              <!-- Delete Button -->
              <button type='button' class='btn btn-sm btn-danger' onclick="deleteIcecream('${table_row_show_id}')">
                Del
              </button>
            </td>

          </tr>
          `
  // Return generated html table's row code
  return billItem;
}


//////////////////////////////
// PREPARE ENTIRE BILL HTML //
//////////////////////////////
function prepareEntireBillHTML(){
  /* Construct and return bill's html code as per local storage */

  let totalling  = 0;                                   // count the total icecream in bill
  let entireBill = '';                                  // for storing html codes 

  if (localStorage.getItem('totalling') > 0){

    let counter    = 1;                                 // for storing serial number

      Object.keys(localStorage).forEach(key=>{
        if (key[0] !== 't'){

        let icecream  = icecreamData[key];              // ordered icecream i.e. { "name": "Large Vanilla Cup", "price": 240, "optgroup": "10rs" },
        let quantity  = localStorage.getItem(key);      // ordered quantity
        totalling    += parseInt(quantity);             // count total icecream quantity

        entireBill += prepareBillItemHTML(counter, key, icecream.name, quantity)
        counter    += 1;
        }
      });

  }

  return [entireBill, totalling];                       // return complete bill html as per local storage with counting
}


/////////////////////////////////////
// PREPARE ICECREAM TOTALLING HTML //
/////////////////////////////////////
function prepareIcecreamQuantityHTML(quantity){
  /* 
   * Return quantity with html decoration code
   * for eg.
   *    5 <small>ctn</ctn>
   */

  return `${quantity} <small>ctn</ctn>`
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
          <th colspan=4>No Record Found</th>
        </tr>
  `
  return record_not_found_html
}


export { prepareTodayDate,
         prepareEntireBillHTML, 
         prepareBillItemHTML,
         prepareIcecreamQuantityHTML,
         prepareSelectWidgetItemHTML,
         prepareRecordNotFoundHTML };
