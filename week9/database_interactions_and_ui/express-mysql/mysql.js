var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);

app.get('/',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.render('home', context);
  });
});

/****
* Piazza student answer by Kyle Prouty
****/
app.get('/reassign',function(req,res,next){
	mysql.pool.query("ALTER TABLE `workouts` DROP id;",function(err,result){
        if(err){
            next(err);
            return;
        }
   	});
    mysql.pool.query("ALTER TABLE `workouts` AUTO_INCREMENT = 1",function(err,result){
        if(err){
            next(err);
            return;
        }
    });
    mysql.pool.query("ALTER TABLE `workouts` ADD `id` int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;",function(err,result){
        if(err){
            next(err);
            return;
        }
    });
});

//format
//http://52.37.167.33:3001/insert?exercise=curls&unit=0&weight=45&reps=12&date=2016-05-06
app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`exercise`,`unit`,`weight`,`reps`,`date`) VALUES (?,?,?,?,?)", [req.query.exercise, req.query.unit, req.query.weight, req.query.reps, req.query.date], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});

//format
//http://52.37.167.33:3001/delete?id=1
app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('home',context);
  });
});

//format
//http://52.37.167.33:3001/update?id=1&exercise=bench&unit=0&weight=45&reps=12&date=2016-05-06
app.get('/update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE workouts SET exercise=?, unit=?, weight=?, reps=?, date=? WHERE id=? ",
        [req.query.exercise || curVals.exercise, req.query.unit || curVals.unit, req.query.weight || curVals.weight, req.query.reps || curVals.reps, req.query.date || curVals.date, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});

//format
//http://52.37.167.33:3001/reset
app.get('/reset',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "exercise VARCHAR(255) NOT NULL," +
    "unit BOOLEAN," +
    "weight INT," +
    "reps INT," +
    "date DATE)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
