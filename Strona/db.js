var db;

function initIndexedDB() {

    var name = "Sklep";
    var version = 2;

    var request = indexedDB.open(name, version);

    request.onerror = function(event) {
        console.error("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Database opened successfully");
        displayAll();
    };

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        console.log("Database upgraded");

        var productsStore = db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
        productsStore.createIndex('name', 'name', { unique: true });
        productsStore.createIndex('category', 'category', { unique: false });
        productsStore.createIndex('type', 'type', { unique: false });
        productsStore.createIndex('url', 'url', { unique: false });
        productsStore.createIndex('price', 'price', { unique: false });
        productsStore.createIndex('description', 'description', { unique: false });

        var customersStore = db.createObjectStore('customers', { keyPath: 'id', autoIncrement: true });
        customersStore.createIndex('firstname', 'firstname', { unique: false });
        customersStore.createIndex('lastname', 'lastname', { unique: false });

        var ordersStore = db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true });
        ordersStore.createIndex('customer_id', 'customer_id', { unique: false });
        ordersStore.createIndex('product_id', 'product_id', { unique: false });
        ordersStore.createIndex('quantity', 'quantity', { unique: false });
    };

    console.log("Database init completed");
}

function readCommands() {

    var content = document.getElementById("textarea").value;
    
    var commands = content.split('\n');

    for (var i = 0; i < commands.length; i++) {
        try {
            commandInterpreter(commands[i]);
        } catch (error) {
            console.error(error.message);
        }
    }

    document.getElementById("textarea").value = "";
}

function commandInterpreter(command) {

    var args = command.split(';');

    //product;<product_name>;<product_category>;<product_type>;<image_url>;<product_price>;<product_description>;<product_quantity>
    if (args[0] == "product") {
        var name = args[1];
        var category = args[2];
        var type = args[3];
        var url = args[4];
        var price = args[5];
        var description = args[6];
        var quantity = args[7];

        if(isNaN(price)) throw new Error('Price is NaN');
        if(isNaN(quantity)) throw new Error('Quantity is NaN');
        if(price <= 0) throw new Error('Price <= 0');
        if(quantity <= 0) throw new Error('Quantity <= 0');

        addProduct(name, category, type, url, Number(price), description, Number(quantity));
    }

    //customer;<firstname>;<lastname>
    else if (args[0] == "customer") {
        var firstname = args[1];
        var lastname = args[2];
        addCustomer(firstname, lastname);
    }

    //sell;<product_id>;<customer_id>;<quantity>
    else if (args[0] == "sell") {
        var product_id = args[1];
        var customer_id = args[2];
        var quantity = args[3];

        if(isNaN(quantity)) throw new Error('Quantity is NaN');
        if(quantity <= 0) throw new Error('Quantity <= 0');

        addOrder(Number(customer_id), Number(product_id), Number(quantity));
    }

    //check
    else if (args[0] == "check") {
        selectRandomCustomers(3);
    }

    else {
        console.error("Invalid command: " + args[0]);
    }
}

function addProduct(name, category, type, url, price, description, quantity) {

    var product = {
        name: name,
        category: category,
        type: type,
        url: url,
        price: price,
        description: description,
        quantity: quantity
    };

    var transaction = db.transaction(["products"], "readwrite");
    var productsStore = transaction.objectStore("products");

    var productNameIndex = productsStore.index("name");
    var request = productNameIndex.get(product.name);

    request.onsuccess = function(event) {
        var existingProduct = event.target.result;

        if (existingProduct) {
            throw new Error("Product with name " + existingProduct.name + " already exists");
        }
        else {
            var addRequest = productsStore.add(product);

            addRequest.onsuccess = function(event) {
                displayAll();
                console.log("Product " + product.name + " added to productsStore");
            };
            addRequest.onerror = function(event) {
                console.error("Error adding product " + product.name);
            };
        }
    };
}

function addCustomer(firstname, lastname) {

    var customer = {
        firstname: firstname,
        lastname: lastname
    };

    var transaction = db.transaction(["customers"], "readwrite");
    var customersStore = transaction.objectStore("customers");

    var addRequest = customersStore.add(customer);

    addRequest.onsuccess = function(event) {
        console.log("Customer " + customer.firstname + " " + customer.lastname + " added to customersStore");
    };
    addRequest.onerror = function(event) {
        console.error("Error adding customer " + customer.firstname + " " + customer.lastname + " to customersStore");
    };
}

