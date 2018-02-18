var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var url = "mongodb://localhost:27017/";

var data = fs.readFileSync("ResultsHaraj.json");
var haraj = JSON.parse(data);

var data2 = fs.readFileSync("ResultsOpenSooq.json");
var opensooq = JSON.parse(data2);

var data3 = fs.readFileSync("ResultsSooqMzad.json");
var sooqmzad = JSON.parse(data3); 

var data4 = fs.readFileSync("ResultsInfo-GMap.json");
var info_gmap = JSON.parse(data4);

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  var dbo = db.db("senior_project");

  for(var i = 0 ; i < Object.keys(opensooq).length; i++){
    dbo.collection("Products").insertOne(
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
    dbo.collection("Products").insertOne(
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
    dbo.collection("Products").insertOne(
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

  for(var i = 0 ; i < Object.keys(info_gmap).length; i++){
    dbo.collection("Places").insertOne(
      {
        name: info_gmap[i].name,
        url: info_gmap[i].url,
        city: info_gmap[i].city,
        section: info_gmap[i].section, 
        type: info_gmap[i].type
        }
      , function(err, res) {
      if (err) throw err;
    });
  }

  console.log("ResultsOpenSooq.json inserted"); 
  console.log("ResultsHaraj.json inserted"); 
  console.log("ResultsSooqMzad.json inserted");
  console.log("ResultsInfo-GMap.json inserted"); 

  db.close();
});