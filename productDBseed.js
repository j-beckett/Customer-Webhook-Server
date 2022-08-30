//this file is for insert / update to PG database.
//currently does not work


//this imports the postgres connector into the file so it can be used
const { dotenvConfig } = require('custom-env');
const { Pool } = require('pg');

//imports the AWS Postgres DB credentials from the .env file 
require('custom-env').env();

//instantiate pool to connect to the database, connection settings are passed in
const pool = new Pool({
    user: process.env.POSTGRESQL_DB_USER,
    host: process.env.POSTGRESQL_DB_HOST,
    database: process.env.POSTGRESQL_DB,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    port: process.env.POSTGRESQL_DB_PORT
});

//

async function insertData(productData, pool){

    //Establish a new client. Don't forget to free the client with release() afterwards !
    const client = await pool.connect();

    try{
        //this try block does the actual query to the PG DB
        try{
            const response = await client.query(
                "INSERT INTO public.\"Node_Products_Test\" (product_id, category, name, brand, price_type, price) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (product_id) DO UPDATE SET category = EXCLUDED.category, name = EXCLUDED.name, brand = EXCLUDED.brand, price_type = EXCLUDED.price_type, price = EXCLUDED.price" ,
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
   

    // str = "public.\"Node_Products_Test\"";
    // const response = apool.query(
    //     "SELECT * FROM " + str
    // );

   //console.log(response.rows);
    

    console.log("Inserted or Updated a product into the table.")
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