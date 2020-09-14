const KorRouter = require('koa-router');
const router = new KorRouter();

const ctrl = require('./tree.ctrl');

router.post('/', ctrl.post);
router.get('/', ctrl.get_query);        // 1건

module.exports = router;
