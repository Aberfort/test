const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
const helmet = require('helmet');
const env = require('./env.json');

// Data
const CMAD_EN = require('./landings/1/data/mobile-app-development_EN.json');
const CMAD_UK = require('./landings/1/data/mobile-app-development_UK.json');
const CMAD_NO = require('./landings/1/data/mobile-app-development_NO.json');

const MAD_EN = require('./landings/2/data/mobile-app-development_EN.json');
const MAD_UK = require('./landings/2/data/mobile-app-development_UK.json');
const MAD_NO = require('./landings/2/data/mobile-app-development_NO.json');
const MAD_FI = require('./landings/2/data/mobile-app-development_FI.json');
const MAD_NO_EN = require('./landings/2/data/mobile-app-development_NO_EN.json');

const MAM_EN = require('./landings/3/data/mobile-app-maintenance_EN.json');
const MAM_UK = require('./landings/3/data/mobile-app-maintenance_UK.json');
const MAM_NO = require('./landings/3/data/mobile-app-maintenance_NO.json');

const SM_EN = require('./landings/4/data/software-maintenance_EN.json');
const SM_UK = require('./landings/4/data/software-maintenance_UK.json');
const SM_NO = require('./landings/4/data/software-maintenance_NO.json');

const EAD_EN = require('./landings/5/data/enterprise-application-development_EN.json');
const EAD_UK = require('./landings/5/data/enterprise-application-development_UK.json');
const EAD_NO = require('./landings/5/data/enterprise-application-development_NO.json');

const DT_EN = require('./landings/7/data/dedicated-team_EN.json');
const DT_NO_EN = require('./landings/7/data/dedicated-team_NO_EN.json');
const DT_UK = require('./landings/7/data/dedicated-team_UK.json');
const DT_NO = require('./landings/7/data/dedicated-team_NO.json');

const E_NO = require('./landings/8/data/energy_NO.json');

const ECOMM_NO = require('./landings/9/data/ecommerce_NO.json');

const INFO_EN = require('./landings/10/data/infographics_EN.json');

//utils
function getKeyByValue (object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

app.use(helmet());

nunjucks.configure(path.resolve(__dirname) + '/', {
    autoescape: true,
    express: app
});

app.use('/static', express.static(path.resolve(__dirname) + '/landings'));

const landingsRoutes = [
    {
        id: '010',
        url: '/l/1/mobile-app-development',
        template: 'landings/1/template.html',
        translate: {
            net: CMAD_EN,
            couk: CMAD_UK,
            no: CMAD_NO
        }
    },
    {
        id: '020',
        url: '/l/2/mobile-app-development',
        template: './landings/2/template.html',
        translate: {
            net: MAD_EN,
            couk: MAD_UK,
            no: MAD_NO_EN
        }
    },
    {
        id: '021',
        url: '/l/2/mobilapputviklings',
        template: './landings/2/template.html',
        translate: {
            no: MAD_NO
        }
    },
    {
        id: '022',
        url: '/l/2/mobiilisovelluskehitys',
        template: './landings/2/template.html',
        translate: {
            fi: MAD_FI
        }
    },
    {
        id: '030',
        url: '/l/3/mobile-app-maintenance',
        template: './landings/3/template.html',
        translate: {
            net: MAM_EN,
            couk: MAM_UK,
            no: MAM_NO
        }
    },
    {
        id: '040',
        url: '/l/4/software-maintenance',
        template: './landings/4/template.html',
        translate: {
            net: SM_EN,
            couk: SM_UK,
            no: SM_NO
        }
    },
    {
        id: '050',
        url: '/l/5/enterprise-application-development',
        template: './landings/5/template.html',
        translate: {
            net: EAD_EN,
            couk: EAD_UK,
            no: EAD_NO

        }
    },
    {
        id: '070',
        url: '/l/7/dedicated-team',
        template: './landings/7/template.html',
        translate: {
            net: DT_EN,
            no: DT_NO_EN,
            couk: DT_UK
        }
    },
    {
        id: '071',
        url: '/l/7/utvikler-team',
        template: './landings/7/template.html',
        translate: {
            no: DT_NO
        }
    },
    {
        id: '080',
        url: '/l/8/energy',
        template: './landings/8/template.html',
        translate: {
            no: E_NO
        }
    },
    {
        id: '090',
        url: '/l/9/ecommerce',
        template: './landings/9/template.html',
        translate: {
            no: ECOMM_NO
        }
    },
    {
        id: '100',
        url: '/l/10/infographics',
        template: './landings/10/template.html',
        translate: {
            net: INFO_EN
        }
    }
];

landingsRoutes.forEach(landing => {
    app.get(landing.url, (req, res) => {
        const clearedHost = req.header('host').replace('www.', '');
        const domainKey = getKeyByValue(env, clearedHost);

        if (process.env.TR_DOMAIN) {
            landing.translate[domainKey].domain = process.env.TR_DOMAIN;
        } else {
            landing.translate[domainKey].domain = 'traccoon.net.dev'
        }

        landing.translate[domainKey]
            ? res.render(landing.template, landing.translate[domainKey])
            : res.redirect(301, '/404')
    });
});


app.get('*', (req, res) => res.status(404).sendFile(path.resolve(__dirname) + '/landings/shared/404.html'));

app.listen(3100);
