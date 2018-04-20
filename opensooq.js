var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var result = [];

function ConvertDate(date) {
    var datenow = new Date();
    var month = (datenow.getMonth() < 10) ? '0' + (datenow.getMonth() + 1) : (datenow.getMonth() + 1);
    var day = (datenow.getDate() < 10) ? '0' + datenow.getDate() : datenow.getDate();
    var dayyes = ((datenow.getDate() - 1) < 10) ? '0' + datenow.getDate() : datenow.getDate();
    var hour = datenow.getHours();

    var today = datenow.getFullYear() + "-" + month + "-" + day;
    var yesterday = datenow.getFullYear() + "-" + month + "-" + (dayyes);

    if (date.includes('-')) //2018-02-13
        return date;

    else {

        if (date == "الآن") {
            return today;
        }

        else if (date == "أمس") {
            return yesterday;
        }

        else if (date.split(' ').length == 2) { // قبل ساعة أو قبل ساعتان
            var PastHour = date.split(' ');
            if (PastHour[1] == "ساعة")
                if ((hour - 1) < 0)
                    return yesterday;
                else
                    return today;
            else
                if ((hour - 2) < 0)
                    return yesterday;
                else
                    return today;
        }

        else if (date.split(' ').length == 3) { //قبل 6 ساعات
            var PastHour = date.split(' ');
            if ((hour - PastHour[1]) < 0)
                return yesterday;
            else
                return today;
        }

        else
            return date;
    }
}

function CollectData(url, CityName, SectionName) {
    for (var NumPage = 1; NumPage <= 5; NumPage++) {
        request(url + NumPage, function (error, response, body) {
            if (error) {
                // console.log("error");
                return;
            }
            var name, link, date;
            var $ = cheerio.load(body)
            var ourDiv = $('div.post-item')

            ourDiv.each(function (index) {
                var divdata = $(this).find('li.rectLi.ie.relative.mb15')
                divdata.each(function (index) {
                    var price = $('span.inline.ltr', this).text().trim();

                    var lidate = $(this).find('li.ml15.vMiddle')
                    lidate.each(function (index) {
                        date = ConvertDate($('span.rectLiDate', this).text().trim());
                    })

                    var link = $(this).find('a.block.postLink')
                    link.each(function (index) {
                        link = "https://sa.opensooq.com" + this.attribs.href;

                        var title = $(this).find('span.inline.vMiddle.postSpanTitle')
                        title.each(function (index) {
                            name = this.attribs.title;
                        })
                        /*
                                                console.log("Name: "+name);
                                                console.log("Link: "+link);
                                                console.log("Price: "+price);
                                                console.log("Date: "+date);
                                                console.log("City: "+CityName);
                                                console.log("Section: "+ SectionName);
                                                console.log('****************************************')*/

                        result.push({
                            name: name,
                            link: link,
                            price: price,
                            date: date,
                            city: CityName,
                            section: SectionName
                        });

                        fs.writeFileSync('./ResultsOpenSooq.json', JSON.stringify(result));

                    })
                })
            })
        })
    }
}

