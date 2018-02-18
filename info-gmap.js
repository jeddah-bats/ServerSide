const API_KEY = process.env.API_KEY;
module.exports.API_KEY = process.env.API_KEY;
const request = require('request');
var fs = require('fs');
var result = [];

var Info=[
    // city   latitude  longitude 
    ['Jeddad',21.285407,39.237551],
    ['Mecca',21.389082,39.857912],
    ['Riyadh',24.713552,46.675296]
]

module.exports.keyword = ['car','electronics','devices','furniture','video games','fashion','clothing','hardware'];
var keyword = ['car','electronics','devices','furniture','video games','fashion','clothing','hardware'];
//var keyword = "car,electronics,devices,furniture,video games,fashion,clothing,hardware";

function GetPlaces (url,city,section){
    request(url, { json: true }, function (err, res, body) {
        if (err) {
            console.log(err);
            return;
        }

        PushPlaces (body,url,city,section);

        });
}

function PushPlaces (body,url,city,section){
    for(var i = 0;i<body.results.length;i++){
        result.push({
            name: body.results[i].name,
            url: url,
            city: city,
            section: section,
            type:"shop"
        });

        fs.writeFileSync('./ResultsInfo-GMap.json', JSON.stringify(result));
    }
}

for (var j =0;j<Info.length;j++){
    for(var i =0;i<keyword.length;i++){
        var location = Info[j][1] + ',' + Info[j][2];
        var city = Info[j][0];
        var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + location + '&rankby=distance' + '&keyword=' + keyword[i] + '&key=' + API_KEY;
        
        GetPlaces(url,city,keyword[i]);
    }
}