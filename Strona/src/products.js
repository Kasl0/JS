import fs from 'fs-extra';

export function getAllCategories() {

    var files = fs.readdirSync("resources");

    for (let i=0 ; i < files.length ; i++) {
        files[i] = files[i].substring(0, files[i].lastIndexOf('.'));
    }

    return files;
}

export function getAllProducts() {

    var products = []

    var files = fs.readdirSync("resources");

    for (let i=0 ; i < files.length ; i++) {

        let file_content = fs.readFileSync("resources/" + files[i]);
        let jsonData = JSON.parse(file_content);

        for (let j=0 ; j < jsonData.products.length ; j++) {

            let product = {
                name: jsonData.products[j].name,
                category: files[i].substring(0, files[i].lastIndexOf('.')),
                type: jsonData.products[j].type,
                url: jsonData.products[j].image_url,
                price: jsonData.products[j].price,
                description: jsonData.products[j].description,
                quantity: jsonData.products[j].quantity
            };

            products.push(product);
        }
    }

    return products;
}

export function getCategoryProducts(category) {

    var products = []
    
    let file_content = fs.readFileSync("resources/" + category + ".json");
    let jsonData = JSON.parse(file_content);

    for (let j=0 ; j < jsonData.products.length ; j++) {

        let product = {
            name: jsonData.products[j].name,
            category: category,
            type: jsonData.products[j].type,
            url: jsonData.products[j].image_url,
            price: jsonData.products[j].price,
            description: jsonData.products[j].description,
            quantity: jsonData.products[j].quantity
        };

        products.push(product);
    }

    return products;
}

export function getTypeProducts(category, type) {

    var products = []

    let file_content = fs.readFileSync("resources/" + category + ".json");
    let jsonData = JSON.parse(file_content);

    for (let j=0 ; j < jsonData.products.length ; j++) {

        if (jsonData.products[j].type == type) {

            let product = {
                name: jsonData.products[j].name,
                category: category,
                type: jsonData.products[j].type,
                url: jsonData.products[j].image_url,
                price: jsonData.products[j].price,
                description: jsonData.products[j].description,
                quantity: jsonData.products[j].quantity
            };
    
            products.push(product);
        }
    }

    return products;
}

export function addProduct(name, category, type, url, price, description, quantity) {

    if (getAllCategories().includes(category)) {

        let file_content = fs.readFileSync("resources/" + category + ".json");
        let jsonData = JSON.parse(file_content);

        let product = {
            name: name,
            type: type,
            quantity: quantity,
            price: price,
            image_url: url,
            description: description
        };

        jsonData.products.push(product);

        fs.writeFileSync("resources/" + category + ".json", JSON.stringify(jsonData));

    }
    
    else {
        console.log("There is no such category!");
    }
}
