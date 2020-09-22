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
        const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({user: user, accessToken: accessToken}).status(200)
      }
      else res.json("Sorry, we don't know this user").status(400)
    }
  })
})