var notes = require("./service")
const con = require("..//connections/index")
exports.crud = (app) => {
    app.post("/insert", async (req, res) => {
        var find = await notes.findEmail({ email: req.body.email }, "details")
        if (find) {

            if (find.token.token == req.headers.token) {
                console.log("token verified")
                var insertOne = await notes.insertData({ college: req.body.college, city: req.body.city, CGPA: req.body.CGPA, phonenumber: req.body.phonenumber }, "BTech")
                console.log(insertOne.ops)
                //console.log("Data inserted" + Result)
                var insertTwo = await notes.insertData({ school: req.body.school, City: req.body.City, Marks: req.body.Marks, phonenumber: req.body.phonenumber }, "SSC")
                console.log(insertTwo.ops)
                //console.log("Data inserted" + Result)
                var insertThree = await notes.insertData({ mail: req.body.email, password: req.body.password, phonenumber: req.body.phonenumber }, "details")
                console.log(insertThree.ops)
                //console.log("Data inserted" + Result)
                res.send("insert operations done")
            } else {
                console.log("token not match")
                res.send("token not match")
            }
        } else {
            console.log("email doesn't exist")
            res.send("Email doesn't exist")
        }
    })

    app.get("/read/:email", async (req, res) => {
        var find = await notes.findEmail({ email: req.params.email }, "details")
        if (find) {
            if (find.token.token == req.headers.token) {
                console.log("token verified ")
                var agg = await notes.aggregate("details")
                console.log(agg)
                res.send(agg)

            } else {
                console.log("Token not match")
                res.send("Token not match")
            }
        } else {
            console.log("email doesnt exist")
            res.send("email doesnt exist")
        }
    })

    app.post("/update", async (req, res) => {
        var findIn = await notes.findEmail({ email: req.body.email }, "details")
        if (findIn) {
            if (findIn.token.token == req.headers.token) {
                console.log("token verified")
                var updateOne = await notes.updateData({ email: req.body.email }, { name: req.body.name }, "details")
                if (updateOne) {
                    console.log("Updated Successfully")
                    res.send("Updated")
                }
            } else {
                console.log("token not match")
                res.send("token not match")
            }
        } else {
            console.log("email doesn't exist")
            res.send("Email doesn't exist")
        }
    })
    app.post("/delete", async (req, res) => {
        var find = await notes.findEmail({ email: req.body.email }, "details")
        if (find) {
            if (find.token.token == req.headers.token) {
                console.log("token verified")
                var deleteOne = await notes.deleteData({ Marks: req.body.Marks }, "SSC")
                if (deleteOne) {
                    console.log("Deleted Successfully")
                    res.send("deleted")
                }
            } else {
                console.log("token not match")
                res.send("token not match")
            }
        } else {
            console.log("email doesn't exist")
            res.send("Email doesn't exist")
        }
    })
}



