/* icecreamData.js */


/*
 * CONSTANT IN THIS FILE
 *
 * - icecreamData
 * - icecreamMargin
 */

///////////////
// OPT GROUP //
///////////////
const optGroup = {
  "10"      : "10rs",
  "15"      : "15rs",
  "20"      : "20rs",
  "25"      : "25rs",
  "30"      : "30rs",
  "35"      : "35rs",
  "40"      : "40rs",
  "45"      : "45rs",
  "50"      : "50rs",
  "COMBO"   : "COMBO",
  "500ML"   : "500ML",
  "PREMIUM" : "PREMIUM",
  "1L"      : "1L"
}


///////////////////
// ICECREAM DATA //
///////////////////
const icecreamData = {
  /* Storing icecream info related to primary id, their name, each box price & option group name */

  "1":  { "name": "Large Vanilla Cup",             "price": 240, "optgroup": optGroup["10"] },
  "2":  { "name": "Large Pista Cup",               "price": 240, "optgroup": optGroup["10"] },
  "3":  { "name": "Large Strawberry Cup",          "price": 240, "optgroup": optGroup["10"] },
  "4":  { "name": "Mini Choco Bar",                "price": 300, "optgroup": optGroup["10"] },
  "5":  { "name": "Nagpur Orange",                 "price": 160, "optgroup": optGroup["10"] },
  "6":  { "name": "Pineapple Kiss",                "price": 160, "optgroup": optGroup["10"] },
  "7":  { "name": "Mango Luv",                     "price": 160, "optgroup": optGroup["10"] },
  "8":  { "name": "Litchi Queen",                  "price": 160, "optgroup": optGroup["10"] },
  "9":  { "name": "Coconut Mix Bar",               "price": 300, "optgroup": optGroup["10"] },
  "10": { "name": "Small Butter Scotch Cone",      "price": 360, "optgroup": optGroup["15"] },
  "11": { "name": "Tuti Fruity",                   "price": 270, "optgroup": optGroup["15"] },
  "12": { "name": "Choco Bar",                     "price": 320, "optgroup": optGroup["20"] },
  "13": { "name": "Chocolate Mix Bar",             "price": 320, "optgroup": optGroup["20"] },
  "14": { "name": "Mango Dolly",                   "price": 320, "optgroup": optGroup["20"] },
  "15": { "name": "Mango Treat",                   "price": 320, "optgroup": optGroup["20"] },
  "16": { "name": "Kachha Pakka Mango",            "price": 320, "optgroup": optGroup["20"] },
  "17": { "name": "Kesar Badam Koolfi",            "price": 320, "optgroup": optGroup["20"] },
  "18": { "name": "Mawa Malai Koolfi",             "price": 320, "optgroup": optGroup["20"] },
  "19": { "name": "Double Chocolate Crunchy",      "price": 320, "optgroup": optGroup["20"] },
  "20": { "name": "Kesar Pista Cone",              "price": 320, "optgroup": optGroup["20"] },
  "21": { "name": "Choco Love Cone",               "price": 320, "optgroup": optGroup["20"] },
  "22": { "name": "Strawberry Love",               "price": 320, "optgroup": optGroup["20"] },
  "23": { "name": "Mango Ripple",                  "price": 360, "optgroup": optGroup["20"] },
  "24": { "name": "Black Currant",                 "price": 360, "optgroup": optGroup["20"] },
  "25": { "name": "N Strawberry Ripple",           "price": 360, "optgroup": optGroup["20"] },
  "26": { "name": "Rajbhog Kulfi",                 "price": 300, "optgroup": optGroup["25"] },
  "27": { "name": "Pista Kulfi",                   "price": 300, "optgroup": optGroup["25"] },
  "28": { "name": "Strawberry Ripple",             "price": 450, "optgroup": optGroup["25"] },
  "29": { "name": "Kesar Pista Cup",               "price": 450, "optgroup": optGroup["25"] },
  "30": { "name": "Large Vanilla Cone",            "price": 240, "optgroup": optGroup["30"] },
  "31": { "name": "Large Pista Cone",              "price": 240, "optgroup": optGroup["30"] },
  "32": { "name": "Large Choco Chips Cups",        "price": 240, "optgroup": optGroup["30"] },
  "33": { "name": "Large Butter Scotch Cone",      "price": 280, "optgroup": optGroup["35"] },
  "34": { "name": "Large Choco Chips Cone",        "price": 280, "optgroup": optGroup["35"] },
  "35": { "name": "Large Oreo Delight Cone",       "price": 240, "optgroup": optGroup["35"] },
  "36": { "name": "Choco Frosty",                  "price": 560, "optgroup": optGroup["35"] },
  "37": { "name": "American Nuts Cups",            "price": 240, "optgroup": optGroup["35"] },
  "38": { "name": "Fruit Cocktail Cups",           "price": 240, "optgroup": optGroup["35"] },
  "39": { "name": "Fruit Punch Cone",              "price": 320, "optgroup": optGroup["40"] },
  "40": { "name": "Maharaj Bhog Tub",              "price": 360, "optgroup": optGroup["45"] },
  "41": { "name": "Rajwadi Kulfi Tub",             "price": 360, "optgroup": optGroup["45"] },
  "42": { "name": "Matka Kulfi",                   "price": 600, "optgroup": optGroup["50"] },
  "43": { "name": "Casatta Slice",                 "price": 300, "optgroup": optGroup["50"] },
  "44": { "name": "Housefull Sundae",              "price": 400, "optgroup": optGroup["50"] },
  "45": { "name": "Cream N Cookies Cone",          "price": 400, "optgroup": optGroup["50"] },
  "46": { "name": "Vanilla (700ml+700ml)",         "price": 220, "optgroup": optGroup["COMBO"] },
  "47": { "name": "Strawberry (700ml+700ml)",      "price": 230, "optgroup": optGroup["COMBO"] },
  "48": { "name": "Butter Scotch (700ml+700ml)",   "price": 270, "optgroup": optGroup["COMBO"] },
  "49": { "name": "Chocolate Chips (700ml+700ml)", "price": 280, "optgroup": optGroup["COMBO"] },
  "50": { "name": "American Nuts (700ml+700ml)",   "price": 300, "optgroup": optGroup["COMBO"] },
  "51": { "name": "Cream N Cookies (700ml+700ml)", "price": 300, "optgroup": optGroup["COMBO"] },
  "52": { "name": "Mango Alphanso (700ml+700ml)",  "price": 250, "optgroup": optGroup["COMBO"] },
  "53": { "name": "Rabdi Kulfi (700ml+700ml)",     "price": 320, "optgroup": optGroup["COMBO"] },
  "54": { "name": "Keser Pista 500ml",             "price": 160, "optgroup": optGroup["500ML"] },
  "55": { "name": "Tuti Fruity 500ml",             "price": 110, "optgroup": optGroup["500ML"] },
  "56": { "name": "Black Currant 500ml",           "price": 140, "optgroup": optGroup["500ML"] },
  "57": { "name": "French Vanilla 750ml",          "price": 200, "optgroup": optGroup["PREMIUM"] },
  "58": { "name": "Butter Scotch 750ml",           "price": 220, "optgroup": optGroup["PREMIUM"] },
  "59": { "name": "Mango Alphanso 750ml",          "price": 250, "optgroup": optGroup["PREMIUM"] },
  "60": { "name": "Maharaj Bhog 750ml",            "price": 270, "optgroup": optGroup["PREMIUM"] },
  "61": { "name": "Rajwadi Kulfi 1L",              "price": 280, "optgroup": optGroup["1L"] },
  "62": { "name": "Maharaj Bhog 1L",               "price": 280, "optgroup": optGroup["1L"] }
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
