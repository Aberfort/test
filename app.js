const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
const env = require('./env.json');

// Data
const CMAD_EN = require('./landings/1/data/mobile-app-development_EN.json');
const CMAD_UK = require('./landings/1/data/mobile-app-development_UK.json');

const MAD_EN = require('./landings/2/data/mobile-app-development_EN.json');
const MAD_UK = require('./landings/2/data/mobile-app-development_UK.json');
const MAD_NO = require('./landings/2/data/mobile-app-development_NO.json');
const MAD_FI = require('./landings/2/data/mobile-app-development_FI.json');

const MAM_EN = require('./landings/3/data/mobile-app-maintenance_EN.json');
const MAM_UK = require('./landings/3/data/mobile-app-maintenance_UK.json');

const SM_EN = require('./landings/4/data/software-maintenance_EN.json');
const SM_UK = require('./landings/4/data/software-maintenance_UK.json');

const EAD_EN = require('./landings/5/data/enterprise-application-development_EN.json');
const EAD_UK = require('./landings/5/data/enterprise-application-development_UK.json');

nunjucks.configure(path.resolve(__dirname) + '/', {
    autoescape: true,
    express: app
});

const landingsRoutes = [
    {
        id: '010',
        url: '/l/1/mobile-app-development',
        template: 'landings/1/template.html',
        translate: CMAD_EN
    },
    {
        id: '011',
        url: '/l/1/mobile-app-development',
        template: 'landings/1/template.html',
        translate: CMAD_UK,
        host: env.couk
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
        translate: MAD_NO,
        host: env.no
    },
    {
        id: '022',
        url: '/l/2/mobiilisovelluskehitys',
        template: './landings/2/template.html',
        translate: MAD_FI,
        host: env.fi
    },
    {
        id: '023',
        url: '/l/2/mobiilisovelluskehitys',
        template: './landings/2/template.html',
        translate: MAD_UK,
        host: env.couk
    },
    {
        id: '030',
        url: '/l/3/mobile-app-maintenance',
        template: './landings/3/template.html',
        translate: MAM_EN
    },
    {
        id: '031',
        url: '/l/3/mobile-app-maintenance',
        template: './landings/3/template.html',
        translate: MAM_UK,
        host: env.couk
    },
    {
        id: '040',
        url: '/l/4/software-maintenance',
        template: './landings/4/template.html',
        translate: SM_EN
    },
    {
        id: '041',
        url: '/l/4/software-maintenance',
        template: './landings/4/template.html',
        translate: SM_UK,
        host: env.couk
    },
    {
        id: '050',
        url: '/l/5/enterprise-application-development',
        template: './landings/5/template.html',
        translate: EAD_EN
    },
    {
        id: '051',
        url: '/l/5/enterprise-application-development',
        template: './landings/5/template.html',
        translate: EAD_UK,
        host: env.couk
    }
];

landingsRoutes.forEach(landing => {
    app.get(landing.url, (req, res) => {
        const clearedHost = req.header('host').replace('www.', '');

        clearedHost === landing.host || !landing.host
            ? res.render(landing.template, landing.translate || {})
            : res.redirect(301, '/404')
    })
});

app.use('/static', express.static(path.resolve(__dirname) + '/landings'));

app.all('*', (req, res) => res.send('404 Not Found'));

app.listen(3100);
