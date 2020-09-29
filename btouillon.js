decodeId: async function(){
  const decode = await jwt.decode(this.token, { complete: true})
  const payloadID = decode.payload.id
  return payloadID
}

post_contact: async function(){
  try{
    let { id, name, email } = this
    const decode = await jwt.decode(this.token, { complete: true})
    id = decode.payload.id
    await axios.post(POST_CONTACT, { name, email, id})
  }catch(err){
    console.error("ERROR POST CONTACT --> ", err)
  }
}