function addOrder(customer_id, product_id, quantity) {

    var order = {
        customer_id: customer_id,
        product_id: product_id,
        quantity: quantity
    };

    var transaction = db.transaction(["products"], "readwrite");
    var productsStore = transaction.objectStore("products");
    var request = productsStore.get(product_id);

    request.onerror = function(event) {
        console.error("Error checking if ID exists");
    };
    
    request.onsuccess = function(event) {
        var product = request.result;
        if (product) {

            if(product.quantity - order.quantity >= 0) {

                product.quantity -= order.quantity;
                var updateRequest = productsStore.put(product);
                
                updateRequest.onerror = function(event) {
                    console.error("Error updating product quantity");
                };
                updateRequest.onsuccess = function(event) {
                    console.log("Product quantity updated");
                };

                var transaction = db.transaction(["orders"], "readwrite");
                var ordersStore = transaction.objectStore("orders");

                var addRequest = ordersStore.add(order);

                addRequest.onsuccess = function(event) {
                    console.log("Order added to ordersStore");
                };
                addRequest.onerror = function(event) {
                    console.error("Error adding order to ordersStore");
                };
            }
            else {
                console.error("product.quantity - order.quantity < 0");
            }
            

        } else {
            console.error("Product with ID " + product_id + " does not exist");
        }
    };
}

function selectRandomCustomers(n) {
    let customerIds = [];
    let customerNames = []

    const transaction = db.transaction("customers", "readonly");
    const customerStore = transaction.objectStore("customers");
    const request = customerStore.openCursor();

    request.onsuccess = (event) => {
        const cursor = event.target.result;

        if (cursor) {
            customerIds.push(cursor.value.id);
            customerNames.push(cursor.value.firstname + " " + cursor.value.lastname);
            cursor.continue();
        } else {

            var randomIds = [];
            var randomNames = [];

            while (randomIds.length < n) {
                const randomIndex = Math.floor(Math.random() * customerIds.length);
                const randomId = customerIds[randomIndex];
                const randomName = customerNames[randomIndex];

                if (!randomIds.includes(randomId)) {
                    randomIds.push(randomId);
                    randomNames.push(randomName);
                }
            }

            calculateTotalSpents(randomIds, randomNames);
        }
    };

    request.onerror = (event) => {
        console.error(event.target.error);
    };

}

