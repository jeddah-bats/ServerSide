var fs = require('fs');
var casper = require('casper').create({
    clientScripts: [
        'node_modules/lodash/lodash.js'
    ],
    pageSettings: {
        loadImages: false,
        loadPlugins: false
    },
    logLevel: "error",
    verbose: true
});

var itemsList = {};
var result = [];
var currentSuite = 0;
var ToGetDate=1;

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

function click(){
    //this.scrollToBottom();
    casper.click(".pagination li a");
    casper.wait(5000, function () {
    });
}

function CollectData(CityName,SectionName){
    itemsList.names = casper.evaluate(getNames);
    itemsList.links = casper.evaluate(getLinks);
    itemsList.date = casper.evaluate(getDate);
    for (i = 0; i < itemsList.names.length; i++) {
        result.push({
        name: itemsList.names[i],
        link: itemsList.links[i],
        city: CityName,
        date:itemsList.date[ToGetDate],
        section: SectionName
        });
    console.log("Name: "+itemsList.names[i]);
    console.log("Link: "+itemsList.links[i]);
    console.log("Date: "+itemsList.date[ToGetDate]);
    console.log("City: "+CityName);
    console.log("Section: "+ SectionName);
    console.log('****************************************')

    ToGetDate+=4;
    }
}

var suites = [
    function() {
        this.echo("Suite 1 - Haraj Jeddah Electronic Devices");
        this.start('https://haraj.com.sa/tags/%D8%AC%D8%AF%D9%87_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%A3%D8%AC%D9%87%D8%B2%D8%A9');

        this.then(function () {
            click();
        });
        
        this.then(function () {
            CollectData("جدة","اجهزة");
        });
    },
    function() {
        ToGetDate=1;

        this.echo("Suite 2 - Haraj Jeddah Cars");
        this.start('https://haraj.com.sa/tags/%D8%AC%D8%AF%D9%87_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA');

        this.then(function () {
            click();
        });
        
        this.then(function () {
            CollectData("جدة","حراج");
        });
    },
    function() {
        ToGetDate=1;

        this.echo("Suite 3 - Haraj Jeddah Furniture");
        this.start('https://haraj.com.sa/tags/%D8%AC%D8%AF%D9%87_%D8%A7%D8%AB%D8%A7%D8%AB');

        this.then(function () {
            click();
        });
        
        this.then(function () {
            CollectData("جدة","اثاث");
        });
    }, 
    function() {
        ToGetDate=1;

        this.echo("Suite 4 - Haraj Mecca Electronic Devices");
        this.start('https://haraj.com.sa/tags/%D9%85%D9%83%D9%87_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%A3%D8%AC%D9%87%D8%B2%D8%A9');

        this.then(function () {
            click();
        });
        
        this.then(function () {
            CollectData("مكة","اجهزة");
        });
    },
    function() {
        ToGetDate=1;

        this.echo("Suite 5 - Haraj Mecca Cars");
        this.start('https://haraj.com.sa/tags/%D9%85%D9%83%D9%87_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA');

        this.then(function () {
            click();
        });
        
        this.then(function () {
            CollectData("مكة","حراج");
        });
    },
    function() {
        ToGetDate=1;

        this.echo("Suite 6 - Haraj Mecca Furniture");
        this.start('https://haraj.com.sa/tags/%D9%85%D9%83%D9%87_%D8%A7%D8%AB%D8%A7%D8%AB');

        this.then(function () {
            click();
        });
        
        this.then(function () {
            CollectData("مكة","اثاث");
        });
    },
    function() {
        ToGetDate=1;

        this.echo("Suite 7 - Haraj Riyadh Electronic Devices");
        this.start('https://haraj.com.sa/tags/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%A3%D8%AC%D9%87%D8%B2%D8%A9');

        this.then(function () {
            click();
        });
        
        this.then(function () {
            CollectData("الرياض","اجهزة");
        });
    },
    function() {
        ToGetDate=1;

        this.echo("Suite 8 - Haraj Riyadh Cars");
        this.start('https://haraj.com.sa/tags/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA');

        this.then(function () {
            click();
        });
        
        this.then(function () {
            CollectData("الرياض","حراج");
        });
    },
    function() {
        ToGetDate=1;

        this.echo("Suite 9 - Haraj Riyadh Furniture");
        this.start('https://haraj.com.sa/tags/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6_%D8%A7%D8%AB%D8%A7%D8%AB');

        this.then(function () {
            click();
        });
        
        this.then(function () {
            CollectData("الرياض","اثاث");
        });
    }
];

casper.start();

casper.then(function() {
    this.echo("Starting");
});

var check = function() {
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