import fs from 'fs-extra';
import { argv } from 'node:process';
import { exec } from 'child_process';
import process from 'node:process';

var filename = "src/test.txt";

function argv_interpreter(argv) {

    if (argv.length == 2) {
        console.log("Wprowadź komendy — naciśnięcie Ctrl+C kończy wprowadzanie danych");

        process.stdin.on('data', (data) => {
            exec(data.toString(), (error, stdout, stderr) => {
                if (error) {
                  console.error(`error: ${error.message}`);
                  return;
                }
                if (stderr) {
                  console.error(`stderr: ${stderr}`);
                  return;
                }
                console.log(stdout);
            });
        });
        
        process.stdin.on('end', () => {
            console.log('Input stream ended');
        });
    }

    else if (argv.length == 3) {

        if(argv[2] == "--sync") {
            let data = fs.readFileSync(filename);
            let count = data.toString();
            count++;
            console.log(" Liczba uruchomień: " + count);
            fs.writeFileSync(filename, count.toString());
        }

        else if(argv[2] == "--async") {
            fs.readFile(filename, (err, data) => {
                if (err) throw err;
                let count = data.toString();
                count++;
                console.log(" Liczba uruchomień: " + count);
                fs.writeFile(filename, count.toString());
            });
        }
    }
}

argv_interpreter(argv);
