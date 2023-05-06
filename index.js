const http = require('http');
const fs = require('fs');
var requests = require('requests');
const homeFile = fs.readFileSync('home.html', 'utf-8');
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests('https://api.openweathermap.org/data/2.5/weather?q=hyderabad&appid=4ad0598213043b4d86ff5b4316f1292a',)
            .on('data',(chunk)=> {
                console.log(chunk)
            })
            .on('end', (err)=> {
                if (err) return console.log('connection closed due to errors', err);

                console.log('end');
            });
    }
});
server.listen('3001',"127.0.0.1");