var notes = require("./service")
const jwt = require("jsonwebtoken")
exports.login = (app) => {
    app.post("/login", async (req, res) => {
        var findIn = await notes.findEmail({ email: req.body.email, password: req.body.password }, "details")
        if (findIn) {
            var token = jwt.sign({ email: req.body.email }, "karthik");
            console.log("token:" + token)
            if (token) {
                var updateOne = await notes.updateData({ email: req.body.email }, { token: token }, "details")
                if (updateOne.result.nModified) {
                    console.log("Updated Successfully")
                    res.send({
                        email: req.body.email,
                        token: token
                    })
                }
            }
        }
        else {
            console.log("User doesn't exist")
            res.send("User doesn't exist")
        }
    })
}

// module.exports = {login};