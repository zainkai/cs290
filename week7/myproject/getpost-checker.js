//leave as is
var express = require('express');
var app = express();
// cannot use app = require("express");

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

//generic root view
app.get('/',function(req,res){
  res.render('home');
});

app.get('/api',function(req,res){
  res.render('api');
});



// /data-list controllers
//**********************************************
//handles get data
app.get('/data',function(req,res){
  var list = [];
  for (var i in req.query){
    list.push({'name':i,'value':req.query[i]});
  }
  var obj = {};
  obj.data = list;
  obj.title = 'Get';
  //console.log(obj);
  res.render('data', obj);
});

//handles post data
app.post('/data', function(req,res){
  var list = [];
  for (var i in req.body){
    list.push({'name':i,'value':req.body[i]});
  }
  var obj = {};
  obj.data = list;
  obj.title = 'Post';
  //console.log(obj);
  res.render('data', obj);
});
//*********************************************

//404 view
app.use(function(req,res){
  //res.type("plain/text");
  res.status(404);
  res.render('not-found');
});

//server error view
app.use(function(err, req, res, next){
  console.error(err.stack);
  //res.type('plain/text');
  res.status(500);
  res.render('error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});