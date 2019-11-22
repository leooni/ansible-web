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


//var pkginfo = require('pkginfo')(module);
var pkginfo = require('pkginfo')(module);
var pkg = module.exports;
app.use(bodyParser.json());

app.post('/add', function (req, res) {
    const add = req.body;
    //console.log("Sucesso");
    res.send(add);
    console.log(add);
})


router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/about.html'));
});

router.get('/sitemap', function (req, res) {
  res.sendFile(path.join(__dirname + '/sitemap.html'));
});


router.get('/', function (req, res) {
  res.render('index', {'pkginfo' : pkg});


const options = {
  hostname: 'student3.4947.rhdemo.io',
  port: 443,
  // path: '/api/o/',
  path:'/api/v2/job_templates/',
  authorize:'admin:G1z1e7MC4TpM9Z',
  method: 'POST'
};


const request = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write();
  });
});

request.on('error', (e) => {
  console.error(e);
});
request.end();

});




//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
