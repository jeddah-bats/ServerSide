const API_KEY = process.env.API_KEY;
const request = require('request');
var fs = require('fs');

var Info=[
    // city   latitude  longitude 
    ['Jeddad',21.285407,39.237551],
    ['Mecca',21.389082,39.857912],
    ['Riyadh',24.713552,46.675296]
]

var keyword = ['car','electronics','devices','furniture','video games','fashion','clothing','hardware'];
//var keyword = "car,electronics,devices,furniture,video games,fashion,clothing,hardware";

for (var j =0;j<Info.length;j++){
    for(var i =0;i<keyword.length;i++){
        var location = Info[j][1] + ',' + Info[j][2];
        var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + location + '&rankby=distance' + '&keyword=' + keyword[i] + '&key=' + API_KEY;
        console.log(url);
        request(url, { json: true }, function (err, res, body) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(body);
        console.log("==========================================================================================================================================================")
        //fs.write('./'+Info[j][0]+'.json', JSON.stringify(body), 'w')
        });
    }
}