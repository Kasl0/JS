import express from 'express';
import morgan from 'morgan';
import { parse } from 'querystring';

import {pageAllProducts, pageCategoryProducts, pageTypeProducts} from './generate_page.js';
import {readCommands} from './commands.js';

const router = express.Router();
const app = express();
app.use(morgan('dev'));


router.get('/', async function (req, res) {
    res.write(await pageAllProducts());
    res.end();
});

router.get('/Komputery', async function (req, res) {
    res.write(await pageCategoryProducts("Komputery"));
    res.end();
});

router.get('/Akcesoria', async function (req, res) {
    res.write(await pageCategoryProducts("Akcesoria"));
    res.end();
});

router.get('/Akcesoria/Orginalne', async function (req, res) {
    res.write(await pageTypeProducts("Akcesoria", "Orginalne"));
    res.end();
});

router.get('/Akcesoria/Chinskie', async function (req, res) {
    res.write(await pageTypeProducts("Akcesoria", "Chińskie"));
    res.end();
});

router.post('/', async function (req, res) {
    var body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', async () => {

        let parsed = parse(body);

        await readCommands(parsed.textarea, parsed.category);

        res.write(await pageAllProducts());
        res.end();

    });
});

app.use('/', router);


app.listen(8000, function () {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});
