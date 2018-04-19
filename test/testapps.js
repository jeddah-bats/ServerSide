

var Coveralls = require ('coveralls');
Coveralls.wear;

var assert = require('chai').assert;
var chai = require('chai');
chai.use(require('chai-fs'));
chaiHttp = require('chai-http');
chai.use(chaiHttp);
var fs = require('fs');
var app = require("../server");
var info_gmap = require("../info-gmap");
var request = require('supertest');
//var mongodb = require("../mongodb");

describe("Check Data Files existance :", function () {
    it("File ResultsInfo-GMap.json Found", function () {

        var result = fs.readFileSync("./ResultsInfo-GMap.json");
        //var result =info_gmap.filecheck;
        assert.exists(result, "result is not null or undefiend");

    })


    it("File ResultsOpenSooq.json Found", function () {

        var result = fs.readFileSync("./ResultsOpenSooq.json");
        //var result =info_gmap.filecheck;
        assert.exists(result, "result is not null or undefiend");

    })
    it("File ResultsSooqMzad.json Found", function () {

        var result = fs.readFileSync("./ResultsSooqMzad.json");
        //var result =info_gmap.filecheck;
        assert.exists(result, "result is not null or undefiend");

    })
    it("File ResultsHaraj.json Found", function () {

        var result = fs.readFileSync("./ResultsHaraj.json");
        //var result =info_gmap.filecheck;
        assert.exists(result, "result is not null or undefiend");

    })
});

describe("Check Data Files empty :", function () {
    it("File ResultsInfo-GMap.json include Data", function () {

        var result = fs.readFileSync("./ResultsInfo-GMap.json");
        //var result =info_gmap.filecheck;
        assert.isNotEmpty(result, "result is not null or undefiend");

    })


    it("File ResultsOpenSooq.json include Data", function () {

        var result = fs.readFileSync("./ResultsOpenSooq.json");
        //var result =info_gmap.filecheck;
        assert.isNotEmpty(result, "result is not null or undefiend");

    })
    it("File ResultsSooqMzad.json include Data", function () {

        var result = fs.readFileSync("./ResultsSooqMzad.json");
        //var result =info_gmap.filecheck;
        assert.isNotEmpty(result, "result is not null or undefiend");

    })
    it("File ResultsHaraj.json include Data", function () {

        var result = fs.readFileSync("./ResultsHaraj.json");
        //var result =info_gmap.filecheck;
        assert.isNotEmpty(result, "result is not null or undefiend");

    })



});

describe("Check Server Connection :", function () {
    this.timeout(50000);
    
    it('/Products Connection Done Successfully', function(done) { // <= Pass in done callback
        this.timeout(50000);
        setTimeout(done, 50000)
        chai.request('http://jeddah-bats.herokuapp.com').get('/Products').end(function(err, res) {
          chai.expect(res).to.have.status(200);
          done();
        });
      });

      it('/Places Connection Done Successfully', function(done) { // <= Pass in done callback
        this.timeout(50000);
        setTimeout(done, 50000)
        chai.request('http://jeddah-bats.herokuapp.com').get('/Places').end(function(err, res) {
          chai.expect(res).to.have.status(200);
          done();
        });
      });


});


describe("Check Google-apps API key", function(){

    

    it("API key has been set", function(){
        var result = info_gmap.API_KEY;
        assert.isNotEmpty(result,"set");
    })

    it("API key must be rounded by double quotation", function(){
        var result = info_gmap.API_KEY;
        assert.typeOf(result, 'string');
    })

    it('MONGO', function(done) {
        request(app).get('mongodb://turki:turki@ds147668.mlab.com:47668/senior_project')
          //.set('Accept', 'application/json')
          //.expect('Content-Type', /json/)
          .expect(200, done);
    });
});

//'mongodb://turki:turki@ds147668.mlab.com:47668/senior_project'

/*describe("Test Apps", function(){

    describe("fileexist", function(){

        it("check file", function(){
            var result = info_gmap.filec;
            assert.isTrue(result,"File Found")
        })

    })

    //Error due to Casperjs
    /*describe("Haraj", function(){
        it("No test :(", function(){

        })
    })*/

    /*describe("OpenSooq", function(){
        it("No test :(", function(){
        })
    })*/

    /*describe("SooqMzad", function(){
        it("No test :(", function(){
        })
    })*/

    /*describe("Info_GMap", function(){

        it("Set a key", function(){
            var result = info_gmap.KEY;
            assert.isNotEmpty(result);
        })

        it("Key is String", function(){
            var result = info_gmap.KEY;
            assert.typeOf(result, 'string');
        })

        it("Keyword is array", function(){
            var result = info_gmap.keyword;
            assert.isArray(result, 'what Keyword of place do we want?');
        })

        it("Keyword has 8 variables", function(){
            var result = info_gmap.keyword;
            assert.lengthOf(result,8,'Keyword has length of 8');
        })
    })

    /*describe("MongoDB", function(){
        it("No test :(", function(){
        })
    })*/

   /* describe("Server", function(){
        it('GET /Places', function(done) {
            request(app).get('/Places')
              //.set('Accept', 'application/json')
              //.expect('Content-Type', /json/)
              .expect(200, done);
        });

        it('GET /Products', function(done) {
            request(app).get('/Products')
              //.set('Accept', 'application/json')
              //.expect('Content-Type', /json/)
              .expect(200, done);
        });
    })
    
})*/