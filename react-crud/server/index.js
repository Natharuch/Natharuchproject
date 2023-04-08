// const express = require("express");
// const app = express();
// const path = require("path");
// const mysql = require("mysql");
// // const db = require("server\db_config\db_config.js");
// // const mysql = require("mysql");
// const cors = require("cors");
// const dotenv = require("dotenv");

// app.use(cors());
// app.use(express.json()); 
 
// require("dotenv").config();

// // configraration with env.
// dotenv.config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//   });

// // const db = mysql.createConnection({
// //     user: "root",
// //     host: "localhost", 
// //     password : "root",  
// //     database : "employeesystem",
// //     port: '3307'
// // })

// // db.connect((err))

// function runSqlCommand(query) {
//     return new Promise((resolve, reject) => {
//       client.query(query, function (error, results, fields) {
//         if (error) {
//           console.log("query", query);
//           reject(error);
//         } else {
//           resolve(results);
//         }
//       });
//     });
//   }

// app.get('/employees' , (req,res)=> {
//     db.query("SELECT * FROM employees ", (err,result)=> {
//         if (err){
//             console.log(err);
//         }else{
//             res.send(result);
//         } 
//     });
// }) ; 

// app.post("/create",  (req,res) =>{
//     const name = req.body.name;
//     const age = req.body.age;
//     const country = req.body.country;
//     const possition = req.body.possition;
//     const wage = req.body.wage; 
 
//     db.query(
//         "INSERT INTO employees (name, age , country , possition ,wage ), VALUES [?,?,?,?,?]" , [name, age, country, possition, wage],
//         (err,result)=>{
//            if (err) {
//             console.log(err);
//            } else {
//             res.send("Values inserted"); 
//            }
//         }
//     ); 
// });

// // app.post("/employees",  (req, res )=> {
// //     const _body = req.body;
// //     const _req_data = ({
// //       name,
// //       age,
// //       country,
// //       possition,
// //       wage,
// //     } = _body);
  
// //     const _query = {
// //       sql: "INSERT INTO employees (name,age,country,possition,wage) VALUES (?, ?, ?, ?, ?)",
// //       values: [
// //         _req_data.name,
// //         _req_data.age,
// //         _req_data.country,
// //         _req_data.possition,
// //         _req_data.wage
// //       ]
// //     };
  
// //     const _result =  db.runSqlCommand(_query);
// //     let _status = "Error";
  
// //     _result.affectedRows > 0 ? (_status = "OK") : (_status = "Error");
   
// //     res.send(_status).status(200);
// //   });

// app.listen(3001 , () => {
//     console.log('Sever running 3001');  
// })



///new 

const express = require('express')
const mysql = require('mysql');

const app = express();
app.use (express.json());

const cors = require("cors");
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection ({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'employeesystem',
    port : '3307'

}) 
  
db.connect((err) => {
    if (err) {
        console.log ('Error connecting to MySQL database = ', err)
        return;
    }
    console.log('MySQL successfully connect');
})

function runSqlCommand(query) {
    return new Promise((resolve, reject) => {
      db.query(query, function (error, results, fields) {
        if (error) {
          console.log("query", query);
          reject(error);
        } else {
          resolve(results);
        }
      });
    }); 
  }

 
app.post("/create", (req, res) => {
    const { fname,age,country,position,wage } = req.body;

    try { 
        db.query(
            "INSERT INTO  employees(fname,age,country,position,wage) VALUES(?,?,?,?,?)",
            [fname,age,country,position,wage],
            (err,results,fields) => {
                if (err) {
                    console.log("Error",err);
                    return res.status(400).send();
                }
                return res.status(201).json ({message: "New create successfull"},results,fields);
            }
        )
    } catch (err){
        console.log(err);
        return res.status(500).send();
    }
})


app.get("/employees",  (req, res) => {
    const { fname,age,country,position,wage } = req.body;
    try {
        db.query( "SELECT * FROM  employees ",[fname,age,country,position,wage], (err,results,fields) => {

                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).json(results)
            })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})
    

app.put('/update/:id', (req,res) => {
    const id =req.body.id;
    const wage = req.body.wage;
    db.query("UPDATE employees SET wage = ? WHERE id = ?", [wage, id], (err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }); 
})

app.delete('/delete/:id', (req,res, next) =>{ 
    const _id = req.params.id;
    // var _delete ="DELETE FROM employees ";
    db.query("DELETE FROM employees WHERE id = ?",_id, (err, result) =>{ 

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        } 
    })
}) 
  
app.listen(3001, () => console.log('server is running on port 3001'));

// app.delete((req,res,next) => {
//     let sql = 'DLETE FROM employees WHERE id = ?'
//     db.query(sql, [rq.params.id],(error,results,fields) =>{

//     })
// })