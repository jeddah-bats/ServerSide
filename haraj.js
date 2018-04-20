var fs = require('fs');
var casper = require('casper').create({
    clientScripts: [
        'node_modules/lodash/lodash.js'
    ]
});

var itemsList = {};
var result = [];
var currentSuite = 0;
var ToGetDate = 1;

function getNames() {
    var names = document.querySelectorAll('div.adsx div.adxTitle a');
    return _.map(names, function (e) {
        return e.innerText;
    });
}

function getLinks() {
    var Links = document.querySelectorAll('div.adsx div.adxTitle a ')
    return _.map(Links, function (e) {
        return e.getAttribute('href');
    });
}

function getDate() {
    var Dates = document.querySelectorAll('div.adsx div.adxExtraInfo div.adxExtraInfoPart');

    return _.map(Dates, function (e) {
        return e.innerText;
    });
}

function click() {
    casper.click(".pagination li a");
    casper.wait(5000, function () {
    });
}

function CollectData(CityName, SectionName) {
    itemsList.names = casper.evaluate(getNames);
    itemsList.links = casper.evaluate(getLinks);
    itemsList.date = casper.evaluate(getDate);
    for (i = 0; i < itemsList.names.length; i++) {
        result.push({
            name: itemsList.names[i],
            link: itemsList.links[i],
            price: null,
            date: ConvertDate(itemsList.date[ToGetDate]),
            city: CityName,
            section: SectionName
        });
        /*
        console.log("Name: " + itemsList.names[i]);
        console.log("Link: " + itemsList.links[i]);
        console.log("Date: " + itemsList.date[ToGetDate]);
        console.log("City: " + CityName);
        console.log("Section: " + SectionName);
        console.log('****************************************')
*/
        ToGetDate += 4;
    }
}

