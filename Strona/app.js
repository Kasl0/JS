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


// views

guestRouter.get('/', function (req, res) {
    res.render('guest');
});

adminRouter.get('/', function (req, res) {
    res.render('admin');
});


// products and categories requests

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


// product sell

guestRouter.delete('/products', async function (req, res) {
    
    if (isNaN(req.body.quantity)) throw new Error('Product quantity is NaN');
    if (req.body.quantity <= 0) throw new Error('Product quantity <= 0');

    await addOrder(req.body.firstname, req.body.lastname, req.body.name, Number(req.body.quantity));

    res.json(await getAllProducts());
});


// new product

adminRouter.put('/products', async function (req, res) {
    
    if (isNaN(req.body.price)) throw new Error('Product price is NaN');
    if (isNaN(req.body.quantity)) throw new Error('Product quantity is NaN');
    if (req.body.price <= 0) throw new Error('Product price <= 0');
    if (req.body.quantity <= 0) throw new Error('Product quantity <= 0');

    await addProduct(req.body.name, req.body.category, req.body.type, req.body.url, Number(req.body.price), req.body.description, Number(req.body.quantity));

    res.json(await getAllProducts());

});


// charts

adminRouter.post('/charts', async function (req, res) {
    res.json(await getAllProducts());
});


app.use('/', guestRouter);
app.use('/admin', adminRouter);

app.listen(8000, function () {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});
