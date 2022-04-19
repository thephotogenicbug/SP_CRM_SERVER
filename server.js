const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const {v4 : uuidv4} = require('uuid')
const uniqid = require('uniqid');
const db = require('./models')

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
// app.post('/createticket', (req,res) =>{
//   var myservice = req.body.myservice;
//   var subservice = req.body.subservice;
//   var budget = req.body.budget;
//   var notes = req.body.notes;
//   var status = req.body.status;
//   var attachment = req.body.attachment;
//   var sql = "insert into createticket(myservice, subservice, budget, notes, status, attachment ) values('"+myservice+"', '"+subservice+"', '"+budget+"', '"+notes+"', '"+status+"', '"+attachment+"')";
//   mydatabase.query(sql, function(error, rows, fields){
//         if(error) throw error
//          res.status(201).json({
//            success: true,
//            message: "New Ticket Generated Successfully....!",
//          });
//       })
// })
// app.post('/newticket', (req,res) =>{
//     var projectname = req.body.projectname;
//     var date = req.body.date;
//     var duedate = req.body.duedate;
//     var notes = req.body.notes;
//     var budget = req.body.budget;
//     var status = req.body.status;
//     var image   = req.body.image;
//     var ticketid = req.body.ticketid;
//     var clientid = req.body.clientid;
//     var sql = "insert into newticket(projectname, date, duedate, notes, budget, status, image, ticketid, clientid ) values('"+projectname+"', '"+date+"', '"+duedate+"', '"+notes+"', '"+budget+"', '"+status+"', '"+image+"', '"+ticketid+"', '"+clientid+"')";
//       mydatabase.query(sql, function(error, rows, fields){
//         if(error) throw error
//          res.status(201).json({
//            success: true,
//            message: "New Ticket Generated Successfully....!",
//          });
//       })
   
// })

// Get Ticket
app.get('/getallticket', (req,res) =>{
  var sql = "select * from createticket order by id desc";
  mydatabase.query(sql, function(error, rows, fields){
    if(error) throw error
     res.send(rows)
     res.end()
  })
})

// Get Ticket By Id
app.post('/getticketinfo', (req,res) =>{
  var id = req.body.id;
  mydatabase.query("select * from createticket where id='"+id+"'", function(error, rows, fields){
    if(error) throw error
    res.send(JSON.stringify(rows));
    res.end
  })
})

app.post('/updateticket', function(req,res) {
  var myservice = req.body.myservice;
  var subservice = req.body.subservice
  var budget = req.body.budget;
  var notes = req.body.notes;
  var id = req.body.id;
  var  sql = "update createticket set myservice='"+myservice+"', subservice='"+subservice+"', budget='"+budget+"', notes='"+notes+"' where id='"+id+"' ";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
        res.status(200).json({
          message:"Ticket Update Successfully...!"
        })

    })
})

app.delete('/deleteticket/:id', function(req,res){
  const id = req.params.id
  mydatabase.query("DELETE FROM createticket where id = ?", id, (error, rows, fields) =>{
    if(error) throw error
    res.status(200).json({
      messsage:"Ticket Delete Successfully...!"
    })
  });
})

app.post('/clientprofile', function(req,res){
  const fname = req.body.fname;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const website = req.body.website;
  const about = req.body.about;
  const clientid = req.body.clientid;
  const sql  = "insert into clientprofile(clientid, fname, mobile, email, website, about)values('"+clientid+"','"+fname+"', '"+mobile+"', '"+email+"', '"+website+"', '"+about+"')";
  mydatabase.query(sql, function(error, rows, fields){
    if(error) throw error
    res.send("Client Info Saved Successfully")
  })
})

// Routers
const createTicketRouter = require('./routes/createTickets')
app.use("/createticket", createTicketRouter);

db.sequelize.sync().then( () =>{
app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
})


