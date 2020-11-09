const KorRouter = require('koa-router');
const router = new KorRouter();

const proc = require('./proc.ctrl');

//router.get('/S', proc.get);
router.post('/I', proc.insert);
router.post('/U', proc.update);
//
module.exports = router;
