const express = require('express')
var mysql = require('mysql');
const app = express()
const port = 3000

var bodyParser = require('body-parser');
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({ extended: true }));

var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'bizCard',
    password : 'bizCard1234',
    database : 'bizCardDB'
});

db.connect();

// Create a card
app.post('/create-card', function (req, res) {
    const handle = req.body.handle
    const url = req.body.url
    const sql = `INSERT INTO CARDS(name,url) VALUES(${JSON.stringify(handle)},${JSON.stringify(url)});`
    db.query(sql, (err,result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Succesfully added card...')
      })
  })

// Display all the cards
app.get('/get-cards', (req, res) => {
    sql = "SELECT * FROM CARDS"
    const query = []
    db.query(sql, (err,result) =>{
        if(err) throw err;
        //query = result;
        res.send(result)
    })
    
  })

  // Reserved endpoints only used in the beginning of the app

  app.get('/create-table', (req, res) => {
    const sql = "CREATE TABLE CARDS(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(225), url VARCHAR(225))";
    db.query(sql, (err,result) =>{
        if(err) throw err;
        console.log(result);
        res.send("Cards Table Created.....")
      })
  })
  app.get('/create-db', (req,res) =>{
      const sql = "CREATE DATABASE bizCardDB";
      db.query(sql, (err, result) =>{
        if(err){
          console.log(err)
        }
        res.send("Database created...")
      })
  })

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

