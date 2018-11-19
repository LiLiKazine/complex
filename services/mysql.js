const mysql = require('mysql')
const config = require('../config/mysql')

let pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
})

let operation = {
    query: (sql, vals)=> {
        return new Promise ((resolve, reject)=> {
            pool.getConnection((err, con)=>{
                if(err) {
                    reject(err)
                } else {
                    con.query(sql, vals, (qerr, rows)=> {
                        if (qerr) {
                            reject(qerr)
                        } else {
                            resolve(rows)
                        }
                        con.release()
                    })
                }

            })
        })
    }
}

module.exports = operation
