'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const expressBodyParser = require('body-parser');
const jwt = require('express-jwt');
const pug = require('pug');
const AWS = require('aws-sdk');

const app = express();
app.use(expressBodyParser());

var templateCache = {};

const render = (name, options) => {
  if (!(name in templateCache)) {
    templateCache[name] = pug.compile(fs.readFileSync(
      path.join(__dirname, 'templates', name + '.pug'))
    );
  }
  let tpl = templateCache[name];
  return tpl(options);
};

const assertFormExists = (req, res, cb) => {
  if (!(req.params.formName in forms)) {
    res.status(404).send('This form does not exist');
  } else {
    cb(forms[req.params.formName]);
  }
};

const loadForms = () => {
  var forms = {};
  fs.readdirSync(path.join(__dirname, 'forms')).forEach(file => {
    let form = JSON.parse(fs.readFileSync(path.join(__dirname,'forms', file)));
    let formName = file.split(".")[0];
    forms[formName] = form;
  });
  return forms;
};


// read the beekeeper public key from the environment
const publicKey = process.env.BEEKEEPER_JWT_PUBLIC_KEY;

// load all the forms from disk
const forms = loadForms();

// initialize SES
const ses = new AWS.SES({region: process.env.AWS_REGION});

// render form originally
app.get('/:formName',
  jwt({
    secret: publicKey,
    getToken: req => req.query.token
  }),
  function (req, res) {
    assertFormExists(req, res, (form) => {
      res.send(render('form', {
        query: req.query,
        form: forms[req.params.formName]
      }));
    });
  }
);

// allow submitting data and send it out via email
app.post('/:formName/submit',
  jwt({
    secret: publicKey,
    getToken: req => req.body.token
  }),
  function(req, res) {
    assertFormExists(req, res, (form) => {
      ses.sendEmail({
        Destination: {ToAddresses: [form.recipient]},
        Message: {Body: {
          Html: {Data: render('email', {
            token: req.user,
            form: form,
            data: req.body
          })},
          Text: {Data: ''}},
          Subject: {Data: 'Form submitted: ' + form.title}
        },
        Source: 'do-not-reply@beekeeper.io'
      }, (error, success) => {
        if (success) {
          console.log('Form submitted and e-mail sent.');
          console.log(success);
        } else if (error) {
          console.log('Form submitted and e-mail sending failed!');
          console.log(error);
        }
      });
      res.redirect('/' + req.params.formName + '/success');
    });
  }
);

// display a success message
app.get('/:formName/success',
  function(req, res) {
    assertFormExists(req, res, (form) => {
      res.send(render('success', {
        form: forms[req.params.formName]
      }));
    });
  }
);

// handle missing authorization
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Only beekeeper users are allowed to submit forms.');
  }
});

app.listen(5003);

module.exports = {
  loadForms: loadForms
};
