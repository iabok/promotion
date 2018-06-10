'use strict';
var casual = require('casual');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
require('dotenv').load();

describe('/Promotions/getAlltest suite', function () {

  describe('create test for get', function () {

    it('should get all promo codes', function(done) {
      api.get('/api/Promotions/getAll')
        .send({})
        .expect(200)
        .end(function(err, res) {
          if (err){
            return done(err);
          }
          expect(Object.keys(res.body.data[0])).to.have.length.above(1);
          done();
        });
    });
  });
});
