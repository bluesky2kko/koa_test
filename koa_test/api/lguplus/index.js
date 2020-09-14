const KorRouter = require('koa-router');
const router = new KorRouter();

const ctrl = require('./lguplus.ctrl');

// userinfo, setforward, stopforward
router.post('/:restapi', ctrl.post);

module.exports = router;
