import {getAllCategories} from './products.js'

function constructFormCategoryOptions() {

    let content = "";

    let categories = getAllCategories();

    for (let i=0; i<categories.length ; i++) {
        content += `<option value="${categories[i]}"> ${categories[i]} </option>`
    }

    return content;
}

export var page1 = `
    <!DOCTYPE html>
    <html lang="pl">

    <head>
        <meta charset="utf-8">
        <meta name="viewport"
            content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
            crossorigin="anonymous"><!-- Icons -->
        <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
        <link rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <title>
        Sklep komputerowy
        </title>
        <style>
        .rotate-card {
            transform-style: preserve-3d;
            transition: transform 0.5s;
        }
        .rotate-card:hover {
            animation-name: spin;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            
        }
        @keyframes spin {
            from {
            transform: rotate3d(0, 0, 0, 0deg);
            perspective: 800px;
            }
            to {
            transform: rotate3d(1, 1, 0, 180deg);
            perspective: 800px;
            }
        }
        </style>
    </head>
    <body>

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="padding: 0.5rem 1rem;">
            <a class="navbar-brand" href="/">
            <canvas id="canvas" width="50" height="23"></canvas>
            Sklep komputerowy
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="/Komputery"> Komputery <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Akcesoria
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="/Akcesoria/Orginalne"> Orginalne </a>
                    <a class="dropdown-item" href="/Akcesoria/Chinskie"> Chińskie </a>
                    </div>
                </li>
                </ul>
            </div>
        </nav>

        <form method="POST" action="/" style="margin: 2rem;">
        <p> <strong> To add product: </strong> product;product_name;product_type;image_url;product_price;product_description;product_quantity</p>
        <p> <strong> To add customer: </strong> customer;firstname;lastname</p>
        <p> <strong> To sell product: </strong> sell;product_id;customer_id;quantity</p>
        <p> <strong> To display charts: </strong> check</p>
                <div class="form-group">
                    <select id="category" name="category">
                        ${constructFormCategoryOptions()}
                    </select>
                    <textarea class="form-control" rows="3" id="textarea" name="textarea"></textarea>
                </div>
                <button type="submit" class="btn btn-primary""> Submit </button>
            </form>

        <canvas id="chart" width="500" height="50"></canvas>

        <div id="products">`

export var page2 = `
    </div>
            
    <footer class="footer bg-dark text-center text-white" style="margin-top: 2rem;" fixed-bottom>

    <div class="container p-4 pb-0">
        <section class="mb-4">
        <!-- Facebook -->
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
            ><i class="fab fa-facebook-f"></i
        ></a>

        <!-- Twitter -->
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
            ><i class="fab fa-twitter"></i
        ></a>

        <!-- Google -->
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
            ><i class="fab fa-google"></i
        ></a>

        <!-- Instagram -->
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
            ><i class="fab fa-instagram"></i
        ></a>

        <!-- Linkedin -->
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
            ><i class="fab fa-linkedin-in"></i
        ></a>

        <!-- Github -->
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
            ><i class="fab fa-github"></i
        ></a>
        </section>
    </div>

    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2023 Copyright:
        <a class="text-white" href="#!"> Bydgoszcz shop </a>
    </div>

    </footer>
    

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <script>  
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle='#FFFFFF';     
    ctx.fillRect(0, 0, 23, 23);
    ctx.arc(20, 14, 10, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(31,9);
    ctx.lineTo(23,23);
    ctx.lineTo(40,23);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    </script>

    </body>
    </html>`