function calculateTotalSpents(ids, names) {

    var total_spent = [0, 0, 0];
    var transaction = db.transaction(["orders", "products"], "readonly");
    var ordersStore = transaction.objectStore("orders");
    var productsStore = transaction.objectStore("products");

    ordersStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {

            if (ids.includes(cursor.value.customer_id)) {
                productsStore.get(cursor.value.product_id).onsuccess = function(event) {
                    var product = event.target.result;
                    for (let i=0;i<3;i++) {
                        if (ids[i] == cursor.value.customer_id) total_spent[i] += product.price * cursor.value.quantity;
                    }
                }
            }
            cursor.continue();

        } else {

            console.log("Total spent by customers " + names + ": " + total_spent);

            const ctx = document.getElementById('chart').getContext('2d');

            if (Chart.getChart("chart")) {
                Chart.getChart("chart").destroy();
            }

            const data = {
                labels: names,
                datasets: [{
                    label: 'Sumaryczna cena zakupów',
                    data: total_spent,
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            };

            const myChart = new Chart(ctx, {
                type: 'bar',
                data: data
            });
        }
    }
}

function constructProductDiv(product) {

    var productDiv = document.createElement("div");
    productDiv.className = "col-xxl-4 col-lg-6";

    var productCard = document.createElement("div");
    productCard.className = "card rotate-card";
    productCard.style.width = "25rem";
    productCard.style.margin = "2rem";

    var productImg = document.createElement("img");
    productImg.className = "card-img-top";
    productImg.src = product.url;

    var productBody = document.createElement("div");
    productBody.className = "card-body";

    var productName = document.createElement("h3");
    productName.style.marginBottom = "0.1rem";
    productName.className = "card-title";
    productName.textContent = product.name;
    var productCategory = document.createElement("p");
    productCategory.textContent = product.category + ", " + product.type;
    productBody.appendChild(productName);
    productBody.appendChild(productCategory);

    var productDesc = document.createElement("div");
    productDesc.innerHTML = product.description;
    productBody.appendChild(productDesc);

    var productPrice = document.createElement("h5");
    productPrice.style.marginTop = "1rem";
    productPrice.style.marginBottom = "0.1rem";
    productPrice.textContent = product.price + " zł";
    var productQuantity = document.createElement("p");
    productQuantity.textContent = product.quantity + " sztuk";
    productBody.appendChild(productPrice);
    productBody.appendChild(productQuantity);
    
    productCard.appendChild(productImg);
    productCard.appendChild(productBody);
    productDiv.appendChild(productCard);

    return productDiv;
}

function displayProducts(products) {
    var productsDiv = document.getElementById("products");
    productsDiv.innerHTML = "";

    const cardsPerRow = 3;

    for (var i = 0; i < products.length; i++) {

        if (i % cardsPerRow == 0) {
            const newRow = document.createElement('div');
            newRow.classList.add('row');
            productsDiv.appendChild(newRow);
        }

        const lastRow = productsDiv.lastElementChild;
        lastRow.appendChild(constructProductDiv(products[i]));
    }
}

function displayCategory(category) {

    var transaction = db.transaction(["products"], "readonly");
    var productsStore = transaction.objectStore("products");

    var categoryIndex = productsStore.index("category");
    var getCategoryProducts = categoryIndex.getAll(category);

    getCategoryProducts.onsuccess = function() {
        displayProducts(getCategoryProducts.result);
    }
}

function displayType(type) {

    var transaction = db.transaction(["products"], "readonly");
    var productsStore = transaction.objectStore("products");

    var typeIndex = productsStore.index("type");
    var getTypeProducts = typeIndex.getAll(type);

    getTypeProducts.onsuccess = function() {
        displayProducts(getTypeProducts.result);
    }
}

function displayAll() {

    var transaction = db.transaction(["products"], "readonly");
    var productsStore = transaction.objectStore("products");

    var getAllProducts = productsStore.getAll();

    getAllProducts.onsuccess = function() {
        displayProducts(getAllProducts.result);
    }
}


initIndexedDB();

/*
customer;Zbigniew;Stonoga
customer;Adam;Małysz
customer;Marian;Kowalski
customer;Jonasz;Gajewski
product;Zephyr;Komputery;Zestaw;https://itmedia.pl/wp-content/uploads/2023/01/Komputer-stacjonarny-Work-Designer-case3-900x600.jpg;5000;<ul><li>Procesor: Intel Core i9-11900K</li><li>Płyta główna: ASUS ROG Maximus XIII Hero</li><li>Karta graficzna: NVIDIA GeForce RTX 3080 Ti</li><li>Pamięć RAM: G.Skill Trident Z RGB DDR4 32GB</li><li>Dysk twardy: Samsung 970 EVO Plus NVMe SSD 1TB</li><li>Napęd optyczny: LG WH16NS60 16x Blu-ray Burner</li><li>Zasilacz: Corsair RM850x 850W 80+ Gold Certified Fully Modular</li><li>Klawiatura: Logitech G915 TKL Wireless Mechanical Gaming Keyboard</li><li>Mysz: Razer DeathAdder V2 Pro Wireless Gaming Mouse</li><li>Monitor: ASUS ROG Swift PG279QZ 27" 1440p 165Hz IPS</li></ul>;10
product;Turbomysz;Akcesoria;Orginalne;https://www.laptopypoznan.pl/img/cms/blog%20-%20zdj%C4%99cia/Myszka%20komputerowa.jpg;200;TurboMyszka to mysz komputerowa z dodatkowymi funkcjami i przyciskami, które pozwalają na bardziej precyzyjne i szybkie działanie. Jest szczególnie przydatna dla graczy i osób wykonujących zadania wymagające dużej precyzji, takich jak edycja zdjęć i wideo. Dzięki możliwości dostosowania ustawień myszki do indywidualnych preferencji użytkownika, TurboMyszka umożliwia jeszcze większą kontrolę i skuteczność w pracy na komputerze.;10
product;Tronix;Akcesoria;Chińskie;https://voicebot.ai/wp-content/uploads/2020/06/mi-mouse.png;100;Tronix to chińska myszka komputerowa, która nie zawsze oferuje wysoką jakość wykonania i nie zawsze działa zgodnie z oczekiwaniami użytkowników. Choć jest dostępna w niskiej cenie, jej wydajność i trwałość pozostawiają wiele do życzenia. Warto więc zastanowić się nad zakupem myszy z innej marki, aby uniknąć problemów z jakością i wydajnością.;20
product;TurboPC;Komputery;Zestaw;https://a.allegroimg.com/original/1ed934/9c0ca9e64787a5014dbda00f700d;2800;<ul><li>Procesor: AMD Ryzen 9 5900X</li><li>Płyta główna: MSI MPG B550 Gaming Edge WiFi</li><li>Karta graficzna: AMD Radeon RX 6800 XT</li><li>Pamięć RAM: Corsair Vengeance RGB Pro 32GB DDR4 3600MHz</li><li>Dysk twardy: Western Digital Black SN850 NVMe SSD 1TB</li><li>Napęd optyczny: brak</li><li>Zasilacz: EVGA SuperNOVA 850W 80+ Gold Certified Fully Modular</li><li>Klawiatura: Ducky One 2 Mini RGB Mechanical Keyboard</li><li>Mysz: SteelSeries Rival 650 Wireless Gaming Mouse</li><li>Monitor: LG 27GL83A-B 27" 1440p 144Hz IPS</li></ul>;10
sell;1;1;4
sell;2;2;5
sell;2;3;10
sell;3;2;10
sell;3;3;5
*/
