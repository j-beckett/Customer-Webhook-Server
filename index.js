// Require express and body-parser
const express = require("express")
// Initialize express and define a port
const app = express()
const PORT = 5000;
const bodyParser = require("body-parser");
const pgDB = require("./DBseed.js");
// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())



/*GLOBALS DON'T TOUCH! */

let PRODUCT_ARRAY = [];
//time to wait between webhook pings to send. in milliseconds.
const TIME_TO_SEND = 3000;

const origPlatform = "Treez";
/*END GLOBALS */



/* CUSTOMER FUNCTIONS HERE */


function capitalizeFirstLetter(string) {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//object is one customer coming in from the Treez webhook. 
async function custFormatIt(object) {

  //console.log(object);

   //TODO
    //assumption: Treez does not define an address as "billing address"
    //so here, I will take the first address on the record as "billing".
    //actually should be solved to check if primary == true. 


    //this formats the patient type and customer group into one nice string - in the format required so that
    //the WooComm DB will be able to recognize it. 
    //in the webhook response, membership data is spread across two Key-value pairs- this concats it.
    let customerMemTypes = `'${object.patient_type}' , `; //formatting for the Woo DB
    object.customer_groups.forEach((custType) => {
      customerMemTypes += ` '${custType}' ,`;
      //customerMemTypes += " , ";
    });
    
    
    //console.log("HEREEE");
    console.log(object.referral_source);
    let customField = [
      {
        "Key": "id_verification_status",
        "Value": object.verification_status
      },
      {
        "Key": "original_platform",
        "Value": origPlatform
      },
      {
        "Key": "birthday",
        "Value": object.birthday
      },
      {
        "Key": "gender",
        "Value": object.gender
      },
      {
        "Key": "driver_license_number",
        "Value": object.drivers_license
      },
      {
        "Key": "driver_license_expiry",
        "Value": object.drivers_license_expiration
      },
      {
        "Key": "membership_details",
        "Value": customerMemTypes
      },
      {
        "Key": "membership_details",
        "Value": customerMemTypes
      },
      {
        "Key": "membership_details",
        "Value": customerMemTypes
      },
      {
        "Key": "medical_document_expiry",
        "Value":  object.permit_expiration
      },
      {
        "Key": "notes",
        "Value":  object.notes
      },
      {
        "Key": "cust_nickname",
        "Value":  object.nickname
      },
      {
        "Key": "is_banned",
        "Value":  Boolean(object.banned)
      }, 
      {
        "Key": "referral_source",
        "Value":  object.referral_source
      }
  ];

  const customFields = JSON.stringify(customField);


    console.log("the date isss");
    
    const date =  Date.now();
    console.log(date);

    //the postgres functions require everything to be formatted into an array.
    //NOTE: the order of insertion must match the order the columns are listed EXACTLY! 
    const itemForDB = [
        //wooCommid - this will be set upon first sync with Skyvia

        object.email,
        capitalizeFirstLetter(object.first_name),
        capitalizeFirstLetter(object.last_name),
        object.email,
        object.customer_id,
        capitalizeFirstLetter(object.first_name), //billing first name
        capitalizeFirstLetter(object.last_name),  //billing last name  //no company field in treez
        object.addresses[0].state,        
        object.addresses[0].city,
        object.addresses[0].street1,  
        object.addresses[0].street2,
        object.addresses[0].zipcode, 
        object.email, //billing email REQUIRED field
        origPlatform, //field by us, not treez   
        object.verification_status ,
        object.gender,
        object.birthday,
        object.banned,
        object.drivers_license,
        object.drivers_license_expiration,
        object.permit_expiration,
        object.warning_1,
        object.warning_2,
        object.status,
        object.nickname,
        object.notes,
        customerMemTypes, 
        customFields,
        object.state_medical_id,
        object.physician_first_name,
        object.physician_last_name,
        object.physician_license,
        object.physician_address,
        object.physician_phone,
        object.is_caregiver,
        object.caregiver_license_number,
        object.caregiver_name_1,
        object.caregiver_name_2,
        object.caregiver_details,
        object.merged_customer_ids,
        object.merged_into_customer_id,
        object.referral_source,
        date
    ];

    await pgDB.insertCustData(itemForDB);


}
/* END CUSTOMER FUNCTIONS */

/**  PRODUCT FUNCTIONS HERE **/


//returns an array of everything mapped and formatted, ready to be send to the DB.
//lots of formatting for the "special" cols happen in this function also. Attributes and Categories. 


function productFormatIt(product){
//console.log("HEEEEEEEEEEEEEEEEEEEYYYYYY");
//console.log(product.product_configurable_fields);

//all hardcoded values with options filled in from API data 
//START attributes format //
  let productAttributes = [ {
    "Id": 2,
    "Name": "Classification",
    "Position": 0,
    "Visible": true,
    "Variation": false,
    "Options": [product.product_configurable_fields.classification] //product config fields 
},
{
    "Id": 6,
    "Name": "Flavors",
    "Position": 1,
    "Visible": true,
    "Variation": false,
    "Options": product.attributes.flavors
}, 
{
    "Id": 8,
    "Name": "Brand",
    "Position": 2,
    "Visible": true,
    "Variation": false,
    "Options": [product.product_configurable_fields.brand]  //product config brand
},
{
    "Id": 9,
    "Name": "Effects",
    "Position": 3,
    "Visible": true,
    "Variation": false,
    "Options": product.attributes.effects
},
{
    "Id": 10,
    "Name": "Ingredients",
    "Position": 4,
    "Visible": true,
    "Variation": false,
    "Options": product.attributes.ingredients
}
]
productAttributes = JSON.stringify(productAttributes);

// END attributes format // 

//NAMING CONVENTIONS FOR CATEGORIES
// Sub category name - High cat name 
// Subtype-category_type
// Ex;  
// CAPSULE-PILL
// PRE-PACK-FLOWER

//formatting for Categories Column //
let productHighCat = product.category_type;

productHighCat = productHighCat.replace(/\s/g, '-');
productHighCat = productHighCat.toLowerCase();

let productCategories = [
  { 
    "Slug": productHighCat
  }
];

let productSlug;
//combined if there is a subtype
if (product.product_configurable_fields.subtype != null){
  productSlug = `${product.product_configurable_fields.subtype}-${productHighCat}`;

  //remove whitespace, replace with a dash, covert to lower
  productSlug = productSlug.replace(/\s/g, '-');
  productSlug = productSlug.toLowerCase();

  productCategories.push({ 
    "Slug": productSlug
  });
}

productCategories = JSON.stringify(productCategories);

//END formatting for Categories Column //

  //formatting data for insertion to DB. 
  let itemForDB = [
    product.product_id,
    product.product_configurable_fields.name,
    product.product_configurable_fields.brand,
    product.pricing.price_sell,
    product.sellable_quantity,
    product.product_configurable_fields.amount, //specify UOM somewhere??
    product.product_configurable_fields.uom,
    productAttributes,
    product.total_mg_thc,
    product.total_mg_cbd,
    product.total_flower_weight_g,
    product.subtype,
    product.category_type,
    product.product_configurable_fields.size,
    product.autoupdate_lab_results,
    product.lab_results,
    product.above_threshold,
    product.merged_from_product_ids,
    product.e_commerce.product_description,
    (product.category_type).toLowerCase(),
    (product.product_configurable_fields.subtype).toLowerCase()
  ];

  //hmmm

  return itemForDB;

}
//the timer at a certain ID has expired. Prints the ID of which product expires to the console
async function timeUp(product) {
  console.log("THE TIME ENDED!!! Send data now for:"+ product.product_id);

  console.log(product)

  // console.log(product.data.product_status);
  // console.log(product.data.category_type);
  // console.log(product.data.product_configurable_fields.name);
  // console.log(product.data.product_configurable_fields.brand);
  // console.log(product.data.pricing.price_type);
  // console.log(product.data.pricing.price_sell);


  const itemForDB = productFormatIt(product);

  //send the formatted object off to this function to upsert the db

  //GET ALL DB CONNECTIONS TOGETHER ! 
  await pgDB.insertProductData(itemForDB); 
}

 //this function returns the ID from a timer being set. 
  //because setTimeout MUST call another function, it calls the one above ^
  function returnNewTimeID(product){
    return setTimeout(timeUp,TIME_TO_SEND, product);
  }


/**  END PRODUCT FUNCTIONS **/


// **** ENDPOINTS ARE HERE **** //

// respond with "hello world" when a GET request is made to the homepage. Mostly I use this just for a quick test to ensure the server is up.
app.get('/', (req, res) => {
  res.send('hello world')
})
  
app.post("/customer" , (req, res) => {

try{

    // console.log("req is:");
    // console.log(req);
    // console.log("req BODY is:");
    // console.log(req.body);

    //this is for when the Treez Endpoint sends over their test request.
    if (req.body.test === 'test'){
      res.status(201).end() // Responding is important
      return;
    }

    let incomingData = req.body.data;

    console.log(incomingData.email);


    //only allows for rfdm emails - take out when running on the production API!
    if ((incomingData.email).toLowerCase().includes("rfdm")){

      custFormatIt(incomingData);
      // console.log(incomingData);

    }
      res.status(200).end() // Responding is important
  }

  catch(err){
    console.log(err)

    res.status(400).end() // Something bad happened 
  }
});

//ALL TIMER LOGIC IS BELOW HERE! //
/*   This timer logic exists because Treez sends data to the webhook anytime any field is touched. 
  Therefore, this endpoint will likely recieve 100's of requests in a matter of seconds. 
  Time to Send Can be adjusted by:
*/
//
app.post("/product" , (req, res) => {


  //NOTE: THIS WORKS FOR WEBHOOK USE!!!!
  //If you are testing with productClient.js , change req.body.data -> req.body!!!
  const productData = req.body.data;

  let incomingProductID = productData.product_id;

  //console.log("!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!");
  //console.log(req.body);
  console.log(incomingProductID);

  //full customer log//
  //console.log(req.body.data) //

  let matchFound = false;

  //array is empty - add the first item there
  if (PRODUCT_ARRAY.length === 0){
    console.log("Array empty. Adding item to arr");

    let timeID = returnNewTimeID(productData); 
    let obj = {"id": incomingProductID, "timeoutID": timeID};
    PRODUCT_ARRAY.push(obj);
  }

  //check the array if there is match based on product id. If no match - add id to array
  else{
      matchFound = PRODUCT_ARRAY.some((currItem, index) => {
      console.log(PRODUCT_ARRAY.length + " is length ");
      console.log("incoming product is:" + incomingProductID);
      console.log("index is: " + index);
      console.log("currItem is:")
      console.log(currItem.id);

      if (incomingProductID === currItem.id){
        console.log("match found in the array");
        clearTimeout(currItem.timeID);
        console.log("timeout cleared. Starting new timer...")

        let timeID = returnNewTimeID(productData);  

        currItem.timeID = timeID;

       // matchFound = true;

        return true;
      }

      return false;
      
    })

    if (!matchFound){
        console.log("item not found! adding to array")
        let timeID = returnNewTimeID(productData); 
        let obj = {"id": incomingProductID, "timeoutID": timeID};
        PRODUCT_ARRAY.push(obj);

    }
  }





  res.status(200).end() // Responding is important
});

// Start express on the defined port
app.listen(process.env.PORT || 5000, () => console.log(`🚀 Server running on port ${PORT}`))