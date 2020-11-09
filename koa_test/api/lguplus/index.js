const KorRouter = require('koa-router');
const router = new KorRouter();

const chacsin = require('./chacsin.ctrl');
//const sms = require('./sms.ctrl');
//const tel = require('./tel.ctrl');


// userinfo, setforward, stopforward
// http://21cnkc.iptime.org:4000/api/lguplus/setforward"
router.post('/chacsin/:restapi', chacsin.post);

// userinfo, setforward, stopforward
//router.post('/sms/:restapi', sms.post);

// userinfo, setforward, stopforward
//router.post('/tel/:restapi', tel.post);



module.exports = router;
