var MongoClient = require('mongodb');
var url = "mongodb://localhost:27017/mydb1";
var dbo = null;
const connect = (fn) => {
  if (dbo) {
    fn();
  }
  else {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) {
        fn(err);
      }
      else {
        console.log("connection established to mongodb");
        dbo = db.db("mydb1");
      }
    });
  }
}


const getDb = () => {
  return dbo;
}
module.exports = { 
  getDb, 
  connect }
