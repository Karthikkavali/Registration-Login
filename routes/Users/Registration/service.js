const conn = require("../../connections/index")    
    var dbo= conn.getDb();
   var findEmail = async (body, collection) =>{
  
     var dbo = await conn.getDb().collection(collection).findOne(body)
     return dbo;
   }
   var insertData = async (body, collection) =>{
  var dbo= await conn.getDb().collection(collection).insertOne(body)
  return dbo
   }
module.exports={findEmail,insertData}
