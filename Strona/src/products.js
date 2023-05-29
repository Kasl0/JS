import { MongoClient } from 'mongodb';

export async function getAllCategories() {

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('Sklep');
    const collection = db.collection('products');
    const categories = await collection.distinct('category')

    client.close();

    return categories;
}

export async function getAllProducts() {

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('Sklep');
    const collection = db.collection('products');
    const products = await collection.find({}).toArray();

    client.close();

    return products;
}

export async function getCategoryProducts(category) {

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('Sklep');
    const collection = db.collection('products');
    const products = await collection.find({category: category}).toArray();

    client.close();

    return products;
}

export async function getTypeProducts(category, type) {

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('Sklep');
    const collection = db.collection('products');
    const products = await collection.find({category: category, type: type}).toArray();

    client.close();

    return products;
}

export async function addProduct(name, category, type, url, price, description, quantity) {

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('Sklep');
    const collection = db.collection('products');

    let product = {
        name: name,
        category: category,
        type: type,
        quantity: quantity,
        price: price,
        url: url,
        description: description
    };

    collection.insertOne(product, (err, result) => {
        res.json({ message: 'Produkt został dodany', productId: result.insertedId });
        client.close();
    });
}

export async function sellProduct(name, quantity) {

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('Sklep');
    const collection = db.collection('products');

    collection.updateOne({ name: name }, { $inc: { quantity: -quantity } }, (err, product) => {
        client.close();
    });
}
