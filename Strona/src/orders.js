import { MongoClient } from 'mongodb';

import {sellProduct} from './products.js';

export async function addOrder(customer_firstname, customer_lastname, product_name, quantity) {

    sellProduct(product_name, quantity);

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('Sklep');
    const collection = db.collection('orders');

    let order = {
        "customer_firstname": customer_firstname,
        "customer_lastname": customer_lastname,
        "product": product_name,
        "quantity": quantity
    }

    collection.insertOne(order, (err, result) => {
        client.close();
    });
}
