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

    client.query('SELECT * FROM todo;', function(err, result){
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





//~~~~~~~~~~~~~~~~~~~~~


console.log('insider route1');





module.exports = router;
