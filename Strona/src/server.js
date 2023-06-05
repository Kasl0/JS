import express from 'express';
import morgan from 'morgan';
import parser from 'body-parser';

import {pageAllProducts, pageCategoryProducts, pageTypeProducts} from './generate_page.js';
import {addProduct} from './products.js';
import {addOrder} from './orders.js';

const adminRouter = express.Router();
const guestRouter = express.Router();
const app = express();
app.use(morgan('dev'));
app.use(parser.urlencoded({ extended: true }));


guestRouter.get('/', async function (req, res) {
    res.write(await pageAllProducts());
    res.end();
});

adminRouter.get('/', async function (req, res) {
    res.write(await pageAllProducts(true));
    res.end();
});

guestRouter.get('/Komputery', async function (req, res) {
    res.write(await pageCategoryProducts("Komputery"));
    res.end();
});

guestRouter.get('/Akcesoria', async function (req, res) {
    res.write(await pageCategoryProducts("Akcesoria"));
    res.end();
});

guestRouter.get('/Akcesoria/Orginalne', async function (req, res) {
    res.write(await pageTypeProducts("Akcesoria", "Orginalne"));
    res.end();
});

guestRouter.get('/Akcesoria/Chinskie', async function (req, res) {
    res.write(await pageTypeProducts("Akcesoria", "Chińskie"));
    res.end();
});

adminRouter.post('/add', async function (req, res) {
    
    if (isNaN(req.body.product_price)) throw new Error('Product price is NaN');
    if (isNaN(req.body.product_quantity)) throw new Error('Product quantity is NaN');
    if (req.body.product_price <= 0) throw new Error('Product price <= 0');
    if (req.body.product_quantity <= 0) throw new Error('Product quantity <= 0');

    await addProduct(req.body.product_name, req.body.category, req.body.product_type, req.body.image_url, Number(req.body.product_price), req.body.product_description, Number(req.body.product_quantity));

    res.write(await pageAllProducts(true));
    res.end();

});

guestRouter.post('/sell', async function (req, res) {
    
    if (isNaN(req.body.product_quantity)) throw new Error('Product quantity is NaN');
    if (req.body.product_quantity <= 0) throw new Error('Product quantity <= 0');

    await addOrder(req.body.customer_firstname, req.body.customer_lastname, req.body.product, Number(req.body.product_quantity));

    res.write(await pageAllProducts());
    res.end();

});

adminRouter.post('/charts', async function (req, res) {

    res.write(await pageAllProducts(true));
    res.end();

});


app.use('/', guestRouter);
app.use('/admin', adminRouter);

app.listen(8000, function () {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});
