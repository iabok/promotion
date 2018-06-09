module.exports = {
    generate: function () {
        return 'SB-' + this.getRandomInt();
    },
    getRandomInt: function () {
        return Math.floor(Math.random() * Math.floor(99999));
    }
};
