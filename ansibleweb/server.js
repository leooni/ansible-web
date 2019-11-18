const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.set('view engine', 'ejs')
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/assets', express.static(__dirname + '/assets/'));

//var pkginfo = require('pkginfo')(module);
var pkginfo = require('pkginfo')(module);
var pkg = module.exports;


router.get('/', function (req, res) {
  res.render('index', {'pkginfo' : pkg});
  //res.render('index', {'pkginfo' : pkg});
  //res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/about.html'));
});

router.get('/sitemap', function (req, res) {
  res.sendFile(path.join(__dirname + '/sitemap.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');