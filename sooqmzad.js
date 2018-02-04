var request = require('request');
var cheerio = require('cheerio');

request("http://sooqmzad.com/categorie/13/%D8%A3%D8%AC%D9%87%D8%B2%D8%A9", function (error, response, body) {

    if (error) {
        console.log("error");
        return;
    }
    console.log("Status Code" + response.statusCode);
    var $ = cheerio.load(body)

    var ourDiv = $('table.box_cont')

    ourDiv.each(function(index) {
        var title = $(this).find('div.col-md-11.nopadding')
        title.each(function(index) {
            var mtitle = $('a.ads-name', this).text().trim()
            console.log("Name: "+mtitle);
            var link = $(this).find('a.ads-name')
            link.each(function(index) {
                console.log("Link: "+this.attribs.href);
                console.log('************************')
            })
        })
    })
})