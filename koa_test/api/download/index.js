const KorRouter = require('koa-router');
const router = new KorRouter();

const ctrl = require('./download.ctrl.js');

// GET => http://21cnkc.iptime.org:4000/api/download/64.jpg
router.get('/:filename', ctrl.download);

module.exports = router;
