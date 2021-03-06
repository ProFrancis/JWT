require('dotenv').config({path: __dirname + '/.env'})
const express = require('express')
const api = express() 
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bycrypt = require('bcrypt')
const BodyParser = require('body-parser')

const PORT = 8000

// UTILS
var db = require('./database');
var URL = require('./routes');
const { query } = require('./database')
const con = require('./database')
const { Console } = require('console')

// MIDLE
api.use(cors());
api.use(BodyParser.json());
api.use(BodyParser.urlencoded({ extended: true }));

let refreshTokens = []

// POST TOKEN
api.post('/token', (req, res) => {
  const refreshToken = req.body.token 
  if(refreshToken == null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name})
    res.json({ accessToken: accessToken })
  })
});

// CONTACTS 
api.post(`${URL.POST_CONTACTS}`,authenticateJWT,  async(req, res) => {
  try{
    addTable()
    console.log("IN API --> ", req.body)
    db.query(`INSERT INTO contacts (name, email, id_user_affiliate) VALUES ('${req.body.name}','${req.body.email}','${req.body.id}')`)
    res.json("SUCCESS POST CONTACT").status(200)
  }catch(err){
    res.send(500).json(err)
  }      
})

// GET CONTACTS
api.get(`${URL.GET_CONTACTS}/:id`, authenticateJWT, async(req, res) => {
  db.query(`SELECT contacts.id, contacts.name, contacts.email, contacts.id_user_affiliate FROM contacts INNER JOIN users ON users.id = contacts.id_user_affiliate WHERE id_user_affiliate = ${req.params.id}` , async function(err, result) {
    try{
      res.json({result}).status(200)
    }catch{
      res.send(500).send("Cannot get all contact", err)
    }
  })
})

// REGISTER SIGN UP
api.post(`${URL.POST_SIGN_UP}`,  async (req, res) => {
  try{
    const salt = await bycrypt.genSalt(7)
    const hashPassword = await bycrypt.hash(req.body.password, salt)
    db.query(`INSERT INTO users (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${hashPassword}')`)
    res.json("USER POSTED").status(200)
  } catch(err){
    res.status(500).send("cannot posted --> ",err)
  }
})

//LOGIN
api.post(`${URL.GET_SIGN_IN}`, async (req, res) => {
  db.query(`SELECT * FROM users WHERE email = '${req.body.email}' `, async function(err, result){
    if(result === null ) return res.status(404).send('cannot find user')
    try{
      if(await bycrypt.compare(req.body.password, result[0].password)){
        const payload = { 
          id: result[0].id,
          name: result[0].name, 
          email: result[0].email, 
          password: result[0].password 
        }
        const accessToken = generateAccessToken(payload)
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        res.json({ 
          payload: payload,
          accessToken: accessToken,
          refreshToken: refreshToken
        }).status(200)
      }
    }catch{
      res.status(500).send("Sorry, we don't know this user ", err)
    }
  })
})

// LOGOUT
api.delete('/logout/:token', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.params.token)
  res.sendStatus(204)
})

// UTILS

function addTable(){
  db.query(`CREATE TABLE IF NOT EXISTS contacts (
    id int(11) NOT NULL auto_increment,   
    name varchar(100) NOT NULL,       
    email varchar(100) NOT NULL,     
    id_user_affiliate int(11) NOT NULL,     
     PRIMARY KEY (id)
  )`) 
}

function authenticateJWT(req, res, next ){
  const autHeader = req.headers['authorization']
  const token = autHeader && autHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401) 

    jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err) return res.sendStatus(403)
      req.user = user 
      next()
    })
}

function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '200s'})
}
api.listen(PORT)