const conn = require("../../connections/index")
const jwt = require("jsonwebtoken")
//var session=require("express-session")
var findEmail = async (body, collection) => {
  var dbo = await conn.getDb().collection(collection).findOne(body)

  return dbo;
}
var updateData = async (body, token, collection) => {
  var dbo = await conn.getDb().collection(collection).updateOne(body, { $set: { token } })
  return dbo
}

module.exports = { findEmail, updateData }