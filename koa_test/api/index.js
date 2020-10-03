const KorRouter = require('koa-router');
const router = new KorRouter();

const comm = require('./comm');
//
const login = require('./login');
const upload = require('./upload');
const download = require('./download');
const lguplus = require('./lguplus');

router.use('/comm', comm.routes());
//
router.use('/login', login.routes());
router.use('/upload', upload.routes());
router.use('/download', download.routes());
router.use('/lguplus', lguplus.routes());

module.exports = router;
