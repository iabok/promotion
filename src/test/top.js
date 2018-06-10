'use strict';
var app, supertest, expect;
function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
};
describe('My Test Suite', function() {
  before(function() {
    app  = require('../server/server');
    supertest = require('supertest');
    global.api = supertest(app);
    expect = require('expect');
  });

  importTest('GetAllCodes', './getAllCodes/test');  // For all promo codes

  after(function() {
    console.log('after all tests');
  });
});
