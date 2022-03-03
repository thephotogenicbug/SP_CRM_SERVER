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

app.post('/newticket', (req,res) =>{
    var service =     req.body.service;
    var service_submenu = req.body.service_submenu;
    var textbox      = req.body.textbox;
    var image     = req.body.image;
    var ticketid = uniqid();
    var sql = "insert into newticket(service, service_submenu, textbox, image, ticketid)values('"+service+"', '"+service_submenu+"', '"+textbox+"', '"+image+"', '"+ticketid+"')";
    mydatabase.query(sql, function(error, rows, fields){
        if(error) throw error
        res.status(201).json({
            success:true,
            message:"New Ticket Generated Successfully....!"
        })
    })
})

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
