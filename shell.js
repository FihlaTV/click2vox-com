#!/usr/bin/env node
// to use this just run: node shell
var repl = require('repl');
var r = repl.start({ prompt: '> ', useGlobal: true });
r.on('exit', function () {
    console.log('Bye');
    process.exit();
});

// load the models
r.context.Account = require('./models/account');
r.context.Widget = require('./models/widget');
r.context.Rating = require('./models/rating');