const{
    createPool
} = require('mysql')

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '@Edward352',
    database: 'timetable',
    connectionLimit: 10
})


pool.query('select * from shiptimes',(err, results, fields) => {
    if (err) {
        return console.log(err)
    }
    return console.log(results)
})


module.exports = pool;