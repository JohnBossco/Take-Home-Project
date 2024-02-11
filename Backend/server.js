const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())


const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "@Edward352",
    database: "signup"
})



app.post('/signup', (req,res) => {
    const sql = "INSERT INTO login (`username`,`password`,`email`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.password,
        req.body.email
    ] 
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error")
        }
        console.log(_data)
        return res.json(data)
    })
})




app.listen(8081, () => {
    console.log("Backend Server")
})



// app.post('/register', (req,res) => {
//     const username = req.body.username
//     const password = req.body.password
//     const email = req.body.email

//     const query = "INSERT INTO account (username, password, email) VALUES (?,?,?)"
//     const query2 = "SELECT * FROM account WHERE username = ?"

//     db.query(query2, [username], (err,result) => {
//         if(err) {throw err}
//         if(result.length > 0) {
//             res.send({message: "Username already in use"});
//         }
//         if(result.length === 0) {
//             db.query(query, [username, password,email], (err, result) => {
//                 if(err) {throw err}
//                 res.send({message: "User created successfully"})
//             })
//          }   
//        })
//     }


// )






