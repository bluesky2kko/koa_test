const KorRouter = require('koa-router');
const router = new KorRouter();

const ctrl = require('./login.ctrl');

router.post('/', ctrl.post_login);        // 1건
router.get('/token', ctrl.get_token);   // login/token

module.exports = router;
