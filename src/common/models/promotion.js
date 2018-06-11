'use strict';
var table = require('../helpers/tableCreation.js');
var code = require('../helpers/generatePromoCode.js');
var radius = require('../helpers/getRadius.js');
var moment = require('moment');

module.exports = function(Promotion) {

    //creates the promotions table
    table.createTable();

    // Operation hook to handle the date info
    // Update createdAt on model creation and updatedAt on model update
    Promotion.observe('before save', function filterProperties(ctx, next) {
        if (ctx.isNewInstance) {
            ctx.instance.code = code.generate();
            ctx.instance.createdAt = moment().format();
        } else {
            ctx.data.updatedAt = moment().format();
        } next();
    });

    // Method which lists all promo codes
    Promotion.getAllPromoCodes = function(cb) {
        Promotion.find(cb);
    };

    // Method which lists all active promo codes
    Promotion.getActiveCodes = function(cb) {
        Promotion.find({
            where: {
                expired: false,
                activated:true
            }
        }, cb);
    };

    // Method to configure promo radius
    Promotion.setPromoRadius = function (data, cb){
        Promotion.find({
            where: {
                code:data.code
            }
        }, function (err, promotion){
            if (err) {
                return cb(err);
            }
            if (Object.keys(promotion).length === 0) {
                   cb(null, "Invalid Promo Code");
            } else {
                var promoId = promotion[0].id;
                return Promotion.updateAll({id: promoId}, {radius: data.radius}, function(err, res) {
                    cb(null, res.count > 0);
                });
            }
        });
    };

    // Method to activated and deactivate promo code
    Promotion.activate = function (data, cb){
        Promotion.find({
            where: {
                code:data.code
            }
        }, function (err, promotion){
            if (err) {
                return cb(err);
            }
            if (Object.keys(promotion).length === 0) {
                   cb(null, "Invalid Promo Code");
            } else {
                var promoId = promotion[0].id;
                return Promotion.updateAll({id: promoId}, {activated: data.activated}, function(err, res) {
                    cb(null, res.count > 0);
                });
            }
        });
    };

    // Method to retire a promo code
    Promotion.expire = function (data, cb){
        Promotion.find({
            where: {
                code:data.code
            }
        }, function (err, promotion){
            if (err) {
                return cb(err);
            }
            if (Object.keys(promotion).length === 0) {
                   cb(null, "Invalid Promo Code");
            } else {
                var promoId = promotion[0].id;
                return Promotion.updateAll({id: promoId}, {expire: data.expired}, function(err, res) {
                    cb(null, res.count > 0);
                });
            }
        });
    };

    // Method to validate promo codes
    Promotion.validatePromoCode = function (data, cb){
        Promotion.find({
            where: {
                code: data.code,
                activated: true,
                expired: false
            }
        }, function (err, promotion) {
            if (err) {
                return cb(err);
            }
            if (Object.keys(promotion).length === 0) {
                   cb(null, "Invalid Promo Code");
            } else {
                var points = {
                    from: data.from,
                    to: data.to
                };
                var userRadius = radius.getRadius(points);
                var promoRadius = promotion[0].radius;
                if (userRadius <= promoRadius) {
                    Object.assign(promotion[0], points);
                    cb(null, promotion);
                } else {
                    cb(null, "Invalid Promo Code");
                }

            }
        });
    };

};
