import {head_and_nav, add_product_form, sell_product_form, charts_display_form, after_form, page_end} from './page.js'
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

export async function pageAllProducts(isAdmin) {
    if (isAdmin)
        return head_and_nav + add_product_form + charts_display_form + after_form + displayProducts(await getAllProducts()) + page_end;
    else
        return head_and_nav + sell_product_form + after_form + displayProducts(await getAllProducts()) + page_end;
}

export async function pageCategoryProducts(isAdmin, category) {
    if (isAdmin)
        return head_and_nav + add_product_form + charts_display_form + after_form + displayProducts(await getCategoryProducts(category)) + page_end;
    else
        return head_and_nav + sell_product_form + after_form + displayProducts(await getCategoryProducts(category)) + page_end;
}

export async function pageTypeProducts(isAdmin, category, type) {
    if (isAdmin)
        return head_and_nav + add_product_form + charts_display_form + after_form + displayProducts(await getTypeProducts(category, type)) + page_end;
    else
        return head_and_nav + sell_product_form + after_form + displayProducts(await getTypeProducts(category, type)) + page_end;
}
