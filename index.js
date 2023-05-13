const http = require('http');
const fs = require('fs');
var requests = require('requests');
const homeFile = fs.readFileSync('home.html', 'utf-8');
const replaceVal=(tempVal,orgVal)=>{
    let temperature=tempVal.replace("{%tempVal%}",orgVal.main.temp);
     temperature=temperature.replace("{%tempMin%}",orgVal.main.temp_min);
     temperature=temperature.replace("{%tempMax%}",orgVal.main.temp_max);
     temperature=temperature.replace("{%location%}",orgVal.name);
     temperature=temperature.replace("{%country%}",orgVal.sys.country);
    return temperature;
};
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests('https://api.openweathermap.org/data/2.5/weather?q=hyderabad&appid=4ad0598213043b4d86ff5b4316f1292a',)
            .on('data',(chunk)=> {
                const objData=JSON.parse(chunk);
                const arrData=[objData];
                // console.log(arrData[0].main.temp);
                const realTimeData=arrData.map(val=>replaceVal(homeFile,val)).join("");
                res.write(realTimeData);
                // console.log(realTimeData);

            })
            .on('end', (err)=> {
                if (err) return console.log('connection closed due to errors', err);
                // console.log('end');
                res.end();
            });
    }
});
server.listen('3001',"127.0.0.1");