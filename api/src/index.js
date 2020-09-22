const express = require('express')
const api = express() 
const bycrypt = require('bcrypt')
const cors = require('cors')
const BodyParser = require('body-parser')

const PORT = 8000

// UTILS
var db = require('./database');
var URL = require('./routes');

// MIDLE
api.use(cors());
api.use(BodyParser.json());
api.use(BodyParser.urlencoded({ extended: true }));

// REGISTER
api.post(`${URL.POST_SIGN_UP}` , async (req, res, next) => {
  try{
    const salt = await bycrypt.genSalt(7)
    const hashPassword = await bycrypt.hash(req.body.password, salt)
    let sql = `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${hashPassword}')`;
    db.query(sql)
    res.json({user: req.body.name, email: req.body.email, password: req.body.password}).status(200)
  }  catch(err){
    console.log(" ERREUR POST ---> ", err)
  }
})
//LOGIN
api.get(`${URL.GET_SIGN_IN}`,  async (req, res, next) => {
    let sql = `SELECT * FROM users WHERE name = '${req.body.name}' `;
    const result = db.query(sql, async function(err, res){
      if(err){
        console.log("error: ", err)
      }else{
        const checkPassword = await bycrypt.compare(req.body.password, res[0].password)
        if(res[0].email == req.body.email && checkPassword ) console.log(`${res[0].name} vous êtes connecté`)
        else console.log("Sorry, we don't know this user")
      }
    })
    res.json("ok").status(200)
})

api.listen(PORT)