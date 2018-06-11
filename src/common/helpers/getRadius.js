'use strict';
var loopback = require('loopback');
module.exports = {
    getRadius: function(points) {
        var latFrom = points.from.latitude;
        var longFrom = points.from.longtitude;
        var latTo = points.to.latitude;
        var longTo = points.to.longtitude;

        var from = new loopback.GeoPoint( {lat: latFrom, lng: longFrom} );
        var to = new loopback.GeoPoint( {lat: latTo, lng: longTo} );

        var distance = from.distanceTo( to, {type: 'kilometers'});

        return distance / 2;
    }
};
