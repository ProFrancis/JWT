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

// MIDLE
api.use(cors());
// api.use(express.json());
api.use(BodyParser.json());
api.use(BodyParser.urlencoded({ extended: true }));

let refreshTokens = []

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

// REGISTER
api.post(`${URL.POST_SIGN_UP}` , async (req, res) => {
  try{
    const salt = await bycrypt.genSalt(7)
    const hashPassword = await bycrypt.hash(req.body.password, salt)
    db.query(`INSERT INTO users (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${hashPassword}')`)
    res.json("USER POSTED").status(200)
  }  catch(err){
    res.status(500).send("cannot posted --> ",err)
  }
})
//LOGIN
api.post(`${URL.GET_SIGN_IN}`, async (req, res) => {
  const autHeader = req.headers.authorization
  console.log(autHeader)
  const result = db.query(`SELECT * FROM users WHERE email = '${req.body.email}' `, async function(err, result){
    if(result === null ) return res.status(404).send('cannot find user')
    try{
      if(await bycrypt.compare(req.body.password, result[0].password)){
        const user = { name: result[0].name, email: result[0].email, password: result[0].password }
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        res.json({
          accessToken: accessToken,
          refreshToken: refreshToken
        }).status(200)
      }
    }catch{
      res.status(500).send("Sorry, we don't know this user ",err)
    }
  })
})

// LOGOUT
api.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

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
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s'})
}
api.listen(PORT)