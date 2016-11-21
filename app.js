const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

// Data
const CMAD_EN = require('./landings/1/data/custom-mobile-app-development.json');

const MAD_EN = require('./landings/2/data/mobile-app-development_EN.json');
const MAD_NO = require('./landings/2/data/mobile-app-development_NO.json');
const MAD_FI = require('./landings/2/data/mobile-app-development_FI.json');

const MAM_EN = require('./landings/3/data/mobile-app-maintenance.json');
const SM_EN = require('./landings/4/data/software-maintenance.json');
const EAD_EN = require('./landings/5/data/enterprise-application-development.json');

nunjucks.configure('./', {
  autoescape: true,
  express: app
});

const landingsRoutes = [
  {
    id: '010',
    url: '/l/1/custom-mobile-app-development',
    template: './landings/1/template.html',
    translate: CMAD_EN
  },
  {
    id: '020',
    url: '/l/2/mobile-app-development',
    template: './landings/2/template.html',
    translate: MAD_EN
  },
  {
    id: '021',
    url: '/l/2/mobilapputviklings',
    template: './landings/2/template.html',
    translate: MAD_NO
  },
  {
    id: '022',
    url: '/l/2/mobiilisovelluskehitys',
    template: './landings/2/template.html',
    translate: MAD_FI
  },
  {
    id: '030',
    url: '/l/3/mobile-app-maintenance',
    template: './landings/3/template.html',
    translate: MAM_EN
  },
  {
    id: '040',
    url: '/l/4/software-maintenance',
    template: './landings/4/template.html',
    translate: SM_EN
  },
  {
    id: '050',
    url: '/l/5/enterprise-application-development',
    template: './landings/5/template.html',
    translate: EAD_EN
  }
];

landingsRoutes.forEach(landing => {
  app.get(landing.url, (req, res) => {
    return res.render(landing.template, landing.translate || {});
  })
});

app.use('/static', express.static('landings'));

app.all('*', (req, res) => {
  return res.send('404 Not Found');
});

app.listen(3100);