function ConvertDate(date) {
    var datenow = new Date();
    var year = datenow.getFullYear();
    var month = (datenow.getMonth() < 10) ? '0' + (datenow.getMonth() + 1) : (datenow.getMonth() + 1);
    var day = (datenow.getDate() < 10) ? '0' + datenow.getDate() : datenow.getDate();
    var hour = datenow.getHours();

    var today = year + "-" + month + "-" + day;
    var yesterday = year + "-" + month + "-" + (day - 1);

    var lengthofDate = date.split(' ').length;
    var splitofDate = date.split(' ');

    /*
    قبل دقيقه
    قبل ساعه
    قبل 6 دقيقه
    */
    if (lengthofDate == 2 || lengthofDate == 3) {
        if (splitofDate[1] == "ساعه") {
            if ((hour - 1) < 0)
                return yesterday;
            else
                return today;
        }
        else
            return today;
    }

    /*
    قبل ساعه و دقيقه
    قبل أسبوع و يوم
    قبل شهر و أسبوع
    قبل سنه و شهر
    */
    else if (lengthofDate == 4) {
        if (splitofDate[1] == "ساعه") {
            if ((hour - 1) < 0)
                return yesterday;
            else
                return today;
        }

        else if (lengthofDate[1] == "أسبوع" && splitofDate[3] == "يوم") {
            var NumDays = 8;
            if (day - NumDays <= 0) {
                var newmonth = month - 1;
                var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                var newday = 30 - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                var newdate = year + "-" + snewmonth + "-" + snewday;
                return newdate;
            }
            else {
                var newday = day - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                var newdate = year + "-" + month + "-" + snewday;
                return newdate;
            }
        }

        else if (splitofDate[1] == "شهر" && splitofDate[3] == "أسبوع") {
            var NumDays = 7;
            var newmonth = month - 1;
            var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
            if (day - NumDays <= 0) {
                var newmonth = snewmonth - 1;
                var newmonth2 = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                var newday = 30 - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                if (newmonth <= 0) {
                    var newmonth = 12 - newmonth;
                    var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                    var newdate = year - 1 + "-" + snewmonth + "-" + snewday;
                    return newdate;
                }
                else {
                    var newdate = year + "-" + newmonth2 + "-" + snewday;
                    return newdate;
                }
            }
            else {
                var newday = 30 - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                if (newmonth <= 0) {
                    var newmonth = 12 - newmonth;
                    var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                    var newdate = year - 1 + "-" + snewmonth + "-" + snewday;
                    return newdate;
                }
                else {
                    var newdate = year + "-" + snewmonth + "-" + snewday;
                    return newdate;
                }
            }
        }

        else if (splitofDate[1] == "سنه" && splitofDate[3] == "شهر") {
            var newmonth = month - 1;
            var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
            var newdate = (year - 1) + "-" + snewmonth + "-" + day;
            return newdate;
        }

        else
            return date;
    }

    /*
    قبل ساعه و 9 دقيقه
    قبل أسبوع و 2 يوم
    قبل شهر و 3 أسبوع
    قبل سنه و 2 شهر
    قبل 2 أسبوع و يوم
    */
    else if (lengthofDate == 5) {
        if (splitofDate[2] == "ساعه") {
            if ((hour - splitofDate[1]) < 0)
                return yesterday;
            else
                return today;
        }

        else if (splitofDate[1] == "ساعه" && splitofDate[4] == "دقيقه") {
            if ((hour - 1) < 0)
                return yesterday;
            else
                return today;
        }

        else if (splitofDate[1] == "أسبوع" && splitofDate[4] == "يوم") {
            var NumDays = 7 + splitofDate[3];
            if (day - NumDays <= 0) {
                var newmonth = month - 1;
                var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                var newday = 30 - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                var newdate = year + "-" + snewmonth + "-" + snewday;
                return newdate;
            }
            else {
                var newday = day - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                var newdate = year + "-" + month + "-" + snewday;
                return newdate;
            }
        }

        else if (splitofDate[2] == "أسبوع" && splitofDate[4] == "يوم") {
            var NumDays = 7 * splitofDate[1] + 1;
            if (day - NumDays <= 0) {
                var newmonth = month - 1;
                var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                var newday = 30 - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                var newdate = year + "-" + snewmonth + "-" + snewday;
                return newdate;
            }
            else {
                var newday = day - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                var newdate = year + "-" + month + "-" + snewday;
                return newdate;
            }
        }

        else if (splitofDate[1] == "شهر" && splitofDate[4] == "أسبوع") {
            var NumDays = 7 * splitofDate[3];
            var newmonth = month - 1;
            var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
            if (day - NumDays <= 0) {
                var newmonth = snewmonth - 1;
                var newmonth2 = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                var newday = 30 - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                if (newmonth <= 0) {
                    var newmonth = 12 - newmonth;
                    var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                    var newdate = year - 1 + "-" + snewmonth + "-" + snewday;
                    return newdate;
                }
                else {
                    var newdate = year + "-" + newmonth2 + "-" + snewday;
                    return newdate;
                }
            }
            else {
                var newday = 30 - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                if (newmonth <= 0) {
                    var newmonth = 12 - newmonth;
                    var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                    var newday = 30 - NumDays;
                    return newdate;
                }
                else {
                    var newdate = year + "-" + snewmonth + "-" + snewday;
                    return newdate;
                }
            }
        }

        else if (splitofDate[1] == "سنه" && splitofDate[4] == "شهر") {
            var newmonth = month - splitofDate[3];
            var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
            var newdate = (year - 1) + "-" + snewmonth + "-" + day;
            return newdate;
        }

        else
            return date;
    }

    /*
    قبل 2 ساعه و 29 دقيقه
    قبل 3 أسبوع و 4 يوم
    قبل 2 شهر و 4 أسبوع
    قبل 2 سنه و 2 شهر
    */
    else if (lengthofDate == 6) {
        if (splitofDate[2] == "ساعه") {
            if ((hour - splitofDate[1]) < 0)
                return yesterday;
            else
                return today;
        }

        else if (splitofDate[2] == "يوم" && splitofDate[5] == "ساعه") {
            var NumDays = splitofDate[1];
            if (day - NumDays <= 0) {
                var newmonth = month - 1;
                var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                var newday = 30 - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                var newdate = year + "-" + snewmonth + "-" + snewday;
                return newdate;
            }
            else {
                var newday = day - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                var newdate = year + "-" + month + "-" + snewday;
                return newdate;
            }
        }

        else if (splitofDate[2] == "أسبوع" && splitofDate[5] == "يوم") {
            var NumDays = (7 * splitofDate[1]) + splitofDate[4];
            if (day - NumDays <= 0) {
                var newmonth = month - 1;
                var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                var newdate = year + "-" + snewmonth + "-" + (30 - NumDays);
                return newdate;
            }
            else {
                var newdate = year + "-" + month + "-" + (day - NumDays);
                return newdate;
            }
        }

        else if (splitofDate[2] == "شهر" && splitofDate[5] == "أسبوع") {
            var NumDays = 7 * splitofDate[4];
            var newmonth = month - splitofDate[1];
            var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
            if (day - NumDays <= 0) {
                var newmonth = snewmonth - 1;
                var newmonth2 = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                var newday = 30 - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                if (newmonth <= 0) {
                    var newmonth = 12 - newmonth;
                    var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                    var newdate = year - 1 + "-" + snewmonth + "-" + snewday;
                    return newdate;
                }
                else {
                    var newdate = year + "-" + newmonth2 + "-" + snewday;
                    return newdate;
                }
            }
            else {
                var newday = 30 - NumDays;
                var snewday = (newday < 10) ? '0' + newday : newday;
                if (newmonth <= 0) {
                    var newmonth = 12 - newmonth;
                    var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
                    var newdate = year - 1 + "-" + snewmonth + "-" + snewday;
                    return newdate;
                }
                else {
                    var newdate = year + "-" + snewmonth + "-" + snewday;
                    return newdate;
                }
            }
        }

        else if (splitofDate[2] == "سنه" && splitofDate[5] == "شهر") {
            var newmonth = month - splitofDate[4];
            var snewmonth = (newmonth < 10) ? '0' + (newmonth) : (newmonth);
            var newdate = (year - splitofDate[1]) + "-" + snewmonth + "-" + day;
            return newdate;
        }

        else
            return date;
    }

    else
        return date;
}

