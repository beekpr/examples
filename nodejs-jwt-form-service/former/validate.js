'use strict';

const fs = require('fs');
const path = require('path');
const ZSchema = require("z-schema");
const former = require('./index');

const validator = new ZSchema();
const schema = JSON.parse(fs.readFileSync(path.join(__dirname, 'form.schema')));

const forms = former.loadForms();

let exitCode = 0;

for(var formName in forms) {
    console.log("Validating " + formName);
    let valid = validator.validate(forms[formName], schema);
    if (valid === true) {
        console.log('Form is valid!');
    } else {
        console.log('Form is not valid:');
        validator.getLastErrors().forEach((err) => {
            console.log(err);
        });
        exitCode = 1;
    }
}

console.log("Done.");
process.exit(exitCode);
