async function displayProducts(category=null, type=null) {

    let products = await requestProducts(category, type);

    document.getElementById('products').innerHTML = constructProductsDiv(products);

    if (document.getElementById('category').innerHTML == "") displayFormCategoryOptions();
}

async function displayFormCategoryOptions() {

    let categories = await requestCategories()
    let content = "";

    for (let i=0; i<categories.length ; i++) {
        content += `<option value="${categories[i]}"> ${categories[i]} </option>`
    }

    document.getElementById('category').innerHTML = content;
}

function addProduct(event) {

    event.preventDefault();

    var name = document.getElementById('product_name').value;
    var category = document.getElementById('category').value;
    var type = document.getElementById('product_type').value;
    var url = document.getElementById('image_url').value;
    var price = document.getElementById('product_price').value;
    var quantity = document.getElementById('product_quantity').value;
    var description = document.getElementById('product_description').value;

    console.log(name)
    console.log(category)
    console.log(type)
    console.log(url)
    console.log(price)
    console.log(quantity)
    console.log(description)
}

function charts(event) {
    
    event.preventDefault();
    console.log("charts");
}
