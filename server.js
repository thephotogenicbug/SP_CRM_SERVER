const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const {v4 : uuidv4} = require('uuid')
const uniqid = require('uniqid');

// Middleware
app.use(express.json());
app.use(cors());
dotenv.config({ path: "config.env" });

// MYSQL CONNECTION
const mysql = require("mysql");
const mydatabase = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sp_crm",
});
mydatabase.connect();

// Register
app.post("/register", function(req , res){
    var name = req.body.uname;
    var password = req.body.password;
    var mobile = req.body.mobile;
    var email = req.body.email;
    var sql = "insert into users(name, password, mobile, email) values('"+name+"', '"+password+"', '"+mobile+"', '"+email+"')";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
       res.status(201).json({
         success: true,
         message: "Registration Successful...!",
       });
    })
});

// Login
app.post('/login', (req,res) =>{
  var email = req.body.email;
  var password = req.body.password;
  var sql = "select * from users where email='" +email+ "' and password='" +password+ "'";
  mydatabase.query(sql, function(error, rows, fields){
    if(error) throw error
    if(rows.length > 0){
      res.send(rows);
      res.end()
    } else{
      res.send({"id":""});
      res.end();
    }
  })
})

// Post New Ticket
app.post('/newticket', (req,res) =>{
    var projectname = req.body.projectname;
    var date = req.body.date;
    var duedate = req.body.duedate;
    var notes = req.body.notes;
    var budget = req.body.budget;
    var status = req.body.status;
    var image   = req.body.image;
    var ticketid = req.body.ticketid;
    var clientid = req.body.clientid;
    var sql = "insert into newticket(projectname, date, duedate, notes, budget, status, image, ticketid, clientid ) values('"+projectname+"', '"+date+"', '"+duedate+"', '"+notes+"', '"+budget+"', '"+status+"', '"+image+"', '"+ticketid+"', '"+clientid+"')";
      mydatabase.query(sql, function(error, rows, fields){
        if(error) throw error
         res.status(201).json({
           success: true,
           message: "New Ticket Generated Successfully....!",
         });
      })
   
})

// Get Ticket
app.get('/getallticket', (req,res) =>{
  var sql = "select * from newticket order by id desc";
  mydatabase.query(sql, function(error, rows, fields){
    if(error) throw error
    res.status(201).json({
      success:true,
      rows
    })
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
