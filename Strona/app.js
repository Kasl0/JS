import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';
import parser from 'body-parser';

import {getAllCategories, getAllProducts, getCategoryProducts, getTypeProducts, addProduct} from './products.js';
import {addOrder} from './orders.js';

const adminRouter = express.Router();
const guestRouter = express.Router();

const app = express();
app.use(morgan('dev'));
app.use(parser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + '/public'))
app.set('views',__dirname + '/views');
app.set('view engine', 'pug');

guestRouter.get('/', function (req, res) {
    res.render('guest');
});

adminRouter.get('/', function (req, res) {
    res.render('admin');
});

app.post('/products', async function (req, res) {
    res.type('application/json');
    if (req.body.category=="null" && req.body.type == "null") res.json(await getAllProducts());
    else if (req.body.type == "null") res.json(await getCategoryProducts(req.body.category));
    else res.json(await getTypeProducts(req.body.category, req.body.type));
});

app.post('/categories', async function (req, res) {
    res.type('application/json');
    res.json(await getAllCategories());
});

adminRouter.post('/add', async function (req, res) {
    
    if (isNaN(req.body.product_price)) throw new Error('Product price is NaN');
    if (isNaN(req.body.product_quantity)) throw new Error('Product quantity is NaN');
    if (req.body.product_price <= 0) throw new Error('Product price <= 0');
    if (req.body.product_quantity <= 0) throw new Error('Product quantity <= 0');

    await addProduct(req.body.product_name, req.body.category, req.body.product_type, req.body.image_url, Number(req.body.product_price), req.body.product_description, Number(req.body.product_quantity));

    res.render('admin');

});

guestRouter.delete('/sell', async function (req, res) {
    
    if (isNaN(req.body.product_quantity)) throw new Error('Product quantity is NaN');
    if (req.body.product_quantity <= 0) throw new Error('Product quantity <= 0');

    await addOrder(req.body.customer_firstname, req.body.customer_lastname, req.body.product, Number(req.body.product_quantity));

    res.render('guest');

});

adminRouter.put('/charts', async function (req, res) {

    res.render('admin');

});


app.use('/', guestRouter);
app.use('/admin', adminRouter);

app.listen(8000, function () {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});
