var request = require('request')
var cheerio = require('cheerio')

var cate = ['%D8%AD%D8%B1%D8%A7%D8%AC-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA'
,'%D9%85%D9%88%D8%A8%D8%A7%D9%8A%D9%84-%D8%AA%D8%A7%D8%A8%D9%84%D8%AA'
,'%D8%A7%D9%84%D8%B9%D8%A7%D8%A8-%D9%81%D9%8A%D8%AF%D9%8A%D9%88-%D9%88%D9%85%D9%84%D8%AD%D9%82%D8%A7%D8%AA%D9%87%D8%A7'
        ,'%D8%A7%D8%AC%D9%87%D8%B2%D8%A9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A7%D8%AA'
            ,'%D8%A3%D8%AB%D8%A7%D8%AB-%D8%AF%D9%8A%D9%83%D9%88%D8%B1'
            ,'%D8%A3%D8%B2%D9%8A%D8%A7%D8%A1-%D9%86%D8%B3%D8%A7%D8%A6%D9%8A%D8%A9'
            ,'%D8%A3%D8%B2%D9%8A%D8%A7%D8%A1-%D8%B1%D8%AC%D8%A7%D9%84%D9%8A%D8%A9'
            ,'%D9%84%D9%88%D8%A7%D8%B2%D9%85-%D8%A7%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84-%D9%88-%D8%A7%D9%84%D8%A3%D9%84%D8%B9%D8%A7%D8%A8'];
//var cate = ['حراج-السيارات','موبايل-تابلت','العاب-فيديو-وملحقاته','اجهزة-الكترونيات'
//            ,'أثاث-ديكور','أزياء-نسائية','أزياء-رجالية','لوازم-الأطفال-و-الألعاب'];

var city = ['%D8%AC%D8%AF%D8%A9','%D9%85%D9%83%D8%A9','%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6'];
//var city = ['الرياض','مكة','جدة'];

for(var j = 0; j < city.length; j++) {
    for(var i = 0; i < cate.length; i++) {
        for(var p = 1; p <= 5; p++) {
            request('https://sa.opensooq.com/ar/'+city[j]+'/'+cate[i]+'/all?page='+p+'&per-page=30',
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
                        //console.log("Price: "+price.trim());
                        var divimg = $(this).find('div.rectLiImg.tableCell.vTop.pl15.relative')
                        divimg.each(function(index) {
                            var img = $(this).find('img.block')
                            img.each(function(index) {
                            //console.log("Img: "+this.attribs.src);
                            })
                        })
                            var city = $('li.ml8.vMiddle', this).not('span.rectLiDate').text();
                            console.log("City: "+city.trim())
                            console.log('************************')
                    })
                })
                console.log('===========================================================================================================')  
            })
        }
    }
}

