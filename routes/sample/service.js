
var jwt = require("jsonwebtoken")
const conn = require("../connections/index")

var findEmail = async (body, collection) => {
    var dbo = await conn.getDb().collection(collection).findOne(body)
    return dbo
}
var insertData = async (body, collection) => {
    var dbo = await conn.getDb().collection(collection).insertOne(body)
    return dbo
}

var aggregate = async (collection) => {
    var dbo = await conn.getDb().collection(collection).aggregate([
        {
            $lookup: {
                from: 'BTech',
                localField: 'phoneNumber',
                foreignField: 'phoneNumber',
                as: 'educationdetails'
            }
        },
        {
            $lookup: {
                from: 'SSC',
                localField: 'phonenumber',
                foreignField: 'phonenumber',
                as: 'educationfields'
            }
        },
        { $unwind: "$educationdetails" },
        { $unwind: "$educationfields" },
        {
            $project:
            {
                "email": "$mail",
                "college": "$educationdetails.college",
                "city": "$educationdetails.city",
                "phonenumber": "$phonenumber",
                "school": "$educationfields.school",
                "City": "$educationfields.City",
            }
        }
    ]).toArray();
    return dbo
}



var updateData = async (body, updatewith, collection) => {
    var dbo = await conn.getDb().collection(collection).updateOne(body, { $set: { updatewith } })
    return dbo
}

var deleteData = async (body, collection) => {
    var dbo = await conn.getDb().collection(collection).deleteOne(body)
    return dbo
}


module.exports = { findEmail, insertData, aggregate, deleteData, updateData }
