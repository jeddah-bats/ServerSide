const API_KEY = process.env.API_KEY;
const request = require('request');
var fs = require('fs');
var result = [];

var Info = [
    // city   latitude  longitude 
    ['جدة', 21.285407, 39.237551],
    ['مكة', 21.389082, 39.857912],
    ['الرياض', 24.713552, 46.675296]
]

var keyword = ['car', 'electronics', 'devices', 'furniture', 'video games', 'fashion', 'clothing', 'hardware'];

function ChangeSection(sectionname) {
    if (sectionname == "electronics" || sectionname == "devices" || sectionname == "hardware") {
        return "اجهزة"
    }
    else if (sectionname == "car") {
        return "حراج"
    }
    else if (sectionname == "video games") {
        return "العاب فيديو"
    }
    else if (sectionname == "furniture") {
        return "اثاث"
    }
    else if (sectionname == "fashion" || sectionname == "clothing") {
        return "أزياء"
    }
    else {
        return sectionname
    }
}

function GetPlaces(url, city, urlplace, section) {
    request(url, { json: true }, function (err, res, body) {
        if (err) {
            console.log(err);
            return;
        }
        PushPlaces(body, url, city, urlplace, section);
    });
}

function PushPlaces(body, url, city, urlplace, section) {
    for (var i = 0; i < body.results.length; i++) {
        result.push({
            name: body.results[i].name,
            lat: body.results[i].geometry.location.lat,
            lng: body.results[i].geometry.location.lng,
            url: url,
            city: city,
            urlplace: urlplace + body.results[i].geometry.location.lat + "," + body.results[i].geometry.location.lng,
            section: ChangeSection(section),
            type: "shop"
        });

        console.log("Name: " + body.results[i].name);
        console.log("lat: " + body.results[i].geometry.location.lat);
        console.log("lng: " + body.results[i].geometry.location.lng);
        console.log("URL: " + url);
        console.log("City: " + city);
        console.log("PlaceURL: " + urlplace + body.results[i].geometry.location.lat + "," + body.results[i].geometry.location.lng);
        console.log("Section: " + section);
        console.log("Type: " + "shop");
        console.log('****************************************')

        fs.writeFileSync('./ResultsInfo-GMap.json', JSON.stringify(result));
    }
}

try {
    if (API_KEY === undefined) { 
        throw "undefined"; 
    } 
    else {
        for (var j = 0; j < Info.length; j++) {
            for (var i = 0; i < keyword.length; i++) {
                var location = Info[j][1] + ',' + Info[j][2];
                var city = Info[j][0];
                var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
                    + location + '&rankby=distance' + '&keyword=' + keyword[i] + '&key=' + API_KEY;
                var urlplace = "https://www.google.com/maps/dir/?api=1&destination="

                GetPlaces(url, city, urlplace, keyword[i]);
            }
        }
    }
} 
catch (err) {
    console.log("The API KEY has not been defiend");
} 

//test
module.exports.API_KEY = API_KEY;