
'use strict';
const path = require('path');

module.exports = function (app) {
    app.use('/api/workin/excercise', require('./excercise'));
};
