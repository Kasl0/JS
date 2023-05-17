import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'querystring';

/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views',__dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug'); // Use the 'Pug' template system
app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment

/* ************************************************ */

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public')); 

/* ******** */
/* "Routes" */
/* ******** */

app.get('/', function (request, response) {

    let students = [
        {
              fname: 'Jan',
              lname: 'Kowalski'
        },
        {
              fname: 'Anna',
              lname: 'Nowak'
        },
    ];

    response.render('index', { students: students}); // Render the 'index' view
});

app.post('/', function (request, response) {
    // Processing the form content, if the relative URL is '/', and the POST method was used to send data to the server'
    /* ************************************************** */
    // Setting an answer header — we inform the browser that the returned data is plain text
    response.set('Content-Type', 'text/plain');

    var body = '';
    request.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    request.on('end', () => {

        /* ************************************************** */
        // Place given data (here: 'Hello <name>') in the body of the answer

        response.render('hello', { name: parse(body).name}); // Render the 'hello' view
    });

});

/* ************************************************ */

app.listen(8000, function () {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});
