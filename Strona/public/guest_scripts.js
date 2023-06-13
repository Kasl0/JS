async function displayProducts(category=null, type=null) {

    let products = await requestProducts(category, type);

    let content = "";

    for (let i=0; i<products.length ; i++) {
        content += `<option value="${products[i].name}"> ${products[i].name} </option>`
    }

    document.getElementById('product').innerHTML = content;

    document.getElementById('products').innerHTML = constructProductsDiv(products);
}

function sellProduct(event) {

    event.preventDefault();
    var quantity = document.getElementById('product_quantity').value;
    var firstname = document.getElementById('customer_firstname').value;
    var lastname = document.getElementById('customer_lastname').value;
    console.log(quantity);
    console.log(firstname);
    console.log(lastname);
}
