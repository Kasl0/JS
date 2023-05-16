import {page1, page2} from './page.js'
import {getAllProducts, getCategoryProducts, getTypeProducts} from './products.js'

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

function displayProducts(products) {

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

export function pageAllProducts() {
    return page1 + displayProducts(getAllProducts()) + page2;
}

export function pageCategoryProducts(category) {
    return page1 + displayProducts(getCategoryProducts(category)) + page2;
}

export function pageTypeProducts(category, type) {
    return page1 + displayProducts(getTypeProducts(category, type)) + page2;
}
