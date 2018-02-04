var request = require('request')
var cheerio = require('cheerio')
var links = [
       //jeddah
        ['https://sa.opensooq.com/ar/%D8%AC%D8%AF%D8%A9/%D9%85%D9%88%D8%A8%D8%A7%D9%8A%D9%84-%D8%AA%D8%A7%D8%A8%D9%84%D8%AA/all',
        'https://sa.opensooq.com/ar/%D8%AC%D8%AF%D8%A9/%D8%A3%D8%AB%D8%A7%D8%AB-%D8%AF%D9%8A%D9%83%D9%88%D8%B1/all',
        ],
        //Ryadh
        ['https://sa.opensooq.com/ar/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/%D9%85%D9%88%D8%A8%D8%A7%D9%8A%D9%84-%D8%AA%D8%A7%D8%A8%D9%84%D8%AA/all',
        'https://sa.opensooq.com/ar/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/%D8%A3%D8%AB%D8%A7%D8%AB-%D8%AF%D9%8A%D9%83%D9%88%D8%B1/all',
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

            var ourDiv = $('div.post-item')

            ourDiv.each(function(index) {
                var divdata = $(this).find('li.rectLi.ie.relative.mb15')
                divdata.each(function(index) {
                    var link = $(this).find('a.block.postLink')
                    link.each(function(index) {
                        var title = $(this).find('span.inline.vMiddle.postSpanTitle')
                        title.each(function(index) {
                            console.log("Nmae: "+this.attribs.title);
                        })
                        console.log("Link: https://sa.opensooq.com"+this.attribs.href);
                    })
                    var price = $('span.inline.ltr', this).text()
                    console.log("Price: "+price.trim());
                var divimg = $(this).find('div.rectLiImg.tableCell.vTop.pl15.relative')
                divimg.each(function(index) {
                    var img = $(this).find('img.block')
                    img.each(function(index) {
                        console.log("Img: "+this.attribs.src);
                        console.log('************************')
                        })
                    })
                })
            })
            console.log('===========================================================================================================')            
            })
    }
}
