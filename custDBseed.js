//this file is for insert / update to PG database.
//currently does not work


//this imports the postgres connector into the file so it can be used
const { dotenvConfig } = require('custom-env');
const { Pool } = require('pg');

//imports the AWS Postgres DB credentials from the .env file 
require('custom-env').env();

//instantiate pool to connect to the database, connection settings are passed in
const pool = new Pool({
    user: POSTGRESQL_DB_USER,
    host: POSTGRESQL_DB_HOST,
    database: POSTGRESQL_DB ,
    password: POSTGRESQL_DB_PASSWORD,
    port: POSTGRESQL_DB_PORT
});


const TABLE_NAME = "public.\"customers_sync\"";
//

async function insertData(custData, pool){

    //Establish a new client. Don't forget to free the client with release() afterwards !
    const client = await pool.connect();

    try{
        //this try block does the actual query to the PG DB

        //assumption: this fits in the registered name to billing first name / last name. could be changed
        try{
            const response = await client.query(
                `INSERT INTO  ${TABLE_NAME} (\"WooCustomerId\", \"Email\",
                 \"FirstName\", \"LastName\", \"Username\" , treez_customer_id, \"BillingAddress_FirstName\", 
                 \"BillingAddress_LastName\", \"BillingAddress_State\", \"BillingAddress_City\",
                  \"BillingAddress_Address1\", \"BillingAddress_Address2\" , \"BillingAddress_Postcode\",
                   \"BillingAddress_Email\", \"OriginalPlatform\", \"VerificationStatus\", gender, 
                   birthdate, banned, drivers_license_number, drivers_license_expiration, 
                   permit_expiration, warning_1, warning_2, status, nickname, notes, membership_details, \"CustomFields\", state_medical_id,
                   physician_first_name, physician_last_name, physician_license, physician_address, physician_phone, is_caregiver,
                   caregiver_license_number, caregiver_name_1, caregiver_name_2, caregiver_details, merged_customer_ids, merged_into_customer_id,
                   referral_source) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
                    $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36,
                    $37, $38, $39, $40, $41, $42, $43) 
                     ON CONFLICT (treez_customer_id) 
                     DO UPDATE SET 
                     \"WooCustomerId\" = EXCLUDED.\"WooCustomerId\" , \"Email\" = EXCLUDED.\"Email\" , 
                     \"FirstName\" = EXCLUDED.\"FirstName\" , \"LastName\" = EXCLUDED.\"LastName\" ,
                     \"Username\" = EXCLUDED.\"Username\" ,
                     \"BillingAddress_FirstName\" = EXCLUDED.\"BillingAddress_FirstName\", 
                     \"BillingAddress_LastName\" =  EXCLUDED.\"BillingAddress_LastName\",
                     \"BillingAddress_State\" = EXCLUDED.\"BillingAddress_State\", 
                     \"BillingAddress_City\" = EXCLUDED.\"BillingAddress_City\",
                     \"BillingAddress_Address1\" = EXCLUDED.\"BillingAddress_Address1\", 
                     \"BillingAddress_Address2\" = EXCLUDED.\"BillingAddress_Address2\", 
                     \"BillingAddress_Postcode\" =  EXCLUDED.\"BillingAddress_Postcode\",
                     \"BillingAddress_Email\" = EXCLUDED.\"BillingAddress_Email\",
                     \"Role\"  = EXCLUDED.\"Role\" , 
                     \"VerificationStatus\" = EXCLUDED.\"VerificationStatus\" , gender = EXCLUDED.gender , 
                     birthdate = EXCLUDED.birthdate , banned = EXCLUDED.banned , drivers_license_number = EXCLUDED.drivers_license_number ,
                    drivers_license_expiration = EXCLUDED.drivers_license_expiration , 
                    permit_expiration = EXCLUDED.permit_expiration, warning_1 = EXCLUDED.warning_1, 
                    warning_2 = EXCLUDED.warning_2, status = EXCLUDED.status, nickname = EXCLUDED.nickname,
                    notes = EXCLUDED.notes, membership_details = EXCLUDED.membership_details, 
                    \"CustomFields\" = EXCLUDED.\"CustomFields\",  referral_source = EXCLUDED.referral_source
                    ` ,
                custData
            );

            console.log("RESPONSE IS: ");
            console.log(response);
        }

        catch (err) {
            console.log("error upserting into the PG table")
            throw err;
        }

        console.log("Inserted or Updated a Customer into the table.")
    }

    catch(err){
        console.log(err.stack);
        console.log("Error starting a new client.");

    }

    finally{
        //free the client even if there was another error within the error handling. 
        client.release();
    }
   

    // str = "public.\"Node_Products_Test\"";
    // const response = apool.query(
    //     "SELECT * FROM " + str
    // );

   //console.log(response.rows);
    

    
    //client.release();
    //pool.end()
    // .then(() => console.pool has disconnected'))
    // .catch(err => console.error('error during disconnection', err.stack));
    //pool.done();
}

connectToDB = async (product) => {

    console.log(product);
    try {
        pool.connect();
        console.log("Connected Successfully");

        await insertData(product, pool);

    } catch (err) {

        console.log("Failed to Connect to the Pool");
        throw err;
        //error message
    }


};

//this is used for running tests before connecting this file to the server (index.js)
 //connectToDB([123,"testDB", "testingUPSERT2", "jen industries", "fixed", 123] );

module.exports = {connectToDB};