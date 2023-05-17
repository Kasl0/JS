import fs from 'fs-extra';

import {sellProduct} from './products.js';

var ordersJsonPath = "resources/orders.json"

export function addOrder(customer_firstname, customer_lastname, product_name, quantity) {

    let product = sellProduct(product_name, quantity);

    let order = {
        "customer_firstname": customer_firstname,
        "customer_lastname": customer_lastname,
        "product": product
    }
    
    let file_content = fs.readFileSync(ordersJsonPath);
    let jsonData = JSON.parse(file_content);

    jsonData.orders.push(order);

    fs.writeFileSync(ordersJsonPath, JSON.stringify(jsonData));
}
