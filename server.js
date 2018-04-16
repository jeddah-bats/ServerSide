const express = require('express')
const application = express()
var cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000;
const dbLab_url = 'mongodb://turki:turki@ds147668.mlab.com:47668/senior_project';
var db;

function Get_Products (db, req_Query, callback) {
    db.collection('Products').find(req_Query).toArray(function (err, json) {
        if (err) { callback(err, null) }
        callback(null, json);
    })
}

function Get_Places (db, req_Query, callback) {
    db.collection('Places').find(req_Query).toArray(function (err, json) {
        if (err) { callback(err, null) }
        callback(null, json);
    })
}

function Search(db, req_Query, req_city, callback) {
    if (req_city == "all") {
        db.collection('Products').find({ name: { $regex: '' + req_Query + '.*' } }).toArray(function (err, json) {
            if (err) { callback(err, null) }
            callback(null, json);
        })

    } else {
        db.collection('Products').find({ name: { $regex: '' + req_Query + '.*' }, city: '' + req_city + '' }).toArray(function (err, json) {
            if (err) { callback(err, null) }
            callback(null, json);
        })
    }
}

function Statisticss(db, req_Query, callback) {
    db.collection('Products').aggregate(
        [
            { $match: { city: { $in: [req_Query] } } },
            { $group: { _id: "$cat", total: { $sum: 1 } } }
        ]
    ).toArray(function (err, json) {
        if (err) { callback(err, null) }
        callback(null, json);
    })
}

MongoClient.connect(dbLab_url, function(err, Mongo_Client) {
    if (err) return console.log(err)
    db = Mongo_Client.db('senior_project')
    application.listen(port, function() {
        console.log('Server running on port 3000')
    })
})

application.use(cors())

application.get('/Places', function (request, res) {
    Get_Places(db, request.query, function (err, results) {
        if (err) {
            res.status(500).send({ error: 'An Error Occured, Try Again!' })
        }
        res.send(results)
    })
})

application.get('/Products', function (request, res) {
    Get_Products(db, request.query, function (err, results) {
        if (err) {
            res.status(500).send({ error: 'An Error Occured, Try Again!' })
        }
        res.send(results)
    })
})

application.get('/results/:city/:searchfield', function (request, res) {
    Search(db, request.params.searchfield, request.params.city, function (err, results) {
        if (err) {
            res.status(500).send({ error: 'An Error Occured, Try Again!' })
        }
        res.send(results)
    })
})

application.get('/statistics/:city', function (request, res) {
    Statisticss(db, request.params.city, function (err, results) {
        if (err) {
            res.status(500).send({ error: 'An Error Occured, Try Again!' })
        }
        res.send(results)
    })
})

//for test
module.exports = application;

/*
حراج

الرياض
http://localhost:3000/Products?city=%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6&cat=%D8%AD%D8%B1%D8%A7%D8%AC
مكة
http://localhost:3000/Products?city=%D9%85%D9%83%D8%A9&cat=%D8%AD%D8%B1%D8%A7%D8%AC
جدة
http://localhost:3000/Products?city=%D8%AC%D8%AF%D8%A9&cat=%D8%AD%D8%B1%D8%A7%D8%AC


اجهزة

الرياض
http://localhost:3000/Products?city=%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6&cat=%D8%A7%D8%AC%D9%87%D8%B2%D8%A9
مكة
http://localhost:3000/Products?city=%D9%85%D9%83%D8%A9&cat=%D8%A7%D8%AC%D9%87%D8%B2%D8%A9
جدة
http://localhost:3000/Products?city=%D8%AC%D8%AF%D8%A9&cat=%D8%A7%D8%AC%D9%87%D8%B2%D8%A9


أثاث

الرياض
http://localhost:3000/Products?city=%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6&cat=%D8%A7%D8%AB%D8%A7%D8%AB
مكة
http://localhost:3000/Products?city=%D9%85%D9%83%D8%A9&cat=%D8%A7%D8%AB%D8%A7%D8%AB
جدة
http://localhost:3000/Products?city=%D8%AC%D8%AF%D8%A9&cat=%D8%A7%D8%AB%D8%A7%D8%AB


العاب فيديو

الرياض
http://localhost:3000/Products?city=%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6&cat=%D8%A7%D9%84%D8%B9%D8%A7%D8%A8%20%D9%81%D9%8A%D8%AF%D9%8A%D9%88
مكة
http://localhost:3000/Products?city=%D9%85%D9%83%D8%A9&cat=%D8%A7%D9%84%D8%B9%D8%A7%D8%A8%20%D9%81%D9%8A%D8%AF%D9%8A%D9%88
جدة
http://localhost:3000/Products?city=%D8%AC%D8%AF%D8%A9&cat=%D8%A7%D9%84%D8%B9%D8%A7%D8%A8%20%D9%81%D9%8A%D8%AF%D9%8A%D9%88


ازياء

الرياض
http://localhost:3000/Products?city=%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6&cat=%D8%A3%D8%B2%D9%8A%D8%A7%D8%A1
مكة
http://localhost:3000/Products?city=%D9%85%D9%83%D8%A9&cat=%D8%A3%D8%B2%D9%8A%D8%A7%D8%A1
جدة
http://localhost:3000/Products?city=%D8%AC%D8%AF%D8%A9&cat=%D8%A3%D8%B2%D9%8A%D8%A7%D8%A1
*/