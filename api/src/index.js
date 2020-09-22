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
api.post(`${URL.GET_SIGN_IN}`,  async (req, res, next) => {
  let sql = `SELECT * FROM users WHERE email = '${req.body.email}' `;
  const result = db.query(sql, async function(err, result){
    if(err){
      console.log("error: ", err)
    }else{
      const checkPassword = await bycrypt.compare(req.body.password, result[0].password)
      if(checkPassword){
        const user = {
          name: result[0].name,
          email: result[0].email,
          password: result[0].password
        }
       res.json(user).status(200)
      }
      else res.json("Sorry, we don't know this user").status(400)
    }
  })
})

api.listen(PORT)