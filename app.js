const express = require("express")
const app = express();
const db = require("./routes/connections/index");
app.use(express.json());
const port = 8000;
app.listen(port, () => {
  console.log("server started and running on port" + port)
});
db.connect((err) => {
  if (err) {
    console.log('unable to connect to database');
  }
});


var reg = require("./routes/Users/Registration/index")
var login = require("./routes/Users/Login/index")
var crud = require("./routes/sample/index")
reg.reg(app);
login.login(app);
crud.crud(app);
