// Require express and body-parser
const express = require("express")

// Initialize express and define a port
const app = express()
const PORT = 3001
const bodyParser = require("body-parser")
const pgDB = require("./CustDBseed.js");

const origPlatform = "Treez";

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())


async function formatIt(object) {
 
    console.log(object.verification_status);
    console.log(object.first_name);
   // console.log(object.addresses);
    //assumption: Treez does not define an address as "billing address"
    //so here, I will take the first address on the record as "billing".
    //actually should be solved to check if primary == true. to do 


    let customerMemTypes = "";

    object.customer_groups.forEach((custType) => {
      customerMemTypes += custType;
      customerMemTypes += " , ";
    });
    
    
    const itemForDB = [
        null,
        object.email,
        object.first_name,
        object.last_name,
        object.customer_id,
        object.first_name, //billing first name
        object.last_name,  //billing last name  //no company field in treez
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
        object.patient_type + " , " + customerMemTypes
    ];

    pgDB.connectToDB(itemForDB);

  //formatting data for insertion to DB. Currently DB insertion not working 
//   let itemForDB = [
//     product.product_id, 
//     product.product_status,
//     product.product_configurable_fields.name,
//     product.product_configurable_fields.brand,
//     product.pricing.price_type,
//     product.pricing.price_sell
//   ];

  //send the formatted object off to this function to upsert the db
  //await pgDB.connectToDB(itemForDB);
}


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
  
app.post("/customer" , (req, res) => {
    let incomingData = req.body.data;


    formatIt(incomingData);
   // console.log(incomingData);
    






    res.status(200).end() // Responding is important
});

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))