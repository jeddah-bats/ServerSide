var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("senior_project");
  var data = fs.readFileSync("d-ResultsHaraj.json");
  var haraj = JSON.parse(data);

  var data2 = fs.readFileSync("ResultsOpenSooq.json");
  var opensooq = JSON.parse(data2);

  var data3 = fs.readFileSync("ResultsSooqMzad.json");
  var sooqmzad = JSON.parse(data3);

  for(var i = 0 ; i < Object.keys(opensooq).length; i++){
    dbo.collection("data").insertOne(
      {
        name: opensooq[i].name,
        link: opensooq[i].link,
        price: opensooq[i].price,
        date: opensooq[i].date,
        city: opensooq[i].city,
        section: opensooq[i].section
        }
      , function(err, res) {
      if (err) throw err;
    });
  }

  for(var i = 0 ; i < Object.keys(haraj).length; i++){
    dbo.collection("data").insertOne(
      {
        name: haraj[i].name,
        link: haraj[i].link,
        price: haraj[i].price,
        date: haraj[i].date,
        city: haraj[i].city,
        section: haraj[i].section
        }
      , function(err, res) {
      if (err) throw err;
    });
  }

  for(var i = 0 ; i < Object.keys(sooqmzad).length; i++){
    dbo.collection("data").insertOne(
      {
        name: sooqmzad[i].name,
        link: sooqmzad[i].link,
        price: sooqmzad[i].price,
        date: sooqmzad[i].date,
        city: sooqmzad[i].city,
        section: sooqmzad[i].section
        }
      , function(err, res) {
      if (err) throw err;
    });
  }

  console.log("ResultsOpenSooq.json inserted"); 
  console.log("d-ResultsHaraj.json inserted"); 
  console.log("ResultsSooqMzad.json inserted"); 

  db.close();
});