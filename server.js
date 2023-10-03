const express = require("express");
const app = express();

const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require('knex');
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const images = require("./controllers/images");
const ApiCall = require("./controllers/ApiCall");

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_HOST,
      user : process.env.DATABASE_USER,
      port : process.env.DATABASE_PORT,
      password : process.env.DATABASE_PW,
      database : process.env.DATABASE_DB
    }
  });


// console.log(db.select('*').from('users'));

app.use(express.json({ extended: false }));
app.use(cors());



app.get("/", (req, res) => {res.send("Success");})

app.post("/signin", (req, res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post("/register", (req, res) => {register.handleRegister(req,res,db,bcrypt)})

app.put("/images",(req,res)=>{images.handleimages(req,res,db,bcrypt)})

app.post("/ApiCall",(req,res)=>{ApiCall.handleApiCall(req,res)})
        


app.get("/profile/:id",(req,res)=>{
    let {id} =req.params ;
    db.select('*').from('users').where({id:id})
    .then(user=>{
        if(user.length){
            res.json(user[0]);
        }
        else{
            res.status(404).json("User not found");
        }
    })
})



app.listen(3000);