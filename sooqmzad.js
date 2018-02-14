var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var result = [];

function GetDescription (name,link,date,CityName,SectionName){
    var description;
    request(link, function (error, response, body) {
        if (error) {
            console.log("error");
            return;
        }
        var $ = cheerio.load(body)
        var ourDiv = $('div.panel.panel-default.panel-DA');
        ourDiv.each(function(index) {
            var divdata = $(this).find('div.panel-body')
            divdata.each(function(index) {
                description = $('div.text.ckeditor-code', this).text().trim();

                console.log("Name: "+name);
                console.log("Link: "+link);
                console.log("Date: "+date);
                console.log("Description: "+description);
                console.log("City: "+CityName);
                console.log("Section: "+ SectionName);
                console.log('****************************************')
                result.push({
                    name: name,
                    link: link,
                    price: null,
                    date: date,
                    description: description,
                    city: CityName,
                    section: SectionName
                });
            })
        })
    })
}

function CollectData (url,CityName,SectionName){
    for(var NumPage =1;NumPage<=5;NumPage++){
        request(url+NumPage, function (error, response, body) {
            if (error) {
                console.log("error");
                return;
            }
            var name,link,date;
            //console.log("Status Code" + response.statusCode);
            var $ = cheerio.load(body)

            var ourDiv = $('table.box_cont')
            ourDiv.each(function(index) {

                var title = $(this).find('div.col-md-11.nopadding')
                title.each(function(index) {
                    name = $('a.ads-name', this).text().trim();

                    date= $(this).children().first().next('a.ads-name').next('i.fa.fa-camera-retro.fa-lg.found.hidden-xs')
                    .next('div').next('div').next('div').text().trim().replace(/\s/g, '').split(':');

                    var link = $(this).find('a.ads-name')
                    link.each(function(index) {
                        link=this.attribs.href;

                        GetDescription(name,link,date,CityName,SectionName);

                    })
                })
            })
        })
    }
}

var suites = {
    1:function() {
        console.log("Suite 1 - SooqMzad Jeddah Electronic Devices");
        CollectData("http://sooqmzad.com/ads.php?&cat=13&country=SA&area=227&search=1&page=","جدة","اجهزة");
    },
    2:function() {
        console.log("Suite 2 - SooqMzad Jeddah Cars");
        CollectData("http://sooqmzad.com/ads.php?&cat=10&country=SA&area=227&search=1&page=","جدة","حراج");
    },
    3:function() {
        console.log("Suite 3 - SooqMzad Mecca Electronic Devices");
        CollectData("http://sooqmzad.com/ads.php?&cat=13&country=SA&area=226&search=1&page=","مكة","اجهزة");
    },
    4:function() {
        console.log("Suite 4 - SooqMzad Mecca Cars");
        CollectData("http://sooqmzad.com/ads.php?&cat=10&country=SA&area=226&search=1&page=","مكة","حراج");
    },
    5:function() {
        console.log("Suite 5 - SooqMzad Riyadh Electronic Devices");
        CollectData("http://sooqmzad.com/ads.php?&cat=13&country=SA&area=228&search=1&page=","الرياض","اجهزة");
    },
    6:function() {
        console.log("Suite 6 - SooqMzad Riyadh Cars");
        CollectData("http://sooqmzad.com/ads.php?&cat=10&country=SA&area=228&search=1&page=","الرياض","حراج");
    }
};

function Start() {
    console.log("Starting");
    for(var i =1;i<=Object.keys(suites).length;i++){
        suites[i]();
    }
}

Start();

//fs.write('./ResultsSooqMzad.json', JSON.stringify(result), 'w');
console.log('*All data is stored in ResultsSooqMzad.json.');
console.log('========================================'); 


