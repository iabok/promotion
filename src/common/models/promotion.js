var table = require('../helpers/tableCreation.js');
var code = require('../helpers/generatePromoCode.js');
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


};
