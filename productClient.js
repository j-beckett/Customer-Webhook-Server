const axios = require('axios');

const sleep = require('util').promisify(setTimeout)
let i = 0;

function myFunc() {
    const prodArr = [
        {
            "product_id": "c369f993-b618-44fd-b26d-dfa91af933c8",
            "product_status": "ACTIVE",
            "last_updated_at": "2021-10-19T11:24:55.351-07:00",
            "sellable_quantity": 4,
            "sellable_quantity_detail": [
              {
                "inventory_type": "ADULT",
                "location": "BUDSENSE REGINA 2",
                "sellable_quantity": 4
              }
            ],
            "category_type": "FLOWER",
            "product_configurable_fields": {
              "name": "MAC",
              "uom": "GRAMS",
              "brand": "22 RED BRO",
              "size": null,
              "amount": 3.5,
              "classification": "HYBRID",
              "total_mg_thc": 0,
              "total_mg_cbd": 0,
              "subtype": "PRE-PACK",
              "total_flower_weight_g": 0,
              "external_id": null
            },
            "pricing": {
              "price_type": "FLAT",
              "price_sell": 60,
              "tier_name": null
            },
            "attributes": {
              "general": [
                "HYBRID"
              ],
              "flavors": [
                "LEMON ",
                "EARTHY"
              ],
              "effects": [
                "MILD HEADBUZZ ",
                "UPLIFTED",
                "HAPPY",
                "MINOR COUCH LOCK"
              ],
              "ingredients": [
                "MIRACLES AND COOKIES"
              ],
              "internal_tags": []
            },
            "product_barcodes": [],
            "e_commerce": {
              "all_images": [],
              "primary_image": null,
              "menu_title": null,
              "product_description": null,
              "minimum_visible_inventory_level": 5,
              "hide_from_menu": false
            },
            "autoupdate_lab_results": true,
            "lab_results": [],
            "above_threshold": false,
            "merged_from_product_ids": [],
            "external_references": []
        },
        {
          "product_id": "22ce7a29-79de-4474-9245-c0dfcf53d126",
          "product_status": "ACTIVE",
          "last_updated_at": "2022-06-23T10:06:12.749-07:00",
          "sellable_quantity": 30,
          "sellable_quantity_detail": [
            {
              "inventory_type": "ADULT",
              "location": "BACK OF HOUSE",
              "sellable_quantity": 30
            }
          ],
          "category_type": "PILL",
          "product_configurable_fields": {
            "name": "1:1 BALANCED CAPSULES (30CT)",
            "uom": null,
            "brand": "PROOF",
            "size": null,
            "amount": 1,
            "classification": "INDICA",
            "total_mg_thc": 300,
            "total_mg_cbd": 300,
            "subtype": "CAPSULE",
            "doses": 30,
            "mg_per_dose": 10,
            "total_flower_weight_g": 0,
            "external_id": ""
          },
          "pricing": {
            "price_type": "FLAT",
            "price_sell": 48,
            "tier_name": null
          },
          "attributes": {
            "general": [],
            "flavors": [],
            "effects": [],
            "ingredients": [],
            "internal_tags": [
              "STORE FAVORITE"
            ]
          },
          "product_barcodes": [],
          "e_commerce": {
            "all_images": [
              "https://treezbuildpartnersandbox2.s3.amazonaws.com/product/1e43a152-f84f-4022-a2c6-0c66c86e9e70_22ce7a29-79de-4474-9245-c0dfcf53d126_null_17-05-22-19-36-39"
            ],
            "primary_image": "https://treezbuildpartnersandbox2.s3.amazonaws.com/product/1e43a152-f84f-4022-a2c6-0c66c86e9e70_22ce7a29-79de-4474-9245-c0dfcf53d126_null_17-05-22-19-36-39",
            "menu_title": "",
            "product_description": "Proof’s 1:1 full spectrum capsules are equal parts CBD and THC and provide a balance of mind and body, with all the benefits of CBD and the psychoactive impact of THC. Vegan, sugar-free, and gluten-free, these capsules are mixed with healthful raw coconut oil for maximum benefit and absorption. This product is great for those seeking stronger relief. Proof’s 1:1 is unique in the market with its very high potency of THC and CBD per bottle, and is always compassionately priced, so that their products combine real affordability along with high potency and unmatched quality.",
            "minimum_visible_inventory_level": 5,
            "hide_from_menu": false
          },
          "autoupdate_lab_results": true,
          "lab_results": [],
          "above_threshold": true,
          "merged_from_product_ids": [],
          "external_references": []
        } , 
        {
          "product_id": "f5631b03-c498-48cb-8a83-3b3d843225f9",
          "product_status": "ACTIVE",
          "last_updated_at": "2021-11-17T09:31:55.151-08:00",
          "sellable_quantity": 0,
          "sellable_quantity_detail": [],
          "category_type": "EDIBLE",
          "product_configurable_fields": {
            "name": "ESPRESSO BEANS SAMPLE",
            "uom": "GRAMS",
            "brand": "KIVA",
            "size": "CONE",
            "amount": 3.5,
            "classification": "SATIVA",
            "total_mg_thc": 3,
            "total_mg_cbd": 2,
            "subtype": null,
            "doses": 10,
            "mg_per_dose": 0,
            "total_flower_weight_g": 0,
            "external_id": null
          },
          "pricing": {
            "price_type": "TIER",
            "price_sell": null,
            "tier_name": "test123",
            "tier_method": "WEIGHT_GRAMS",
            "tier_pricing_detail": [
              {
                "start_value": 0,
                "price_per_value": 12
              },
              {
                "start_value": 1,
                "price_per_value": 10
              },
              {
                "start_value": 3.5,
                "price_per_value": 8
              },
              {
                "start_value": 7,
                "price_per_value": 6
              },
              {
                "start_value": 10,
                "price_per_value": 10
              },
              {
                "start_value": 14,
                "price_per_value": 5.5
              },
              {
                "start_value": 28,
                "price_per_value": 5
              }
            ]
          },
          "attributes": {
            "general": [
              "THC",
              "CBD"
            ],
            "flavors": [],
            "effects": [],
            "ingredients": [],
            "internal_tags": []
          },
          "product_barcodes": [],
          "e_commerce": {
            "all_images": [],
            "primary_image": null,
            "menu_title": "ESPRESSO PRODUCT",
            "product_description": "Some Product Description",
            "minimum_visible_inventory_level": 5,
            "hide_from_menu": true
          },
          "autoupdate_lab_results": true,
          "lab_results": [],
          "above_threshold": false,
          "merged_from_product_ids": [],
          "external_references": []
        } 
    ]

    setTimeout(() => {console.log("loop start. i is:" + i);
    let topost;
    if (i%10 === 0 ){
        topost = { product_id: 'TEST', category_type: 'sushi', product_configurable_fields: {name: "rainbowRoll", brand: "Jens Best"}, pricing: {price_type: "fixed", price_sell: 420} } ;
    }
    else {
        topost = prodArr[i%3];
    }

        axios.post('http://localhost:5000/product', topost)
        .then(function (response) {
            console.log(response.status);
        })
        .catch(function (error) {
            console.log(error);
        });

        i++;

    }, 1500);
    
};

(async () => {
    for (let i = 0; i< 100; i++){
        console.time("Slept for")
        await sleep(2000)
        console.timeEnd("Slept for")
        myFunc();
    }
}
)()



// for (let i = 0; i< 10; i++){
//     setTimeout(myFunc, 3000);

//     // setTimeout(() => {
//     //     console.log('loop starting...');
//     //     axios.post('http://localhost:3001/product', {
//     //     firstName: 'Fred',
//     //     lastName: 'Flintstone'
//     //     })
//     //     .then(function (response) {
//     //         console.log(response.status);
//     //     })
//     //     .catch(function (error) {
//     //         console.log(error);
//     //     });
//     // }, 3000)

    
// }
