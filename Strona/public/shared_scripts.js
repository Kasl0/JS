function constructProductDiv(product) {

    let productDiv = `
    <div class="col-xxl-4 col-lg-6">
        <div class="card rotate-card" style="width: 25rem; margin: 2rem;">
            <img class="card-img-top" src="${product.url}" alt="Komputer">
            <div class="card-body">
                <h3 class="card-title" style="margin-bottom: 0.1rem;"> ${product.name} </h3>
                <p> ${product.category}, ${product.type} </p>
                <div> ${product.description} </div>
                <h5 style="margin-top: 1rem; margin-bottom: 0.1rem;"> ${product.price} zł </h5>
                <p> ${product.quantity} sztuk </p>
            </div>
        </div>
    </div>
    `;

    return productDiv;
}

function constructProductsDiv(products) {

    let productsDiv = ""

    let cardsPerRow = 3;

    for (let i = 0; i < products.length; i++) {

        if (i % cardsPerRow == 0) productsDiv += "<div class='row'>";

        productsDiv += constructProductDiv(products[i]);

        if (i % cardsPerRow == 2) productsDiv += "</div>";
    }

    if (products.length % cardsPerRow != 0) productsDiv += "</div>";

    return productsDiv;
}

async function requestProducts(category, type) {

    let response;
    let result;

    try {

        response = await fetch('http://localhost:8000/products', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `category=${encodeURIComponent(category)}&type=${encodeURIComponent(type)}`
        })
        
        if (!response.ok)
            throw Error(response.statusText);

        console.group('Fetch API');
        console.log(`HTTP method ⟶\t\tPOST\nResponse type ⟶\tapplication/json\nInput data ⟶\t\tcategory=${encodeURIComponent(category)} type=${encodeURIComponent(type)}`);
        
        result = await response.json();

        console.log(result);
        console.groupEnd();

    } catch (error) {
        window.alert(error);
    }

    return result;
}

async function requestCategories() {

    let response;
    let result;

    try {

        response = await fetch('http://localhost:8000/categories', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        
        if (!response.ok)
            throw Error(response.statusText);

        console.group('Fetch API');
        console.log(`HTTP method ⟶\t\tPOST\nResponse type ⟶\tapplication/json\n`);
        
        result = await response.json();

        console.log(result);
        console.groupEnd();

    } catch (error) {
        window.alert(error);
    }

    return result;
}
