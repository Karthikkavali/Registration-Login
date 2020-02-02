var notes = require("./service")
exports.reg = (app) => {

    app.post("/reg", async (req, res) => {
        var find = await notes.findEmail({ email: req.body.email }, "details")
        if (find) {
            console.log("User already exist try login")
            res.send({ Result: "User already exist try login" })
        }
        else {
            var insertOne = await notes.insertData(req.body, "details")
            console.log(insertOne.ops)
            console.log("Registered Successfully")
            res.send("Registered Successfully")
        }
    })
} 