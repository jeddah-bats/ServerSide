var request = require('request')
var cheerio = require('cheerio')
var links = [
       //jeddah
        ['https://haraj.com.sa/tags/%D8%AC%D8%AF%D9%87_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%A3%D8%AC%D9%87%D8%B2%D8%A9',
        'https://haraj.com.sa/tags/%D8%AC%D8%AF%D9%87_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA',
        ],
        //Ryadh
        ['https://haraj.com.sa/tags/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%A3%D8%AC%D9%87%D8%B2%D8%A9',
        'https://haraj.com.sa/tags/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6_%D8%AD%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA',
        ]
        ];

for(var i = 0; i < links.length; i++) {
    for(var z = 0; z < links.length; z++) {
        request(links[z][i],
        function (error, response, body){
            if(error) {
                console.log('Error: ' + error)
                return
            }
            // console.log("Status code: " + response.statusCode)
            var $ = cheerio.load(body)

            var ourDiv = $('div.adsx')

            ourDiv.each(function(index) {
                var title = $(this).find('div.adxTitle')
                title.each(function(index) {
                    var mtitle = $('a', this).text()
                    console.log("Name: "+mtitle);
                    var link = $(this).find('a')
                    link.each(function(index) {
                        console.log("Link: "+this.attribs.href);
                        console.log('************************')
                    })
                })
                var img = $(this).find('div.adxImg')
                img.each(function(index) {
                    var imglink = $(this).find('img')
                    imglink.each(function(index) {
                        console.log("Img: "+this.attribs.src);
                        console.log('************************')
                    })
                })
            })
            console.log('===========================================================================================================')            
            })
    }
}
