var assert = require('chai').assert;
var chai = require('chai');
chai.use(require('chai-fs'));
chaiHttp = require('chai-http');
chai.use(chaiHttp);
var fs = require('fs');
var info_gmap = require("../info-gmap");
var request = require('supertest');

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

    it('/Products Connection Done Successfully', function (done) { // <= Pass in done callback
        this.timeout(50000);
        setTimeout(done, 50000)
        chai.request('http://localhost:3000').get('/Products').end(function (err, res) {
            chai.expect(res).to.have.status(200);
            done();
        });
    });

    it('/Places Connection Done Successfully', function (done) { // <= Pass in done callback
        this.timeout(50000);
        setTimeout(done, 50000)
        chai.request('http://localhost:3000').get('/Places').end(function (err, res) {
            chai.expect(res).to.have.status(200);
            done();
        });
    });

    it('/results/مكة/ايفون Connection Done Successfully', function (done) { // <= Pass in done callback
        this.timeout(50000);
        setTimeout(done, 50000)
        chai.request('http://localhost:3000').get('/results/مكة/ايفون').end(function (err, res) {
            chai.expect(res).to.have.status(200);
            done();
        });
    });

    it('/comparing/حراج Connection Done Successfully', function (done) { // <= Pass in done callback
        this.timeout(50000);
        setTimeout(done, 50000)
        chai.request('http://localhost:3000').get('/comparing/حراج').end(function (err, res) {
            chai.expect(res).to.have.status(200);
            done();
        });
    });


});


describe("Check Google-apps API key", function () {



    it("API key has been set", function () {
        var result = info_gmap.API_KEY;
        assert.isNotEmpty(result, "set");
    })

    it("API key must be rounded by double quotation", function () {
        var result = info_gmap.API_KEY;
        assert.typeOf(result, 'string');
    })

   

});