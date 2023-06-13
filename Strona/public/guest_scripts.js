async function displayProducts(category=null, type=null) {

    let products = await requestProducts(category, type);

    let content = "";

    for (let i=0; i<products.length ; i++) {
        content += `<option value="${products[i].name}"> ${products[i].name} </option>`
    }

    document.getElementById('product').innerHTML = content;

    document.getElementById('products').innerHTML = constructProductsDiv(products);

    dragListener();
}

async function sellProduct(event) {

    event.preventDefault();
    var name = document.getElementById('product').value;
    var quantity = document.getElementById('product_quantity').value;
    var firstname = document.getElementById('customer_firstname').value;
    var lastname = document.getElementById('customer_lastname').value;
    
    let response;

    try {

        response = await fetch('http://localhost:8000/products', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `name=${encodeURIComponent(name)}&quantity=${encodeURIComponent(quantity)}&firstname=${encodeURIComponent(firstname)}&lastname=${encodeURIComponent(lastname)}`
        })
        
        if (!response.ok)
            throw Error(response.statusText);

        console.group('Fetch API');
        console.log(`HTTP method ⟶\t\tDELETE\nResponse type ⟶\tapplication/json\nInput data ⟶\t\tname=${encodeURIComponent(name)}&quantity=${encodeURIComponent(quantity)}&firstname=${encodeURIComponent(firstname)}&lastname=${encodeURIComponent(lastname)}`);
        
        let result = await response.json();

        console.log(result);
        console.groupEnd();

        document.getElementById('products').innerHTML = constructProductsDiv(result);
        dragListener();

        document.getElementById('product_quantity').value = "";
        document.getElementById('customer_firstname').value = "";
        document.getElementById('customer_lastname').value = "";

    } catch (error) {
        window.alert(error);
    }
}
