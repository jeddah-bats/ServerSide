var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var result = [];

function ConvertDate(Originaldate) {
    numberOfDays = Originaldate.substring(0, 1);
    textTime = Originaldate.substring(1, Originaldate.length);

    if (textTime == "أسبوع") {
        var days = numberOfDays * 7;
        return CreateISODate(days);
    } else if (textTime == "شهر") {
        var days = numberOfDays * 30;
        return CreateISODate(days);
    } else if (textTime == "يوم") {
        var days = numberOfDays;
        return CreateISODate(days);
    } else {
        return numberOfDays + textTime;
    }
}

function CreateISODate(days) {
    var datenow = new Date();
    datenow.setDate(datenow.getDate() - days);

    var date = datenow.toISOString();

    var isodate = date.split("T");

    return isodate[0];
}

function CollectData (url,CityName,SectionName){
    for(var NumPage =1;NumPage<=5;NumPage++){
        request(url+NumPage, function (error, response, body) {
            if (error) {
               // console.log("error");
                return;
            }
            var name,link,date,isodate;
            var $ = cheerio.load(body)

            var ourDiv = $('table.box_cont')
            ourDiv.each(function(index) {

                var title = $(this).find('div.col-md-11.nopadding')
                title.each(function(index) {
                    name = $('a.ads-name', this).text().trim();

                    var link = $(this).find('a.ads-name')
                    link.each(function(index) {
                        link=this.attribs.href;

                        date= $(this).next('i.fa.fa-camera-retro.fa-lg.found.hidden-xs').next('div').next('div').next('div').text().trim().replace(/\s/g, '').split(':');

                        if (date[1] != undefined) {
                            isodate = ConvertDate(date[1]);
                        }
                        else{
                            date= $(this).next('div').next('div').next('div').text().trim().replace(/\s/g, '').split(':');
                            if (date[1] != undefined) {
                                isodate = ConvertDate(date[1]);
                            }
                            else{
                                date= $(this).next('i.fa.fa-camera-retro.fa-lg.found.hidden-xs').next('i.fa.fa-video-camera.found.hidden-xs').next('div').next('div').next('div').text().trim().replace(/\s/g, '').split(':');
                                if (date[1] != undefined) {
                                    isodate = ConvertDate(date[1]);
                                }
                                else
                                    isodate = "New Structure Date!"
                            }
                        }
/*
                        console.log("Name: "+name);
                        console.log("Link: "+link);
                        console.log("Date: "+isodate);
                        console.log("City: "+CityName);
                        console.log("Section: "+ SectionName);
                        console.log('****************************************')*/
                        result.push({
                            name: name,
                            link: link,
                            price: null,
                            date: isodate,
                            city: CityName,
                            section: SectionName
                        });

                    fs.writeFileSync('./ResultsSooqMzad.json', JSON.stringify(result));

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

console.log('*All data is stored in ResultsSooqMzad.json.');
console.log('========================================'); 