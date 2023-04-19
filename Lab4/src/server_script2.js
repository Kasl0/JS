import http from 'node:http';
import { URL } from 'node:url';
import fs from 'fs-extra';
import { exec } from 'child_process';

var filename = "src/test.txt";

function requestListener(request, response) {

    console.log('--------------------------------------');
    console.log(`The relative URL of the current request: ${request.url}`);
    console.log(`Access method: ${request.method}`);
    console.log('--------------------------------------');
    
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname === '/' && request.method === 'GET') {

        response.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>server_script2.js</title>
            </head>
            <body>
                <main>
                <h1>server_script2.js</h1>
                <form method="GET" action="/submit">
                    <label for="method">Method</label>
                    <select id="method" name="method">
                        <option value="-">-</option>
                        <option value="sync">sync</option>
                        <option value="async">async</option>
                    </select>
                    <br>
                    <label for="input">Input</label>
                    <textarea id="input" name="input"></textarea>
                    <br>
                    <button type="submit">Submit</button>
                </form>
                </main>
            </body>
            </html>`);

        response.end();
    }

    else if (url.pathname === '/submit' && request.method === 'GET') {

        switch(url.searchParams.get('method')) {

            case 'sync':
                let data = fs.readFileSync(filename);
                let count = data.toString();
                count++;
                response.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <title> Sync </title>
                    </head>
                    <body>
                        <p> Liczba uruchomień: ${count} </p>
                    </body>
                    </html>`);
                response.end();
                fs.writeFileSync(filename, count.toString());
                break;

            case 'async':
                fs.readFile(filename, (err, data) => {
                    if (err) throw err;
                    let count = data.toString();
                    count++;
                    response.write(`
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <title> Sync </title>
                        </head>
                        <body>
                            <p> Liczba uruchomień: ${count} </p>
                        </body>
                        </html>`);
                    response.end();
                    fs.writeFile(filename, count.toString());
                });
                break;

            case '-':
                var commands = url.searchParams.get('input').replace(/\n/g, ' && ');

                exec(commands, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return;
                    }
                    response.write(`
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <title> Sync </title>
                        </head>
                        <body>
                            <p><pre>${stdout}</pre></p>
                        </body>
                        </html>`);
                    response.end();
                });
                break;
        }
    }

    else {
        response.writeHead(501, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.write('Error 501: Not implemented');
        response.end();
    }
}


const server = http.createServer(requestListener);
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');
