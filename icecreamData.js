/* icecreamData.js */


/*
 * CONSTANT IN THIS FILE
 *
 * - icecreamData
 * - icecreamMargin
 */


///////////////////
// ICECREAM DATA //
///////////////////
const icecreamData = {
  /* Storing icecream info related to primary id, their name, each box price & option group name */

  "1":  { "name": "Large Vanilla Cup",             "price": 240, "optgroup": "10rs" },
  "2":  { "name": "Large Pista Cup",               "price": 240, "optgroup": "10rs" },
  "3":  { "name": "Large Strawberry Cup",          "price": 240, "optgroup": "10rs" },
  "4":  { "name": "Mini Choco Bar",                "price": 300, "optgroup": "10rs" },
  "5":  { "name": "Nagpur Orange",                 "price": 160, "optgroup": "10rs" },
  "6":  { "name": "Pineapple Kiss",                "price": 160, "optgroup": "10rs" },
  "7":  { "name": "Mango Luv",                     "price": 160, "optgroup": "10rs" },
  "8":  { "name": "Litchi Queen",                  "price": 160, "optgroup": "10rs" },
  "9":  { "name": "Coconut Mix Bar",               "price": 300, "optgroup": "10rs" },
  "10": { "name": "Small Butter Scotch Cone",      "price": 360, "optgroup": "15rs" },
  "11": { "name": "Tuti Fruity",                   "price": 270, "optgroup": "15rs" },
  "12": { "name": "Crunchy Chocobar Brownie",      "price": 240, "optgroup": "15rs" },
  "13": { "name": "Choco Bar",                     "price": 320, "optgroup": "20rs" },
  "14": { "name": "Chocolate Mix Bar",             "price": 320, "optgroup": "20rs" },
  "15": { "name": "Mango Dolly",                   "price": 320, "optgroup": "20rs" },
  "16": { "name": "Mango Treat",                   "price": 320, "optgroup": "20rs" },
  "17": { "name": "Kachha Pakka Mango",            "price": 320, "optgroup": "20rs" },
  "18": { "name": "Kesar Badam Koolfi",            "price": 320, "optgroup": "20rs" },
  "19": { "name": "Mawa Malai Koolfi",             "price": 320, "optgroup": "20rs" },
  "20": { "name": "Double Chocolate Crunchy",      "price": 320, "optgroup": "20rs" },
  "21": { "name": "Kesar Pista Cone",              "price": 320, "optgroup": "20rs" },
  "22": { "name": "Choco Love Cone",               "price": 320, "optgroup": "20rs" },
  "23": { "name": "Strawberry Love",               "price": 320, "optgroup": "20rs" },
  "24": { "name": "Mango Ripple",                  "price": 360, "optgroup": "20rs" },
  "25": { "name": "Black Currant",                 "price": 360, "optgroup": "20rs" },
  "26": { "name": "N Strawberry Ripple",           "price": 360, "optgroup": "20rs" },
  "27": { "name": "Rajbhog Kulfi",                 "price": 300, "optgroup": "25rs" },
  "28": { "name": "Pista Kulfi",                   "price": 300, "optgroup": "25rs" },
  "29": { "name": "Strawberry Ripple",             "price": 450, "optgroup": "25rs" },
  "30": { "name": "Kesar Pista Cup",               "price": 450, "optgroup": "25rs" },
  "31": { "name": "Large Vanilla Cone",            "price": 240, "optgroup": "30rs" },
  "32": { "name": "Large Pista Cone",              "price": 240, "optgroup": "30rs" },
  "33": { "name": "Large Butter Scotch",           "price": 280, "optgroup": "35rs" },
  "34": { "name": "Large Choco Chips",             "price": 280, "optgroup": "35rs" },
  "35": { "name": "Large Oreo Delight",            "price": 240, "optgroup": "35rs" },
  "36": { "name": "Choco Frosty",                  "price": 560, "optgroup": "35rs" },
  "37": { "name": "American Nuts",                 "price": 240, "optgroup": "35rs" },
  "38": { "name": "Fruit Cocktail",                "price": 240, "optgroup": "35rs" },
  "39": { "name": "Maharaj Bhog Tub",              "price": 360, "optgroup": "45rs" },
  "40": { "name": "Rajwadi Kulfi Tub",             "price": 360, "optgroup": "45rs" },
  "41": { "name": "Matka Kulfi",                   "price": 600, "optgroup": "50rs" },
  "42": { "name": "Casatta Slice",                 "price": 300, "optgroup": "50rs" },
  "43": { "name": "Housefull Sundae",              "price": 400, "optgroup": "50rs" },
  "44": { "name": "Cream N Cookies Cone",          "price": 400, "optgroup": "50rs" },
  "45": { "name": "Vanilla (700ml+700ml)",         "price": 220, "optgroup": "COMBO" },
  "46": { "name": "Strawberry (700ml+700ml)",      "price": 230, "optgroup": "COMBO" },
  "47": { "name": "Butter Scotch (700ml+700ml)",   "price": 270, "optgroup": "COMBO" },
  "48": { "name": "Chocolate Chips (700ml+700ml)", "price": 280, "optgroup": "COMBO" },
  "49": { "name": "American Nuts (700ml+700ml)",   "price": 300, "optgroup": "COMBO" },
  "50": { "name": "Cream N Cookies (700ml+700ml)", "price": 300, "optgroup": "COMBO" },
  "51": { "name": "Mango Alphanso (700ml+700ml)",  "price": 250, "optgroup": "COMBO" },
  "52": { "name": "Rabdi Kulfi (700ml+700ml)",     "price": 320, "optgroup": "COMBO" },
  "53": { "name": "Keser Pista 500ml",             "price": 160, "optgroup": "500ML" },
  "54": { "name": "Tuti Fruity 500ml",             "price": 110, "optgroup": "500ML" },
  "55": { "name": "Black Currant 500ml",           "price": 140, "optgroup": "500ML" },
  "56": { "name": "French Vanilla 750ml",          "price": 200, "optgroup": "TUBS" },
  "57": { "name": "Butter Scotch 750ml",           "price": 220, "optgroup": "TUBS" },
  "58": { "name": "Maharaj Bhog 750ml",            "price": 270, "optgroup": "TUBS" },
  "59": { "name": "Rajwadi Kulfi 1L",              "price": 280, "optgroup": "1 Litre" },
  "60": { "name": "Maharaj Bhog 1L",               "price": 280, "optgroup": "1 Litre" }
};


//////////////////////
// ICECREEAM MARGIN //
//////////////////////
const icecreamMargin = {
  /* Storing % margins on each icecream & overall discount of bill  */

  "discount_percent"         : 22,          // 22% less on each icecream
  "overall_discount_percent" : 5            // 5% less of overall amount
};

export {icecreamData, icecreamMargin};
