async function displayProducts(category=null, type=null) {

    let products = await requestProducts(category, type);

    document.getElementById('products').innerHTML = constructProductsDiv(products);

    if (document.getElementById('category').innerHTML == "") displayFormCategoryOptions();

    dragListener();
}

async function displayFormCategoryOptions() {

    let categories = await requestCategories()
    let content = "";

    for (let i=0; i<categories.length ; i++) {
        content += `<option value="${categories[i]}"> ${categories[i]} </option>`
    }

    document.getElementById('category').innerHTML = content;
}

async function addProduct(event) {

    event.preventDefault();

    var name = document.getElementById('product_name').value;
    var category = document.getElementById('category').value;
    var type = document.getElementById('product_type').value;
    var url = document.getElementById('image_url').value;
    var price = document.getElementById('product_price').value;
    var quantity = document.getElementById('product_quantity').value;
    var description = document.getElementById('product_description').value;

    let response;

    try {

        response = await fetch('http://localhost:8000/admin/products', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `name=${encodeURIComponent(name)}&category=${encodeURIComponent(category)}&type=${encodeURIComponent(type)}&url=${encodeURIComponent(url)}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(quantity)}&description=${encodeURIComponent(description)}`
        })
        
        if (!response.ok)
            throw Error(response.statusText);

        console.group('Fetch API');
        console.log(`HTTP method ⟶\t\tGET\nResponse type ⟶\tapplication/json\nInput data ⟶\t\tname=${encodeURIComponent(name)}&category=${encodeURIComponent(category)}&type=${encodeURIComponent(type)}&url=${encodeURIComponent(url)}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(quantity)}&description=${encodeURIComponent(description)}`);
        
        let result = await response.json();

        console.log(result);
        console.groupEnd();

        document.getElementById('products').innerHTML = constructProductsDiv(result);
        dragListener();

    } catch (error) {
        window.alert(error);
    }

    document.getElementById('product_name').value = "";
    document.getElementById('product_type').value = "";
    document.getElementById('image_url').value = "";
    document.getElementById('product_price').value = "";
    document.getElementById('product_quantity').value = "";
    document.getElementById('product_description').value = "";
}

async function charts(event) {
    
    event.preventDefault();

    let response;

    try {

        response = await fetch('http://localhost:8000/admin/charts', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        
        if (!response.ok)
            throw Error(response.statusText);

        console.group('Fetch API');
        console.log(`HTTP method ⟶\t\tGET\nResponse type ⟶\tapplication/json\n`);
        
        let result = await response.json();

        console.log(result);
        console.groupEnd();

        document.getElementById('products').innerHTML = constructProductsDiv(result);
        dragListener();

    } catch (error) {
        window.alert(error);
    }
}
