
class TestMySql {

  run() {
      let mysql = require('mysql')
      let connection = mysql.createConnection({
          host: '148.70.109.94',
          user: '*',
          password: '*',
          database: '*'
      })

      connection.connect()


      var sql = 'SELECT * FROM users';

      connection.query(sql, function (err, result) {
          if (err) {
              console.log('[SELECT ERROR] - ', err.message);
              return;
          }

          console.log('--------------------------SELECT----------------------------');
          console.log(result);
          console.log('------------------------------------------------------------\n\n');
      });

      connection.end();
  }
}

module.exports = TestMySql