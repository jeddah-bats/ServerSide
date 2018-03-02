var assert = require('chai').assert;
//var haraj = require("../haraj");
//var opensooq = require("../opensooq");
//var sooqmzad = require("../sooqmzad");
var info_gmap = require("../info-gmap");
//var mongodb = require("../mongodb");
var request = require('supertest');
var app = require("../server");

describe("Test Apps", function(){

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

    describe("Info_GMap", function(){

        it("Set a key", function(){
            var result = info_gmap.API_KEY;
            assert.isNotEmpty(result);
        })

        it("Key is String", function(){
            var result = info_gmap.API_KEY;
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

    describe("Server", function(){
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
    
})