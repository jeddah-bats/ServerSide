var request = require('request');
var cheerio = require('cheerio');

var cate = ['10','13'];
//var cate = ['حراج','اجهزة'];

var city = ['227','226','228'];
//var city = ['الرياض','مكة','جدة'];

for(var j = 0; j < city.length; j++) {
    for(var i = 0; i < cate.length; i++) {
        for(var p = 1; p <= 5; p++) {
            c=city[j];
            request("http://sooqmzad.com/ads.php?cat="+cate[i]+"&brand=0&typ=0&model=0&country=SA&area="+city[j]+"&service=&id_user=&price_of=&price_up_to=&search=1", function (error, response, body) {

                if (error) {
                    console.log("error");
                    return;
                }
              //console.log("Status Code" + response.statusCode);
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
                console.log('===========================================================================================================')  
            })
        }
    }
}