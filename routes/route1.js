var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'rho'
};

// initialize the database connection pool
var pool = new pg.Pool(config);

//~~~~~~~~~~~~~~~~~~~~

router.get('/', function(req, res){

  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('SELECT * FROM todo ORDER BY complete ASC;', function(err, result){
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }

      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);//@@@!!! send to AJAX success
    });
  });
});//end GET request




router.post('/', function(req, res) {

    pool.connect(function(err, client, done) {

            if (err) {
              console.log('Error connecting the DB', err);
                res.sendStatus(500);
                done();
                return;

            } //end of if statement
console.log("req body", req.body);
            client.query('INSERT INTO todo (task_name) VALUES($1) returning *', [req.body.taskName], function(err, result) {
                    done();
                    if (err) {
                        console.log('err', err);
                        res.sendStatus(500);
                        return;
                    } //end of if

                    res.send(result.rows);//!!!@@@send back to AJAX success
                }); //end of client query
        }); //end pool connect

}); //end of router post


router.delete('/:id', function(req, res){
  var id = req.params.id;
console.log("id", id);
  pool.connect(function(err, client, done){
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('DELETE FROM todo WHERE id=$1;', [id], function(err){
        if (err) {
          console.log('Error querying the DB', err);
          res.sendStatus(500);
          return;
        }

        res.sendStatus(204);////!!!@@@send back to AJAX success
      });
    } finally {
      done();
    }
  });
});//end of delete function


router.put('/:id', function(req, res) {
  var id = req.params.id;
  var taskName = req.body.task_name;


  pool.connect(function(err, client, done){
    try {
      if (err) {
        console.log('Error connecting the DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('UPDATE todo SET complete=true WHERE id=$1 RETURNING *;',
      [id],

      // client.query('UPDATE todo SET task_name=$1 WHERE id=$2 RETURNING *;',
      // [taskName, id], this query didn't work
      function(err, result) {
        if (err) {
          console.log('Error querying database', err);
          res.sendStatus(500);
        } else {
          console.log('result rows', result.rows);
          res.send(result.rows);//!!!@@@send back to client side
        }
      });
    } finally {
      done();
    }
  });
});//end of put function


//~~~~~~~~~~~~~~~~~~~~~


//console.log('insider route1');





module.exports = router;
