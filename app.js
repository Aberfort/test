const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const webinarApi = require('./webinar-api');
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

const ECOMM_NO = require('./landings/9/data/ecommerce_NO.json');

const INFO_EN = require('./landings/10/data/infographics_EN.json');

const CC_EN = require('./landings/11/data/cloud_computing_EN.json');
const CC_UK = require('./landings/11/data/cloud_computing_UK.json');

const BC_EN = require('./landings/12/data/blockchain_EN.json');
const BC_UK = require('./landings/12/data/blockchain_UK.json');
const BC_NO = require('./landings/12/data/blockchain_NO.json');

const CSD_EN = require('./landings/13/data/custom-software-development_EN.json');
const CSD_UK = require('./landings/13/data/custom-software-development_UK.json');
const CSD_NO = require('./landings/13/data/custom-software-development_NO.json');

const ID_EN = require('./landings/14/data/ios-developers_EN.json');
const ID_NO_EN = require('./landings/14/data/ios-developers_NO_EN.json');
const ID_UK = require('./landings/14/data/ios-developers_UK.json');
const ID_NO = require('./landings/14/data/ios-developers_NO.json');

const AD_EN = require('./landings/15/data/app-developers_EN.json');
const AD_NO_EN = require('./landings/15/data/app-developers_NO_EN.json');
const AD_UK = require('./landings/15/data/app-developers_UK.json');
const AD_NO = require('./landings/15/data/app-developers_NO.json');

const BW_EN = require('./landings/16/data/blockchain-webinar_EN.json');

const KD_EN = require('./landings/17/data/kado-solution_EN.json');
const KD_UK = require('./landings/17/data/kado-solution_UK.json');

const MOBAPPDEV_EN = require('./landings/18/data/mobile-app-developers_EN.json');
const MOBAPPDEV_UK = require('./landings/18/data/mobile-app-developers_UK.json');

const MOBAPPDEV2_EN = require('./landings/19/data/mobile-app-developers_EN.json');
const MOBAPPDEV2_UK = require('./landings/19/data/mobile-app-developers_UK.json');
const MOBAPPDEV2_NO = require('./landings/19/data/mobile-app-developers_NO.json');

const SOFTDEV_EN = require('./landings/20/data/software-development_EN.json');
const SOFTDEV_UK = require('./landings/20/data/software-development_UK.json');
const SOFTDEV_NO = require('./landings/20/data/software-development_NO.json');

const MOBAPPDEV1_NO = require('./landings/21/data/mobile-app-developers_NO.json');

const SOFT_DEV_EN = require('./landings/22/data/software-development_EN.json');
const SOFT_ENG_EN = require('./landings/23/data/software-engineering_EN.json');
const CREATE_MOBILE_EN = require('./landings/24/data/how-to-create-a-mobile-app-guide_EN.json');
const SOFT_WORK = require('./landings/25/data/software-and-tech-workshops_EN.json');
const WEB_DIGITAL = require('./landings/26/data/webinar-digital-transformation-in-hospitality_EN.json');

const DIGITAL_TRANSFORMATION = require('./landings/27/data/digital-transformation-tech-guide_EN.json');

//utils
function getKeyByValue (object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
    },
    {
        id: '110',
        url: '/l/11/cloud-computing',
        template: './landings/11/template.html',
        translate: {
            net: CC_EN,
            couk: CC_UK
        }
    },
    {
        id: '120',
        url: '/l/12/blockchain',
        template: './landings/12/template.html',
        translate: {
            net: BC_EN,
            couk: BC_UK,
            no: BC_NO,
        }
    },
    {
        id: '130',
        url: '/l/13/custom-software-development',
        template: './landings/13/template.html',
        translate: {
            net: CSD_EN,
            couk: CSD_UK,
            no: CSD_NO

        }
    },
    {
        id: '140',
        url: '/l/14/ios-developers',
        template: './landings/14/template.html',
        translate: {
            net: ID_EN,
            no: ID_NO_EN,
            couk: ID_UK
        }
    },
    {
        id: '141',
        url: '/l/14/utvikler-team',
        template: './landings/14/template.html',
        translate: {
            no: ID_NO
        }
    },
    {
        id: '150',
        url: '/l/15/app-developers',
        template: './landings/15/template.html',
        translate: {
            net: AD_EN,
            no: AD_NO_EN,
            couk: AD_UK
        }
    },
    {
        id: '151',
        url: '/l/15/utvikler-team',
        template: './landings/15/template.html',
        translate: {
            no: AD_NO
        }
    },
    {
        id: '160',
        url: '/l/16/blockchain-webinar',
        template: './landings/16/template.html',
        translate: {
            net: BW_EN
        }
    },
    {
        id: '170',
        url: '/l/17/kado-solution-for-ar',
        template: './landings/17/template.html',
        translate: {
            net: KD_EN,
            couk: KD_UK
        }
    },
    {
        id: '180',
        url: '/l/18/mobile-app-developers',
        template: './landings/18/template.html',
        translate: {
            net: MOBAPPDEV_EN,
            couk: MOBAPPDEV_UK
        }
    },
    {
        id: '190',
        url: '/l/18/mobile-app-developers-2',
        template: './landings/19/template.html',
        translate: {
            net: MOBAPPDEV2_EN,
            couk: MOBAPPDEV2_UK
        }
    },
    {
        id: '200',
        url: '/l/19/custom-software-development-services',
        template: './landings/20/template.html',
        translate: {
            net: SOFTDEV_EN,
            couk: SOFTDEV_UK,
            no: SOFTDEV_NO
        }
    },
    {
        id: '210',
        url: '/l/18/mobile-app-developers-1',
        template: './landings/21/template.html',
        translate: {
            no: MOBAPPDEV1_NO
        }
    },
    {
        id: '220',
        url: '/l/20/software-development',
        template: './landings/22/template.html',
        translate: {
            net: SOFT_DEV_EN
        }
    },
    {
        id: '230',
        url: '/l/21/software-engineering',
        template: './landings/23/template.html',
        translate: {
            net: SOFT_ENG_EN
        }
    },
    {
        id: '240',
        url: '/l/22/how-to-create-a-mobile-app-guide',
        template: './landings/24/template.html',
        translate: {
            net: CREATE_MOBILE_EN
        }
    },
    {
        id: '250',
        url: '/l/23/software-and-tech-workshops',
        template: './landings/25/template.html',
        translate: {
            net: SOFT_WORK
        }
    },
    {
        id: '260',
        url: '/l/24/webinar-digital-transformation-in-hospitality',
        template: './landings/26/template.html',
        translate: {
            net: WEB_DIGITAL
        }
    },
    {
        id: '270',
        url: '/l/27/digital-transformation-hospitality-tech-guide',
        template: './landings/27/template.html',
        translate: {
            net: DIGITAL_TRANSFORMATION
        }
    }
];

app.post('/l/api/register', webinarApi.sendMail);

landingsRoutes.forEach(landing => {
    app.get(landing.url, (req, res) => {
        const clearedHost = req.header('host').replace('www.', '');
        const domainKey = getKeyByValue(env.domains, clearedHost);

        if (landing.translate[domainKey]) {
            env.traccoon_domain
                ? landing.translate[domainKey].domain = env.traccoon_domain
                : landing.translate[domainKey].domain = 'traccoon.net.dev'
        }

        landing.translate[domainKey]
            ? res.render(landing.template, landing.translate[domainKey])
            : res.redirect(301, '/404')
    });
});

app.get('*', (req, res) => res.status(404).sendFile(path.resolve(__dirname) + '/landings/shared/404.html'));

app.listen(3100, () => console.log('Listening on 3100'));
