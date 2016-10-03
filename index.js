#!/usr/bin/env node --harmony

var fs = require('fs');
var jsonStringify = require('json-pretty');
var _ = require('lodash');
var chalk = require('chalk');
var fake = require('casual');
var program = require('commander');

program
    .arguments('<file_Name>')
    .option('-c, --count <count>', 'Number of elements to create')
    .option('-s, --schema <schema>', 'Schema JSON for the object')
    .action(function(file) {
        file = file  || 'fake-data.json';
        var count = parseInt(program.count || 1);
        var schema = JSON.parse(program.schema || '{"name": "name"}');

        var ws = fs.createWriteStream(file, {
            flags: 'w',
            encoding: 'utf-8',
            mode: 0666
        });

        ws.on('error', function (err) {
            console.log(chalk.red('There was and error: ', err));
            process.exit(1);
        });

        ws.on('finish', function () {
            console.log(chalk.green('File has been created'));
        });

        ws.write('[');
        for(var i = 0; i<count; i++) {
            var obj = {};
            _.forEach(schema, function(value, key) {
                obj[key] = fake[value];
            });
            ws.write(jsonStringify(obj));

            if(i < count - 1) {
                ws.write(', ');
            }
        }
        ws.write(']');
        ws.end();
    })
    .parse(process.argv);
