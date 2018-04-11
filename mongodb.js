var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

function StoreData (url,name){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  var dbo = db.db("senior_project");

  if(fs.existsSync("ResultsOpenSooq.json")){
    var data2 = fs.readFileSync("ResultsOpenSooq.json");
    var opensooq = JSON.parse(data2);
    for(var i = 0 ; i < Object.keys(opensooq).length; i++){
      dbo.collection("Products").insertOne(
        {
          name: opensooq[i].name,
          link: opensooq[i].link,
          price: opensooq[i].price,
          date: opensooq[i].date,
          city: opensooq[i].city,
          cat: opensooq[i].section
          }
        , function(err, res) {
        if (err) throw err;
      });
    }
    console.log("ResultsOpenSooq.json inserted"); 
  }

  if(fs.existsSync("ResultsHaraj.json")){
    var data = fs.readFileSync("ResultsHaraj.json");
    var haraj = JSON.parse(data);
    for(var i = 0 ; i < Object.keys(haraj).length; i++){
      dbo.collection("Products").insertOne(
        {
          name: haraj[i].name,
          link: haraj[i].link,
          price: haraj[i].price,
          date: haraj[i].date,
          city: haraj[i].city,
          cat: haraj[i].section
          }
        , function(err, res) {
        if (err) throw err;
      });
    }
    console.log("ResultsHaraj.json inserted"); 
  }

  if(fs.existsSync("ResultsSooqMzad.json")){
    var data3 = fs.readFileSync("ResultsSooqMzad.json");
    var sooqmzad = JSON.parse(data3); 
    for(var i = 0 ; i < Object.keys(sooqmzad).length; i++){
      dbo.collection("Products").insertOne(
        {
          name: sooqmzad[i].name,
          link: sooqmzad[i].link,
          price: sooqmzad[i].price,
          date: sooqmzad[i].date,
          city: sooqmzad[i].city,
          cat: sooqmzad[i].section
          }
        , function(err, res) {
        if (err) throw err;
      });
    }
    console.log("ResultsSooqMzad.json inserted");
  }

  if(fs.existsSync("ResultsInfo-GMap.json")){
    var data4 = fs.readFileSync("ResultsInfo-GMap.json");
    var info_gmap = JSON.parse(data4);
    for(var i = 0 ; i < Object.keys(info_gmap).length; i++){
      dbo.collection("Places").insertOne(
        {
          name: info_gmap[i].name,
          lat: info_gmap[i].lat,
          lng: info_gmap[i].lng,
          url: info_gmap[i].url,
          city: info_gmap[i].city,
          cat: info_gmap[i].section, 
          type: info_gmap[i].type
          }
        , function(err, res) {
        if (err) throw err;
      });
    }
    console.log("ResultsInfo-GMap.json inserted"); 
  }

  console.log("Finish from store the data in "+ name);
  db.close();
});
}

StoreData("mongodb://localhost:27017/","localhost");
//StoreData("mongodb://turki:turki@ds147668.mlab.com:47668/senior_project","MongoLab");