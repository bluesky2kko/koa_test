const KorRouter = require('koa-router');
const router = new KorRouter();

const comm = require('./comm');     
const proc = require('./proc'); // procedure
const md = require('./md');     // master detail type query
//
const login = require('./login');
const lguplus = require('./lguplus');
//
const upload = require('./upload');
const download = require('./download');

router.use('/comm', comm.routes());
router.use('/proc', proc.routes());
router.use('/md', md.routes());    // master detail type query
//
router.use('/login', login.routes());
router.use('/lguplus', lguplus.routes());

router.use('/upload', upload.routes());
router.use('/download', download.routes());

module.exports = router;
