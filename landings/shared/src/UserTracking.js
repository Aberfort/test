const searchEngines = [
    'daum.net', 'eniro.se', 'naver.com', 'search.yahoo.com', 'yahoo.com', 'msn.com', 'bing.com', 'aol.com', 'search.aol.com', 'lycos.com', 'ask.com', 'altavista.com', 'cnn.com', 'edition.cnn', 'about.com', 'mamma.com', 'alltheweb.com', 'bing.com', 'baidu.com', 'alice.com', 'yandex.com', 'mamma.com', 'seznam.cz', 'search.com', 'wp.pl', 'online.onetcenter.org', 'yam.com', 'kvasir.no', 'sesam.no', 'terra.com', 'mynet.com', 'onetonline.org', 'rambler.ru', 'google.com', 'google.ac', 'google.ad', 'google.ae', 'google.com.af', 'google.com.ag', 'google.com.ai', 'google.al', 'google.am', 'google.co.ao', 'google.com.ar', 'google.as', 'google.at', 'google.com.au', 'google.az', 'google.ba', 'google.com.bd', 'google.be', 'google.bf', 'google.bg', 'google.com.bh', 'google.bi', 'google.bj', 'google.com.bn', 'google.com.bo', 'google.com.br', 'google.bs', 'google.co.bw', 'google.by', 'google.com.bz', 'google.ca', 'google.com.kh', 'google.cc', 'google.cd', 'google.cf', 'google.cat', 'google.cg', 'google.ch', 'google.ci', 'google.co.ck', 'google.cl', 'google.cm', 'google.cn', 'g.cn', 'google.com.co', 'google.co.cr', 'google.com.cu', 'google.cv', 'google.com.cy', 'google.cz', 'google.de', 'google.dj', 'google.dk', 'google.dm', 'google.com.do', 'google.dz', 'google.com.ec', 'google.ee', 'google.com.eg', 'google.es', 'google.com.et', 'google.fi', 'google.com.fj', 'google.fm', 'google.fr', 'google.ga', 'google.ge', 'google.gf', 'google.gg', 'google.com.gh', 'google.com.gi', 'google.gl', 'google.gm', 'google.gp', 'google.gr', 'google.com.gt', 'google.gy', 'google.com.hk', 'google.hn', 'google.hr', 'google.ht', 'google.hu', 'google.co.id', 'google.iq', 'google.ie', 'google.co.il', 'google.im', 'google.co.in', 'google.io', 'google.is', 'google.it', 'google.je', 'google.com.jm', 'google.jo', 'google.co.jp', 'google.co.ke', 'google.com.kh', 'google.ki', 'google.kg', 'google.co.kr', 'google.com.kw', 'google.kz', 'google.la', 'google.com.lb', 'google.com.lc', 'google.li', 'google.lk', 'google.co.ls', 'google.lt', 'google.lu', 'google.lv', 'google.com.ly', 'google.co.ma', 'google.md', 'google.me', 'google.mg', 'google.mk', 'google.ml', 'google.mn', 'google.ms', 'google.com.mt', 'google.mu', 'google.mv', 'google.mw', 'google.com.mx', 'google.com.my', 'google.co.mz', 'google.com.na', 'google.ne', 'google.com.nf', 'google.com.ng', 'google.com.ni', 'google.nl', 'google.no', 'google.com.np', 'google.nr', 'google.nu', 'google.co.nz', 'google.com.om', 'google.com.pa', 'google.com.pe', 'google.com.ph', 'google.com.pk', 'google.pl', 'google.com.pg', 'google.pn', 'google.com.pr', 'google.ps', 'google.pt', 'google.com.py', 'google.com.qa', 'google.ro', 'google.rs', 'google.ru', 'google.rw', 'google.com.sa', 'google.com.sb', 'google.sc', 'google.se', 'google.com.sg', 'google.sh', 'google.si', 'google.sk', 'google.com.sl', 'google.sn', 'google.sm', 'google.so', 'google.st', 'google.com.sv', 'google.td', 'google.tg', 'google.co.th', 'google.com.tj', 'google.tk', 'google.tl', 'google.tm', 'google.to', 'google.com.tn', 'google.com.tr', 'google.tt', 'google.com.tw', 'google.co.tz', 'google.com.ua', 'google.co.ug', 'google.co.uk', 'google.us', 'google.com.uy', 'google.co.uz', 'google.com.vc', 'google.co.ve', 'google.vg', 'google.co.vi', 'google.com.vn', 'google.vu', 'google.ws', 'google.co.za', 'google.co.zm', 'google.co.zw', 'google.com.mm'
];
const socials = [
    '4travel.jp', 'advogato.org', 'ameba.jp', 'anobii.com', 'asmallworld.com', 'backtype.com', 'badoo.com', 'bebo.com', 'bigadda.com', 'biip.no', 'blackplanet.com', 'blog.seesaa.jp', 'blogger.com', 'blogster.com', 'blomotion.jp', 'bolt.com', 'brightkite.com', 'buzznet.com', 'cafemom.com', 'care2.com', 'classmates.com', 'cloob.com', 'collegeblender.com', 'dailymotion.com', 'del.icio.us', 'deviantart.com', 'digg.com', 'diigo.com', 'disqus.com', 'draugiem.lv', 'facebook.com', 'faceparty.com', 'fb.com', 'fc2.com', 'flickr.com', 'flixster.com', 'fotolog.com', 'foursquare.com', 'blog.friendfeed.com', 'molglobal.mol.com', 'friendster.com', 'fubar.com', 'gaiaonline.com', 'geni.com', 'vk.com', 'ok.ru', 'odnoklassniki.ru', 'love.mail.ru', 'plus.google.com', 'tumblr.com', 'twitter.com', 't.co', 'linkedin.com', 'qzone.qq.com', 'weibo.com', 'renren.com', 'instagram.com', 'fb.com', 'pinterest.com', 'myspace.com'
];

