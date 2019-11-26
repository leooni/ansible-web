const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
const https = require('https');


app.set('view engine', 'ejs')
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/assets', express.static(__dirname + '/assets/'));
app.use(bodyParser.urlencoded({
    extended: true
}));

var pkginfo = require('pkginfo')(module);
var pkg = module.exports;
app.use(bodyParser.json());

app.post('/add', function (req, res) {
    const add = req.body;

       const options = {
            hostname: 'student1.08b6.rhdemo.io',
            port: 443,
            path:'/api/v2/projects/4/',
            method: 'POST',
            headers: {     // autenticação via Bearer Key gerado no Tower
                'Content-Type': 'application/octet-stream',
                'Authorization': 'Bearer 9KDMp2a3yeWvNQLhYvunCZKD9Iv5d9'
            },
            encoding: null, //  if you expect binary data
            responseType: 'buffer',
            body: new Uint8Array(3)
        };
    res.send(add);
    console.log(add);
})

router.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname + '/about.html'));
});

router.get('/sitemap', function (req, res) {
    res.sendFile(path.join(__dirname + '/sitemap.html'));
});

router.get('/', function (req, res,) {
    res.render('index', {'pkginfo' : pkg});


    const request = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

         res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
         });
         res.on('end', () => {
             console.log('No more data in response.');

         });

    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.end();

});

//add the router
app.use('/', router);
app.listen(process.env.port || 3003);

console.log('Running at Port 3003');

