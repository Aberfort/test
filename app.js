const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

// Data
const CMAD_EN = require('./landings/1/data/custom-mobile-app-development.json');
const MAD = require('./landings/2/data/mobile-app-development.json');
const MAM_EN = require('./landings/3/data/mobile-app-maintenance.json');
const SM_EN = require('./landings/4/data/software-maintenance.json');
const EAD_EN = require('./landings/5/data/enterprise-application-development.json');

nunjucks.configure('./', {
  autoescape: true,
  express: app
});

app.use('/static', express.static('landings'));

app.get('/l/1/custom-mobile-app-development', (req, res) => {
  return res.render('./landings/1/template.html', CMAD_EN);
});

app.get('/l/2/mobile-app-development', (req, res) => {
  return res.render('./landings/2/template.html', MAD.EN);
});

app.get('/l/3/mobile-app-maintenance', (req, res) => {
  return res.render('./landings/3/template.html', MAM_EN);
});

app.get('/l/4/software-maintenance', (req, res) => {
  return res.render('./landings/4/template.html', SM_EN);
});

app.get('/l/4/software-maintenance.html', (req, res) => {
  return res.redirect(301, '/l/4/software-maintenance');
});

app.get('/l/5/enterprise-application-development', (req, res) => {
  return res.render('./landings/5/template.html', EAD_EN);
});

app.all('*', (req, res) => {
  return res.send('404 Not Found');
});

app.listen(3100);
