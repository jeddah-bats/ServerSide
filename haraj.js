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
function getCities() {
    var cities = document.querySelectorAll('div.adxExtraInfoPart a');
    return _.map(cities, function (c) {
        return c.innerText;
    });
}

casper.start('https://haraj.com.sa/');

casper.then(function () {
    //this.scrollToBottom();
    casper.click(".active a");
    casper.wait(5000, function () {
    });
    casper.click(".active a");
});

casper.then(function () {
    itemsList.names = this.evaluate(getNames);
    itemsList.links = this.evaluate(getLinks);
    itemsList.cities = this.evaluate(getCities);
    var result = [];
    for (i = 0; i < itemsList.names.length; i++) {
        result.push({
            name: itemsList.names[i],
            link: itemsList.links[i],
            city: itemsList.cities[i]
        });
        console.log("Name: "+itemsList.names[i]);
        console.log("Link: "+itemsList.links[i]);
        console.log("City: "+itemsList.cities[i]);
        console.log('****************************************')
    }
    fs.write('./result.json', JSON.stringify(result), 'w');
    console.log(itemsList.names.length);
});

casper.run();