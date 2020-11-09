const KorRouter = require('koa-router');
const router = new KorRouter();

// multi query 멀티 쿼리 ...
const md = require('./md.ctrl');

router.post('/I', md.iud);
router.post('/U', md.iud);
//
module.exports = router;
