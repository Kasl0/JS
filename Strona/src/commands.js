import fs from 'fs-extra';

import {addProduct} from './products.js';

export function readCommands(content, category) {
    
    var commands = content.split('\n');

    for (var i = 0; i < commands.length; i++) {
        try {
            commandInterpreter(commands[i], category);
        } catch (error) {
            console.error(error.message);
        }
    }
}

function commandInterpreter(command, category) {

    var args = command.split(';');

    //product;<product_name>;<product_type>;<image_url>;<product_price>;<product_description>;<product_quantity>
    if (args[0] == "product") {
        var name = args[1];
        var type = args[2];
        var url = args[3];
        var price = args[4];
        var description = args[5];
        var quantity = args[6];

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

function addCustomer(firstname, lastname) {

    var customer = {
        firstname: firstname,
        lastname: lastname
    };

    /*var transaction = db.transaction(["customers"], "readwrite");
    var customersStore = transaction.objectStore("customers");

    var addRequest = customersStore.add(customer);

    addRequest.onsuccess = function(event) {
        console.log("Customer " + customer.firstname + " " + customer.lastname + " added to customersStore");
    };
    addRequest.onerror = function(event) {
        console.error("Error adding customer " + customer.firstname + " " + customer.lastname + " to customersStore");
    };*/
}

function addOrder(customer_id, product_id, quantity) {

    var order = {
        customer_id: customer_id,
        product_id: product_id,
        quantity: quantity
    };

    /*var transaction = db.transaction(["products"], "readwrite");
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
    };*/
}

function selectRandomCustomers(n) {
    let customerIds = [];
    let customerNames = []

    /*const transaction = db.transaction("customers", "readonly");
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
    };*/

}

function calculateTotalSpents(ids, names) {

    /*var total_spent = [0, 0, 0];
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
    }*/
}


/*
customer;Zbigniew;Stonoga
customer;Adam;Małysz
customer;Marian;Kowalski
customer;Jonasz;Gajewski
product;Zephyr;Zestaw;https://itmedia.pl/wp-content/uploads/2023/01/Komputer-stacjonarny-Work-Designer-case3-900x600.jpg;5000;<ul><li>Procesor: Intel Core i9-11900K</li><li>Płyta główna: ASUS ROG Maximus XIII Hero</li><li>Karta graficzna: NVIDIA GeForce RTX 3080 Ti</li><li>Pamięć RAM: G.Skill Trident Z RGB DDR4 32GB</li><li>Dysk twardy: Samsung 970 EVO Plus NVMe SSD 1TB</li><li>Napęd optyczny: LG WH16NS60 16x Blu-ray Burner</li><li>Zasilacz: Corsair RM850x 850W 80+ Gold Certified Fully Modular</li><li>Klawiatura: Logitech G915 TKL Wireless Mechanical Gaming Keyboard</li><li>Mysz: Razer DeathAdder V2 Pro Wireless Gaming Mouse</li><li>Monitor: ASUS ROG Swift PG279QZ 27" 1440p 165Hz IPS</li></ul>;10
product;Turbomysz;Orginalne;https://www.laptopypoznan.pl/img/cms/blog%20-%20zdj%C4%99cia/Myszka%20komputerowa.jpg;200;TurboMyszka to mysz komputerowa z dodatkowymi funkcjami i przyciskami, które pozwalają na bardziej precyzyjne i szybkie działanie. Jest szczególnie przydatna dla graczy i osób wykonujących zadania wymagające dużej precyzji, takich jak edycja zdjęć i wideo. Dzięki możliwości dostosowania ustawień myszki do indywidualnych preferencji użytkownika, TurboMyszka umożliwia jeszcze większą kontrolę i skuteczność w pracy na komputerze.;10
product;Tronix;Chińskie;https://voicebot.ai/wp-content/uploads/2020/06/mi-mouse.png;100;Tronix to chińska myszka komputerowa, która nie zawsze oferuje wysoką jakość wykonania i nie zawsze działa zgodnie z oczekiwaniami użytkowników. Choć jest dostępna w niskiej cenie, jej wydajność i trwałość pozostawiają wiele do życzenia. Warto więc zastanowić się nad zakupem myszy z innej marki, aby uniknąć problemów z jakością i wydajnością.;20
product;TurboPC;Zestaw;https://a.allegroimg.com/original/1ed934/9c0ca9e64787a5014dbda00f700d;2800;<ul><li>Procesor: AMD Ryzen 9 5900X</li><li>Płyta główna: MSI MPG B550 Gaming Edge WiFi</li><li>Karta graficzna: AMD Radeon RX 6800 XT</li><li>Pamięć RAM: Corsair Vengeance RGB Pro 32GB DDR4 3600MHz</li><li>Dysk twardy: Western Digital Black SN850 NVMe SSD 1TB</li><li>Napęd optyczny: brak</li><li>Zasilacz: EVGA SuperNOVA 850W 80+ Gold Certified Fully Modular</li><li>Klawiatura: Ducky One 2 Mini RGB Mechanical Keyboard</li><li>Mysz: SteelSeries Rival 650 Wireless Gaming Mouse</li><li>Monitor: LG 27GL83A-B 27" 1440p 144Hz IPS</li></ul>;10
sell;1;1;4
sell;2;2;5
sell;2;3;10
sell;3;2;10
sell;3;3;5
*/