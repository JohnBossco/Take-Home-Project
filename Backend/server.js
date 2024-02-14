const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* This check and connects me to my database on mysql 
   This database will be where I store login information
   Username, Email, Password.
   Will also store the booked trip info of signed up users*/
const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "@Edward352",
  database: "signup",
});

/* app.post is to access the database and add information this is where
   I will access the 'signup' database */

app.post("/signup", (req, res) => {
  /* These are the information that will be stored in the signup database
       in the login table */
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  console.log(username, email, password);

  /* mysql query that will insert Username, email, password into the database */
  db.query(
    "INSERT INTO login (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ username: username });
      }
    }
  );

  
});

app.post("/bookedtrips", (req, res) =>{

    const accountName = req.body.accountName;
    const deptDate = req.body.deptDate;
    const deptFrom = req.body.deptFrom;
    const arriveDate = req.body.arriveDate;
    const destinationTo = req.body.destinationTo;
    const totalPrice = req.body.totalPrice;
  
    db.query(
      "insert into bookedtrips (accountName,deptDate,deptFrom,arriveDate,destinationTo,totalPrice) VALUES (?,?,?,?,?,?)",
      [accountName, deptDate, deptFrom, arriveDate, destinationTo, totalPrice],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );

    
})




/* This is where we access the database again 
   however this time we are trying to select information from a table the login table */
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // console.log(email, password)

  /* another query where this time we are selecting information to test
       the information to test is the email and password */
  db.query(
    "SELECT * FROM login WHERE `email` = ? AND `password` = ?",
    [email, password],
    (err, result) => {
      console.log(res.length);
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        console.log(result);
        return res.send(result);
      } else {
        res.send({ email: email });
        // console.log(result)
      }
    }
  );
});

/* This checks and connects to the timetalbe database
   This is where i will hose all the cruise ship information on
    */
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "@Edward352",
  database: "timetable",
  connectionLimit: 10,
});

/* app.get allows use to now go into a database and get information
   the information we are trying to retrieve is the all the dates  */
app.get("/shiptimes", (req, res) => {
  const date = req.query.date;
  console.log(date);
  pool.query(
    "select * from shiptimes where date=?",
    [date],
    (err, result, fields) => {
      if (err) {
        return console.log(err);
      }
      console.log(result.length);
      if (result.length > 0) {
        res.send(result);
      } else {
        return;
      }
    }
  );
});

app.listen(8081, () => {
  console.log("server listening on port 8081");
});
