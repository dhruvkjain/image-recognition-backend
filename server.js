const express = require("express");
// import { Express } from "express";
const app = express();
require("./fetch-polyfill");

const bcrypt = require("bcrypt-nodejs");
// import { bcrypt } from "bcrypt-nodejs";
const cors = require('cors');
// import { cors } from "cors";
const knex = require('knex');
// import { knex } from "knex";
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const images = require("./controllers/images");
const ApiCall = require("./controllers/ApiCall");
// import handleRegister from "./controllers/register";
// import handleSignin from "./controllers/signin";
// import handleimages from "./controllers/images";
// import handleApiCall from "./controllers/ApiCall";

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
