const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

const db = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '@Edward352',
    database : 'signup'
})


app.post('/signup', (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    console.log(username, email, password)

    db.query("INSERT INTO login (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({username: username})
        }
    })
})

app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // console.log(email, password)

    db.query("SELECT * FROM login WHERE `email` = ? AND `password` = ?", [email, password], (err, result) => {
        console.log(res.length)
        if (err) {
            console.log(err)
        }if(result.length > 0) {
            console.log(result)
            return res.send(result)
        } else {
            res.send({email: email})
            // console.log(result)
        }
    })
})

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@Edward352',
    database: 'timetable',
    connectionLimit: 10
})


app.get('/shiptimes', (req,res) =>{
    const date = req.query.date 
    console.log(date)
    pool.query('select * from shiptimes where date=?',[date],(err, result, fields) => {
        if (err) {
            return console.log(err)
        }
            console.log(result.length)
            if(result.length > 0) {
                res.send(result)
            }else{
                return
            }
           
        })
    
    })



app.listen(8081, ()  => {
    console.log('server listening on port 8081')
})