const Cookies = window.Cookies; // Library
const is = window.is; // Library

const cookieOptions = {
    expires: 180,
    path: '/'
};

const DELAY = 3600000; // 1 hour
const DATE = Date.now();

const LOCATION = document.location;
const REFERRER = document.referrer;

const handleCookiesOptions = options => (name, func) => Cookies.set(name, func, options); // Curry
const addCookie = handleCookiesOptions(cookieOptions);

function parseHost (url) {
    const a = document.createElement('a');
    a.href = url;
    return a.hostname;
}

function getQuery (url, queryName) {
    const queryObject = querystring(url.search);

    return queryObject[queryName]
}

function getReferrer (referrer, sites, socials) {
    const cleanReferrer = referrer.replace(/www.|https:\/\/|http:\/\//gi, '');
    const checkSites = sites.filter(elem => is.include(cleanReferrer, elem));
    const checkSocials = socials.filter(elem => is.include(cleanReferrer, elem));

    if (is.not.empty(checkSites)) return 'organic';
    if (is.not.empty(checkSocials)) return 'social';
    if (is.empty(checkSocials) && is.empty(checkSites)) return 'referral'
}

function deviceType () {
    if (is.mobile()) return 'mobile';
    if (is.tablet()) return 'tablet';
    if (is.desktop()) return 'desktop';

    return 'none';
}

function setGCLID (url, queryName) {
    const GCLIDCookie = Cookies.get('is_gclid');

    return getQuery(url, queryName) || GCLIDCookie || ''
}

function entryPage (url) {
    return url.host + url.pathname
}

function setMediumHistory () {
    const getMediumCookie = Cookies.get('is_utm_medium');
    const mediumCookie = Cookies.get('is_medium_history');
    const userDate = Cookies.get('is_timer');

    const createMediumBuffer = mediumCookie && mediumCookie.split(',') || [];
    const currentDate = Date.now();
    const isTimerDone = (Number(userDate) + DELAY) - currentDate;
    const lastElementOfArray = createMediumBuffer[createMediumBuffer.length - 1];

    if (isTimerDone <= 0 || getMediumCookie !== lastElementOfArray) {
        Cookies.set('is_timer', DATE, cookieOptions); // Clear the timer

        return getMediumCookie === 'direct'
            ? createMediumBuffer.push(['direct']) && createMediumBuffer.join(',')
            : createMediumBuffer.push(getMediumCookie) && createMediumBuffer.join(',')
    } else {
        if (mediumCookie) { // If we already know the user
            return mediumCookie
        } else { // If we don't know the user
            return getMediumCookie === 'direct'
                ? 'direct'
                : getMediumCookie
        }
    }
}

function setNetwork (url, queryName) {
    let updatedNetwork = getQuery(url, queryName);

    if (updatedNetwork === 'g') updatedNetwork = 'Google Search';
    if (updatedNetwork === 's') updatedNetwork = 'Google Search Partner';
    if (updatedNetwork === 'd') updatedNetwork = 'Google Display Network';

    return updatedNetwork || 'none'
}

function setCampaign (url) {
    const campaign = getQuery(url, 'campaign');
    const utm_campaign = getQuery(url, 'utm_campaign');

    return campaign || utm_campaign || 'none'
}

function setContent (url) {
    const creative = getQuery(url, 'creative');
    const utm_content = getQuery(url, 'utm_content');

    return creative || utm_content || 'none'
}

function setMedium (url) {
    const getGclidCookie = getQuery(url, 'gclid');
    const getUtmMedium = getQuery(url, 'utm_medium');

    return getGclidCookie
        ? 'cpc'
        : getUtmMedium
        || is.not.empty(REFERRER) && getReferrer(REFERRER, searchEngines, socials)
        || 'none'
}

function setSource (url) {
    const getGclidCookie = getQuery(url, 'gclid');
    const getUtmSource = getQuery(url, 'utm_source');
    const clearedReferrer = REFERRER && parseHost(REFERRER).replace('www.', '');

    return getGclidCookie
        ? 'google'
        : getUtmSource
        || clearedReferrer
        || 'direct'
}

function setTerm (url) {
    const keyword = getQuery(url, 'keyword');
    const utm_term = getQuery(url, 'utm_term');

    return keyword || utm_term || 'none'
}

function setReferrer (url) {
    const queryURL = getQuery(url, 'url');
    const ifIntellectsoft = queryURL && queryURL.match(/intellectsoft/);
    const isIntellectsoft = ifIntellectsoft && ifIntellectsoft.join() === 'intellectsoft';

    return queryURL && !isIntellectsoft
        ? queryURL
        : REFERRER || 'none'
}

function setID (id) { return id }

addCookie('is_device', deviceType());

addCookie('is_gclid', setGCLID(LOCATION, 'gclid'));

Cookies.get('is_landing_url') || addCookie('is_landing_url', entryPage(LOCATION));

addCookie('is_utm_medium', setMedium(LOCATION));

addCookie('is_medium_history', setMediumHistory());

Cookies.get('is_timer') || addCookie('is_timer', DATE);

addCookie('is_network', setNetwork(LOCATION, 'network'));

addCookie('is_utm_campaign', setCampaign(LOCATION));

addCookie('is_utm_content', setContent(LOCATION));

addCookie('is_utm_source', setSource(LOCATION));

addCookie('is_utm_term', setTerm(LOCATION));

addCookie('is_referrer', setReferrer(LOCATION));

window.addEventListener('load', function () {
    const GOOGLE_UNIQUE_ID = ga.getAll()[0].get('clientId');

    addCookie('is_uniqid', setID(GOOGLE_UNIQUE_ID));
});
