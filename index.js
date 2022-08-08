// Require express and body-parser
const express = require("express")

// Initialize express and define a port
const app = express()
const PORT = 5000;
const bodyParser = require("body-parser");
const pgDB = require("./custDBseed.js");

const origPlatform = "Treez";

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())

//object is one customer coming in from the Treez webhook. 
async function formatIt(object) {
 
    // console.log(object.verification_status);
    // console.log(object.first_name);
   // console.log(object.addresses);

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
    
    //console.log(typeof(object.birthday));
    console.log("HEREEE");
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
      }
  ];

  const customFields = JSON.stringify(customField);

    const itemForDB = [
        null, //wooCommid - this will be set upon first sync with Skyvia
        object.email,
        object.first_name,
        object.last_name,
        object.email,
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
        object.referral_source
    ];

    

    pgDB.connectToDB(itemForDB);


}


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
  
app.post("/customer" , (req, res) => {

try{

    // console.log("req is:");
    // console.log(req);
    // console.log("req BODY is:");
    // console.log(req.body);

    if (req.body.test === 'test'){
      res.status(201).end() // Responding is important
      return;
    }

    let incomingData = req.body.data;
    //const userRole = 


    formatIt(incomingData);
    // console.log(incomingData);

  //a change

      res.status(200).end() // Responding is important
  }

  catch(err){
    console.log(err)

    res.status(400).end() // Something bad happened 
  }
});

// Start express on the defined port
app.listen(process.env.PORT || 5000, () => console.log(`🚀 Server running on port ${PORT}`))