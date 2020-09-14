const KorRouter = require('koa-router');
const router = new KorRouter();

const ctrl = require('./upload.ctrl.js');

// POST => http://21cnkc.iptime.org:4000/api/upload
router.post('/', ctrl.upload);

module.exports = router;
