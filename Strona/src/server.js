import http from 'node:http';
import { URL } from 'node:url';
import { parse } from 'querystring';

import {pageAllProducts, pageCategoryProducts, pageTypeProducts} from './generate_page.js';
import {readCommands} from './commands.js';

/**
     * Handles incoming requests.
     *
     * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g,. encoded contents of HTML form fields.
     * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
     * The answer sent by this stream must consist of two parts: the header and the body.
     * <ul>
     *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
     *  <li>The body contains the correct data, e.g. a form definition.
     * </ul>
     * @author Kacper Słoniec <kaslo@student.agh.edu.pl>
*/
function requestListener(request, response) {

    console.log('--------------------------------------');
    console.log(`The relative URL of the current request: ${request.url}`);
    console.log(`Access method: ${request.method}`);
    
    const url = new URL(request.url, `http://${request.headers.host}`);

    console.log(`Pathname: ${url.pathname}`);
    console.log('--------------------------------------');

    if (url.pathname === '/' && request.method === 'GET') {

        response.write(pageAllProducts());
        response.end();
    }

    else if (url.pathname === '/Komputery' && request.method === 'GET') {

        response.write(pageCategoryProducts("Komputery"));
        response.end();
    }

    else if (url.pathname === '/Akcesoria' && request.method === 'GET') {

        response.write(pageCategoryProducts("Akcesoria"));
        response.end();
    }

    else if (url.pathname === '/Akcesoria/Orginalne' && request.method === 'GET') {

        response.write(pageTypeProducts("Akcesoria", "Orginalne"));
        response.end();
    }

    else if (url.pathname === '/Akcesoria/Chinskie' && request.method === 'GET') {

        response.write(pageTypeProducts("Akcesoria", "Chińskie"));
        response.end();
    }

    else if (url.pathname === '/' && request.method === 'POST') {

        var body = '';
        request.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        request.on('end', () => {

            let parsed = parse(body);

            readCommands(parsed.textarea, parsed.category);

            response.write(pageAllProducts());
            response.end();

        });
    }

    else {
        response.writeHead(501, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.write('Error 501: Not implemented');
        response.end();
    }
}

/**
     * Creates and starts server on port 8000.
     *
     * @author Kacper Słoniec <kaslo@student.agh.edu.pl>
*/
function startServer() {
    const server = http.createServer(requestListener);
    server.listen(8000);
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
}

startServer();
