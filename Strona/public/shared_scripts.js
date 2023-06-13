function constructProductDiv(product) {

    let productDiv = `
    <div class="col-xxl-4 col-lg-6">
        <div class="card dropzone ${product.quantity <= 0 ? 'bg-danger' : ''}" style="width: 25rem; margin: 2rem;">
            <img id='${product.name}' class="card-img-top" src="${product.url}" alt="Komputer" draggable="true">
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

var dragged_name;

async function dragListener(targetListener=false) {

    const cards = document.querySelectorAll(".card-img-top");

    cards.forEach(card => {

        card.addEventListener('dragstart', (event) => {
            dragged_name = event.target.id;
            event.target.classList.add("dragging");
        });

        card.addEventListener('drag', (event) => {
            console.log("dragging");
        });

        card.addEventListener('dragend', (event) => {
            event.target.classList.remove("dragging");
        });
    });

    if (targetListener) {

        const target = document.getElementById('droptarget');
        
        target.addEventListener(
            "dragover",
            (event) => {
                event.preventDefault();
            },
            false
        );

        target.addEventListener("dragenter", (event) => {
            if (event.target.classList.contains("dropzone")) {
                event.target.classList.add("dragover");
            }
        });

        target.addEventListener("dragleave", (event) => {
            if (event.target.classList.contains("dropzone")) {
                event.target.classList.remove("dragover");
            }
        });

        target.addEventListener("drop", async function dropfunction(event) {
            event.preventDefault();
            if (event.target.classList.contains("dropzone")) {
                event.target.classList.remove("dragover");
                
                let response;

                try {

                    response = await fetch('http://localhost:8000/products', {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `name=${encodeURIComponent(dragged_name)}&quantity=${encodeURIComponent(1)}&firstname=${encodeURIComponent("-")}&lastname=${encodeURIComponent("-")}`
                    })
                    
                    if (!response.ok)
                        throw Error(response.statusText);

                    console.group('Fetch API');
                    console.log(`HTTP method ⟶\t\tDELETE\nResponse type ⟶\tapplication/json\nInput data ⟶\t\tname=${encodeURIComponent(dragged_name)}&quantity=${encodeURIComponent(1)}&firstname=${encodeURIComponent("-")}&lastname=${encodeURIComponent("-")}`);
                    
                    let result = await response.json();

                    console.log(result);
                    console.groupEnd();

                    document.getElementById('products').innerHTML = constructProductsDiv(result);
                    dragListener();

                } catch (error) {
                    window.alert(error);
                }
            }
        });
    }
}
