'use strict';
var chai = require('chai');
var expect = chai.expect;
require('dotenv').load();

describe('/Promotions test suite', function () {
    var data = {
      'eventId': 1,
      'code': 'SB-123456',
      'amount': 10000,
      'radius': 5,
      'activated': false,
      'expired': false,
  };

  describe('create test for generating new post promo code', function () {
    it('should generate new promo code', function(done) {
      api.post('/api/Promotions')
        .send(data)
        .expect(200)
        .end(function(err, res) {
          if (err){
            return done(err);
          }
          expect(res.body.eventId).to.equal(data.eventId);
          done();
          });
        });
    });
});