var suites = {
    1: function () {
        console.log("Suite 1 - OpenSooq Jeddah Mobile");
        CollectData("https://sa.opensooq.com/ar/%D8%AC%D8%AF%D8%A9/%D9%85%D9%88%D8%A8%D8%A7%D9%8A%D9%84-%D8%AA%D8%A7%D8%A8%D9%84%D8%AA/all?page=", "جدة", "اجهزة");
    },
    2: function () {
        console.log("Suite 2 - OpenSooq Jeddah Cars");
        CollectData("https://sa.opensooq.com/ar/%D8%AC%D8%AF%D8%A9/%D8%AD%D8%B1%D8%A7%D8%AC-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA/all?page=", "جدة", "حراج");
    },
    3: function () {
        console.log("Suite 3 - OpenSooq Jeddah Video Games");
        CollectData("https://sa.opensooq.com/ar/%D8%AC%D8%AF%D8%A9/%D8%A7%D9%84%D8%B9%D8%A7%D8%A8-%D9%81%D9%8A%D8%AF%D9%8A%D9%88-%D9%88%D9%85%D9%84%D8%AD%D9%82%D8%A7%D8%AA%D9%87%D8%A7/all?page=", "جدة", "العاب فيديو");
    },
    4: function () {
        console.log("Suite 4 - OpenSooq Jeddah Electronic Devices2");
        CollectData("https://sa.opensooq.com/ar/%D8%AC%D8%AF%D8%A9/%D8%A7%D8%AC%D9%87%D8%B2%D8%A9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A7%D8%AA/all?page=", "جدة", "اجهزة");
    },
    5: function () {
        console.log("Suite 5 - OpenSooq Jeddah Furniture");
        CollectData("https://sa.opensooq.com/ar/%D8%AC%D8%AF%D8%A9/%D8%A3%D8%AB%D8%A7%D8%AB-%D8%AF%D9%8A%D9%83%D9%88%D8%B1/all?page=", "جدة", "اثاث");
    },
    6: function () {
        console.log("Suite 6 - OpenSooq Jeddah Fashion Women");
        CollectData("https://sa.opensooq.com/ar/%D8%AC%D8%AF%D8%A9/%D8%A3%D8%B2%D9%8A%D8%A7%D8%A1-%D9%86%D8%B3%D8%A7%D8%A6%D9%8A%D8%A9/all?page=", "جدة", "أزياء");
    },
    7: function () {
        console.log("Suite 7 - OpenSooq Jeddah Fashion Men");
        CollectData("https://sa.opensooq.com/ar/%D8%AC%D8%AF%D8%A9/%D8%A3%D8%B2%D9%8A%D8%A7%D8%A1-%D8%B1%D8%AC%D8%A7%D9%84%D9%8A%D8%A9/all?page=", "جدة", "أزياء");
    },
    8: function () {
        console.log("Suite 8 - OpenSooq Jeddah Furniture");
        CollectData("https://sa.opensooq.com/ar/%D8%AC%D8%AF%D8%A9/%D9%84%D9%88%D8%A7%D8%B2%D9%85-%D8%A7%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84-%D9%88-%D8%A7%D9%84%D8%A3%D9%84%D8%B9%D8%A7%D8%A8/all?page=", "جدة", "اثاث");
    },
    9: function () {
        console.log("Suite 9 - OpenSooq Makkah Mobile");
        CollectData("https://sa.opensooq.com/ar/%D9%85%D9%83%D8%A9/%D9%85%D9%88%D8%A8%D8%A7%D9%8A%D9%84-%D8%AA%D8%A7%D8%A8%D9%84%D8%AA/all?page=", "مكة", "اجهزة");
    },
    10: function () {
        console.log("Suite 10 - OpenSooq Makkah Cars");
        CollectData("https://sa.opensooq.com/ar/%D9%85%D9%83%D8%A9/%D8%AD%D8%B1%D8%A7%D8%AC-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA/all?page=", "مكة", "حراج");
    },
    11: function () {
        console.log("Suite 11 - OpenSooq Makkah Video Games");
        CollectData("https://sa.opensooq.com/ar/%D9%85%D9%83%D8%A9/%D8%A7%D9%84%D8%B9%D8%A7%D8%A8-%D9%81%D9%8A%D8%AF%D9%8A%D9%88-%D9%88%D9%85%D9%84%D8%AD%D9%82%D8%A7%D8%AA%D9%87%D8%A7/all?page=", "مكة", "العاب فيديو");
    },
    12: function () {
        console.log("Suite 12 - OpenSooq Makkah Electronic Devices2");
        CollectData("https://sa.opensooq.com/ar/%D9%85%D9%83%D8%A9/%D8%A7%D8%AC%D9%87%D8%B2%D8%A9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A7%D8%AA/all?page=", "مكة", "اجهزة");
    },
    13: function () {
        console.log("Suite 13 - OpenSooq Makkah Furniture");
        CollectData("https://sa.opensooq.com/ar/%D9%85%D9%83%D8%A9/%D8%A3%D8%AB%D8%A7%D8%AB-%D8%AF%D9%8A%D9%83%D9%88%D8%B1/all?page=", "مكة", "اثاث");
    },
    14: function () {
        console.log("Suite 14 - OpenSooq Makkah Fashion Women");
        CollectData("https://sa.opensooq.com/ar/%D9%85%D9%83%D8%A9/%D8%A3%D8%B2%D9%8A%D8%A7%D8%A1-%D9%86%D8%B3%D8%A7%D8%A6%D9%8A%D8%A9/all?page=", "مكة", "أزياء");
    },
    15: function () {
        console.log("Suite 15 - OpenSooq Makkah Fashion Men");
        CollectData("https://sa.opensooq.com/ar/%D9%85%D9%83%D8%A9/%D8%A3%D8%B2%D9%8A%D8%A7%D8%A1-%D8%B1%D8%AC%D8%A7%D9%84%D9%8A%D8%A9/all?page=", "مكة", "أزياء");
    },
    16: function () {
        console.log("Suite 16 - OpenSooq Makkah Furniture");
        CollectData("https://sa.opensooq.com/ar/%D9%85%D9%83%D8%A9/%D9%84%D9%88%D8%A7%D8%B2%D9%85-%D8%A7%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84-%D9%88-%D8%A7%D9%84%D8%A3%D9%84%D8%B9%D8%A7%D8%A8/all?page=", "مكة", "اثاث");
    },
    17: function () {
        console.log("Suite 17 - OpenSooq riyadh Mobile");
        CollectData("https://sa.opensooq.com/ar/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/%D9%85%D9%88%D8%A8%D8%A7%D9%8A%D9%84-%D8%AA%D8%A7%D8%A8%D9%84%D8%AA/all?page=", "الرياض", "اجهزة");
    },
    18: function () {
        console.log("Suite 18 - OpenSooq riyadh Cars");
        CollectData("https://sa.opensooq.com/ar/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/%D8%AD%D8%B1%D8%A7%D8%AC-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA/all?page=", "الرياض", "حراج");
    },
    19: function () {
        console.log("Suite 19 - OpenSooq riyadh Video Games");
        CollectData("https://sa.opensooq.com/ar/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/%D8%A7%D9%84%D8%B9%D8%A7%D8%A8-%D9%81%D9%8A%D8%AF%D9%8A%D9%88-%D9%88%D9%85%D9%84%D8%AD%D9%82%D8%A7%D8%AA%D9%87%D8%A7/all?page=", "الرياض", "العاب فيديو");
    },
    20: function () {
        console.log("Suite 20 - OpenSooq riyadh Electronic Devices2");
        CollectData("https://sa.opensooq.com/ar/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/%D8%A7%D8%AC%D9%87%D8%B2%D8%A9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A7%D8%AA/all?page=", "الرياض", "اجهزة");
    },
    21: function () {
        console.log("Suite 21 - OpenSooq riyadh Furniture");
        CollectData("https://sa.opensooq.com/ar/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/%D8%A3%D8%AB%D8%A7%D8%AB-%D8%AF%D9%8A%D9%83%D9%88%D8%B1/all?page=", "الرياض", "اثاث");
    },
    22: function () {
        console.log("Suite 22 - OpenSooq riyadh Fashion Women");
        CollectData("https://sa.opensooq.com/ar/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/%D8%A3%D8%B2%D9%8A%D8%A7%D8%A1-%D9%86%D8%B3%D8%A7%D8%A6%D9%8A%D8%A9/all?page=", "الرياض", "أزياء");
    },
    23: function () {
        console.log("Suite 23 - OpenSooq riyadh Fashion Men");
        CollectData("https://sa.opensooq.com/ar/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/%D8%A3%D8%B2%D9%8A%D8%A7%D8%A1-%D8%B1%D8%AC%D8%A7%D9%84%D9%8A%D8%A9/all?page=", "الرياض", "أزياء");
    },
    24: function () {
        console.log("Suite 24 - OpenSooq riyadh Furniture");
        CollectData("https://sa.opensooq.com/ar/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/%D9%84%D9%88%D8%A7%D8%B2%D9%85-%D8%A7%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84-%D9%88-%D8%A7%D9%84%D8%A3%D9%84%D8%B9%D8%A7%D8%A8/all?page=", "الرياض", "اثاث");
    }
};

function Start() {
    console.log("Starting");
    for (var i = 1; i <= Object.keys(suites).length; i++) {
        suites[i]();
    }
}

Start();

console.log('*All data is stored in ResultsOpenSooq.json.');
console.log('========================================');