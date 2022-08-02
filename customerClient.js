const axios = require('axios');

const sleep = require('util').promisify(setTimeout)
let i = 1;

let num = 0;

function myFunc() {
    const custArr = [
      {
        "resultCode": "SUCCESS",
        "resultReason": null,
        "resultDetail": null,
        "data": {
            "status": "ACTIVE",
            "verification_status": "VERIFIED",
            "verification_reasons": [],
            "customer_id": "15111",
            "first_name": "testy",
            "middle_name": "",
            "nickname": "",
            "last_name": "heroku",
            "birthday": "1992-04-07",
            "drivers_license": "C1234567",
            "drivers_license_expiration": "2022-04-07",
            "state_medical_id": "N/A",
            "permit_expiration": "N/A",
            "email": "sample@test.com",
            "phone": "6282032916",
            "notes": "loyal customer\nprefers flower - indica dominant hybrids",
            "physician_first_name": null,
            "physician_last_name": null,
            "physician_license": null,
            "physician_address": null,
            "physician_phone": null,
            "is_caregiver": false,
            "caregiver_license_number": "",
            "caregiver_name_1": "N/A",
            "caregiver_name_2": "N/A",
            "caregiver_details": [],
            "rewards_balance": 275,
            "rewards_type": "POINTS",
            "gender": "M",
            "signup_date": "2019-04-10T23:44:07.000-07:00",
            "last_visit_date": "2020-04-23 07:42:29.000",
            "last_update": "2020-05-09T09:41:43.000-07:00",
            "opt_out": null,
            "referral_source": "Other",
            "banned": false,
            "warning_1": false,
            "warning_2": false,
            "addresses": [
                {
                    "type": "address_of_record",
                    "street1": "1611 TELEGRAPH AVE",
                    "street2": "",
                    "city": "OAKLAND",
                    "state": "CA",
                    "zipcode": "94612",
                    "primary": true
                },
                {
                    "type": "alternative_address",
                    "street1": "7000 COLISEUM WAY",
                    "street2": "",
                    "city": "OAKLAND",
                    "state": "CA",
                    "zipcode": "94621",
                    "primary": false
                },
                {
                    "type": "secondary_address",
                    "street1": "9500 STERN AVE",
                    "street2": "",
                    "city": "OAKLAND",
                    "state": "CA",
                    "zipcode": "94605",
                    "primary": false
                }
            ],
            "merged_customer_ids": [],
            "merged_into_customer_id": null,
            "patient_type": "ADULT",
            "customer_groups": [
                "INDUSTRY"
            ]
        }
        },
        {
        "resultCode": "SUCCESS",
        "resultReason": null,
        "resultDetail": null,
        "data": {
            "status": "ACTIVE",
            "verification_status": "VERIFIED",
            "verification_reasons": [],
            "customer_id": "1531",
            "first_name": "Jen",
            "middle_name": "",
            "nickname": "",
            "last_name": "beckett",
            "birthday": "1994-01-01",
            "drivers_license": "J1234567",
            "drivers_license_expiration": "2022-12-12",
            "state_medical_id": "N/A",
            "permit_expiration": "N/A",
            "email": "sample@test.com",
            "phone": "6282032916",
            "notes": "loyal customer\nprefers flower - indica dominant hybrids",
            "physician_first_name": null,
            "physician_last_name": null,
            "physician_license": null,
            "physician_address": null,
            "physician_phone": null,
            "is_caregiver": false,
            "caregiver_license_number": "",
            "caregiver_name_1": "N/A",
            "caregiver_name_2": "N/A",
            "caregiver_details": [],
            "rewards_balance": 275,
            "rewards_type": "POINTS",
            "gender": "M",
            "signup_date": "2019-04-10T23:44:07.000-07:00",
            "last_visit_date": "2020-04-23 07:42:29.000",
            "last_update": "2020-05-09T09:41:43.000-07:00",
            "opt_out": null,
            "referral_source": "Other",
            "banned": false,
            "warning_1": false,
            "warning_2": false,
            "addresses": [
                {
                    "type": "address_of_record",
                    "street1": "1611 TELEGRAPH AVE",
                    "street2": "",
                    "city": "OAKLAND",
                    "state": "CA",
                    "zipcode": "94612",
                    "primary": true
                },
                {
                    "type": "alternative_address",
                    "street1": "7000 COLISEUM WAY",
                    "street2": "",
                    "city": "OAKLAND",
                    "state": "CA",
                    "zipcode": "94621",
                    "primary": false
                },
                {
                    "type": "secondary_address",
                    "street1": "9500 STERN AVE",
                    "street2": "",
                    "city": "OAKLAND",
                    "state": "CA",
                    "zipcode": "94605",
                    "primary": false
                }
            ],
            "merged_customer_ids": [],
            "merged_into_customer_id": null,
            "patient_type": "ADULT",
            "customer_groups": [
                "INDUSTRY"
            ]
        }
        },
        {
            "event_type": "CUSTOMER",
            "data": {
                "status": "ACTIVE",
                "verification_status": "VERIFIED",
                "verification_reasons": [],
                "customer_id": "26142",
                "first_name": "GLEN",
                "middle_name": null,
                "nickname": "",
                "last_name": "SCOTLAND",
                "birthday": "1954-10-15",
                "drivers_license": "E0932916",
                "drivers_license_expiration": "2024-10-15",
                "state_medical_id": "N/A",
                "permit_expiration": "N/A",
                "email": "GLENSCOTLAND@YAHOO.COM",
                "phone": "8055092149",
                "notes": "N/A",
                "physician_first_name": null,
                "physician_last_name": null,
                "physician_license": null,
                "physician_address": null,
                "physician_phone": null,
                "is_caregiver": false,
                "caregiver_license_number": "",
                "caregiver_name_1": "N/A",
                "caregiver_name_2": "N/A",
                "caregiver_details": [],
                "rewards_balance": 290,
                "rewards_type": "POINTS",
                "gender": "U",
                "signup_date": "2021-05-31T18:32:50.000-07:00",
                "last_visit_date": "2022-08-02 12:28:56.493",
                "last_update": "2022-08-02T12:28:57.000-07:00",
                "opt_out": null,
                "referral_source": null,
                "banned": false,
                "warning_1": false,
                "warning_2": false,
                "addresses": [{
                    "type": "address_of_record",
                    "street1": "",
                    "street2": "",
                    "city": "",
                    "state": "CA",
                    "zipcode": "",
                    "primary": true
                }, {
                    "type": "secondary_address",
                    "street1": "8899 Halifax St",
                    "street2": "",
                    "city": "Ventura",
                    "state": "CA",
                    "zipcode": "93004",
                    "primary": false
                }],
                "merged_customer_ids": [],
                "merged_into_customer_id": null,
                "patient_type": "ADULT",
                "customer_groups": ["SENIOR", "VET"]
            }
        },
        {
            "event_type": "CUSTOMER",
            "data": {
                "status": "ACTIVE",
                "verification_status": "VERIFIED",
                "verification_reasons": [],
                "customer_id": "33949",
                "first_name": "KAREN",
                "middle_name": null,
                "nickname": "KALE",
                "last_name": "STARBIRD",
                "birthday": "1942-07-04",
                "drivers_license": "P0198852",
                "drivers_license_expiration": "2023-07-04",
                "state_medical_id": "N/A",
                "permit_expiration": "N/A",
                "email": "kalestar@aol.com",
                "phone": "8057985583",
                "notes": "N/A",
                "physician_first_name": null,
                "physician_last_name": null,
                "physician_license": null,
                "physician_address": null,
                "physician_phone": null,
                "is_caregiver": false,
                "caregiver_license_number": "",
                "caregiver_name_1": "N/A",
                "caregiver_name_2": "N/A",
                "caregiver_details": [],
                "rewards_balance": 31,
                "rewards_type": "POINTS",
                "gender": "F",
                "signup_date": "2022-04-03T13:00:46.000-07:00",
                "last_visit_date": "2022-08-01 12:07:51.000",
                "last_update": "2022-08-01T12:07:51.000-07:00",
                "opt_out": "false",
                "referral_source": "Word of mouth / friend",
                "banned": false,
                "warning_1": false,
                "warning_2": false,
                "addresses": [{
                    "type": "address_of_record",
                    "street1": "11816 SILVER SPUR ST",
                    "street2": "",
                    "city": "OJAI",
                    "state": "CA",
                    "zipcode": "93023",
                    "primary": true
                }],
                "merged_customer_ids": [],
                "merged_into_customer_id": null,
                "patient_type": "ADULT",
                "customer_groups": ["SENIOR", " INDUSTRY"]
            }
        }
    ]

    axios.post('http://localhost:3001/customer', custArr[num])
        .then(function (response) {
            console.log(response.status);
        })
        .catch(function (error) {
            console.log(error);
        });

        i++;
  };

//     setTimeout(() => {console.log("loop start. i is:" + i);
//     let topost;
//     if (i%10 === 0 ){
//         topost = { product_id: 'TEST', category_type: 'sushi', product_configurable_fields: {name: "rainbowRoll", brand: "Jens Best"}, pricing: {price_type: "fixed", price_sell: 420} } ;
//     }
//     else {
//         topost = prodArr[i%3];
//     }

//         axios.post('http://localhost:3001/product', topost)
//         .then(function (response) {
//             console.log(response.status);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });

//         i++;

//     }, 1500);
    
// };

(async () => {
    for (let i = 0; i< 100; i++){
        console.time("Slept for")
        await sleep(2000)
        console.timeEnd("Slept for")
        myFunc();
    }
}
)();