var suites = [
    function () {
        this.echo("Suite 1 - Haraj Jeddah Electronic Devices");
        this.start('https://haraj.com.sa/tags/%D8%AC%D8%AF%D9%87_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%A3%D8%AC%D9%87%D8%B2%D8%A9');

        this.then(function () {
            click();
        });

        this.then(function () {
            CollectData("جدة", "اجهزة");
        });
    },
    function () {
        ToGetDate = 1;

        this.echo("Suite 2 - Haraj Jeddah Cars");
        this.start('https://haraj.com.sa/tags/%D8%AC%D8%AF%D9%87_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA');

        this.then(function () {
            click();
        });

        this.then(function () {
            CollectData("جدة", "حراج");
        });
    },
    function () {
        ToGetDate = 1;

        this.echo("Suite 3 - Haraj Jeddah Furniture");
        this.start('https://haraj.com.sa/tags/%D8%AC%D8%AF%D9%87_%D8%A7%D8%AB%D8%A7%D8%AB');

        this.then(function () {
            click();
        });

        this.then(function () {
            CollectData("جدة", "اثاث");
        });
    },
    function () {
        ToGetDate = 1;

        this.echo("Suite 4 - Haraj Mecca Electronic Devices");
        this.start('https://haraj.com.sa/tags/%D9%85%D9%83%D9%87_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%A3%D8%AC%D9%87%D8%B2%D8%A9');

        this.then(function () {
            click();
        });

        this.then(function () {
            CollectData("مكة", "اجهزة");
        });
    },
    function () {
        ToGetDate = 1;

        this.echo("Suite 5 - Haraj Mecca Cars");
        this.start('https://haraj.com.sa/tags/%D9%85%D9%83%D9%87_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA');

        this.then(function () {
            click();
        });

        this.then(function () {
            CollectData("مكة", "حراج");
        });
    },
    function () {
        ToGetDate = 1;

        this.echo("Suite 6 - Haraj Mecca Furniture");
        this.start('https://haraj.com.sa/tags/%D9%85%D9%83%D9%87_%D8%A7%D8%AB%D8%A7%D8%AB');

        this.then(function () {
            click();
        });

        this.then(function () {
            CollectData("مكة", "اثاث");
        });
    },
    function () {
        ToGetDate = 1;

        this.echo("Suite 7 - Haraj Riyadh Electronic Devices");
        this.start('https://haraj.com.sa/tags/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%A3%D8%AC%D9%87%D8%B2%D8%A9');

        this.then(function () {
            click();
        });

        this.then(function () {
            CollectData("الرياض", "اجهزة");
        });
    },
    function () {
        ToGetDate = 1;

        this.echo("Suite 8 - Haraj Riyadh Cars");
        this.start('https://haraj.com.sa/tags/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA');

        this.then(function () {
            click();
        });

        this.then(function () {
            CollectData("الرياض", "حراج");
        });
    },
    function () {
        ToGetDate = 1;

        this.echo("Suite 9 - Haraj Riyadh Furniture");
        this.start('https://haraj.com.sa/tags/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6_%D8%A7%D8%AB%D8%A7%D8%AB');

        this.then(function () {
            click();
        });

        this.then(function () {
            CollectData("الرياض", "اثاث");
        });
    }
];

casper.start();

casper.then(function () {
    this.echo("Starting");
});

var check = function () {
    if (suites[currentSuite]) {
        suites[currentSuite].call(this);
        currentSuite++;
        casper.run(check);
    }
    else {
        fs.write('./ResultsHaraj.json', JSON.stringify(result), 'w');
        console.log('*All data is stored in ResultsHaraj.json.');
        console.log('========================================');
        this.exit();
    }
};

casper.run(check);
