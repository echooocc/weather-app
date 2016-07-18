var express = require('express');
var request = require('request');
// var debug = require('debug')('app');

var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static('.'));
app.use(express.static('./app'));
app.use(express.static('./node_modules/'));

app.get('/city/:city', function(req, res) {

  var token = 'b98c4ad6dd908a7c189365947661a7ab';
  var cityUrl = 'http://api.openweathermap.org/data/2.5/forecast/city?q=';
  var url = cityUrl + req.params.city + '&APPID=' + token + '&cnt=12';

  request({
    url: url,
    json: true
   }, function (error, response, body) {
    if (!error && res.statusCode === 200) {
      // debug(body);
      res.send(body);
    }
   });
});

var server = app.listen(app.get('port'), function () {
  console.log('Weather server listening on port '+ app.get('port'));
});
