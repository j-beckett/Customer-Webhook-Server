
//this imports the postgres connector into the file so it can be used
const { dotenvConfig } = require('custom-env');
const { Pool } = require('pg');

//imports the AWS Postgres DB credentials from the .env file 
require('custom-env').env();

//instantiate pool to connect to the database, connection settings are passed in
const pool = new Pool({
    // user: POSTGRESQL_DB_USER,
    // host: POSTGRESQL_DB_HOST,
    // database: POSTGRESQL_DB ,
    // password: POSTGRESQL_DB_PASSWORD,
    // port: POSTGRESQL_DB_PORT

    user: "postgres",
    host: "postgres.chtwubdr7alu.us-west-2.rds.amazonaws.com",
    database: "sespe-sync-1",
    password: "WwR9kKO0V2mP05VYMu4fwET7r1Jczx3byagj47uBuHzVrB82k81TW964HuBL",
    port: 5555
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    //process.exit(-1);
  });

//
const TABLE_NAME = "public.\"customers_sync\"";
const PRODUCT_TABLE_NAME = "public.\"products_sync\"";

async function insertCustData(custData){
    const client = await pool.connect();
    try{
        //Establish a new client. Don't forget to free the client with release() afterwards !
       
        console.log("Connected Successfully");
        try{
            
            //this try block does the actual query to the PG DB
                    //
            //assumption: this fits in the registered name to billing first name / last name. could be changed

            try{
                const response = await client.query(
                    `INSERT INTO  ${TABLE_NAME} (\"Email\",
                    \"FirstName\", \"LastName\", \"Username\" , treez_customer_id, \"BillingAddress_FirstName\", 
                    \"BillingAddress_LastName\", \"BillingAddress_State\", \"BillingAddress_City\",
                    \"BillingAddress_Address1\", \"BillingAddress_Address2\" , \"BillingAddress_Postcode\",
                    \"BillingAddress_Email\", \"OriginalPlatform\", \"VerificationStatus\", gender, 
                    birthdate, banned, drivers_license_number, drivers_license_expiration, 
                    permit_expiration, warning_1, warning_2, status, nickname, notes, membership_details, \"CustomFields\", state_medical_id,
                    physician_first_name, physician_last_name, physician_license, physician_address, physician_phone, is_caregiver,
                    caregiver_license_number, caregiver_name_1, caregiver_name_2, caregiver_details, merged_customer_ids, merged_into_customer_id,
                    referral_source, treez_update_time) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
                        $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36,
                        $37, $38, $39, $40, $41, $42, $43) 
                        ON CONFLICT (treez_customer_id) 
                        DO UPDATE SET 
                        \"Email\" = EXCLUDED.\"Email\" , 
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
                        \"CustomFields\" = EXCLUDED.\"CustomFields\",  referral_source = EXCLUDED.referral_source, treez_update_time = EXCLUDED.treez_update_time
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
    }
    catch(err){
        console.log(err.stack);
        console.log("Error Connectiing to the pool "); 
    }
        
    finally{
        //free the client even if there was another error within the error handling. 
        await client.release();
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

async function insertProductData(productData){

    //Establish a new client. Don't forget to free the client with release() afterwards !
    const client = await pool.connect();
    console.log(productData);
    try{
        //this try block does the actual query to the PG DB
        //currently no exclude for categories
        try{
            const response = await client.query(
                `INSERT INTO ${PRODUCT_TABLE_NAME} (treez_product_id, \"Name\", brand, \"RegularPrice\", \"StockQuantity\", 
                \"Weight\", \"UoM\", \"Attributes\", total_mg_thc, total_mg_cbd, total_flower_weight_g, subtype, category_type,
                size, autoupdate_lab_results, lab_results, above_threshold, merged_from_product_ids, \"Description\", treez_category, treez_subtype
                ) 
                VALUES ($1, $2, $3, $4, $5 , $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21 ) 
                ON CONFLICT (treez_product_id) 
                DO UPDATE SET  \"Name\" = EXCLUDED.\"Name\", brand = EXCLUDED.brand, 
                \"RegularPrice\" = EXCLUDED.\"RegularPrice\", \"StockQuantity\" = EXCLUDED.\"StockQuantity\" ,
                \"Weight\" = EXCLUDED.\"Weight\", \"UoM\" = EXCLUDED.\"UoM\", total_mg_thc = EXCLUDED.total_mg_thc,
                total_mg_cbd = EXCLUDED.total_mg_cbd, total_flower_weight_g = EXCLUDED.total_flower_weight_g, subtype = EXCLUDED.subtype,
                category_type = EXCLUDED.category_type, size = EXCLUDED.size, autoupdate_lab_results = EXCLUDED.autoupdate_lab_results,
                lab_results = EXCLUDED.lab_results, above_threshold = EXCLUDED.above_threshold, merged_from_product_ids = EXCLUDED.merged_from_product_ids,
                \"Description\" = EXCLUDED.\"Description\"
                ` ,
                productData
            );

            console.log(response);
        }

        catch (err) {
            console.log("error upserting into the PG table")
            throw err;
        }
    }

    catch(err){
        console.log(err.stack);
        console.log("Error starting a new client.");

    }

    finally{
        //free the client even if there was another error within the error handling. 
        client.release();
    }
    
   
}

connectToDB = async (customer) => {

    //console.log(product);
    try {

        await insertCustData(customer);

    } catch (err) {

        console.log("Failed to Connect to the Pool");
        throw err;
        //error message
    }


};

//this is used for running tests before connecting this file to the server (index.js)
 //connectToDB([123,"testDB", "testingUPSERT2", "jen industries", "fixed", 123] );

module.exports = {insertCustData, insertProductData};
