const KorRouter = require('koa-router');
const router = new KorRouter();

const books = require('./books');
const login = require('./login');
const site = require('./site');
const tree = require('./tree');
const jepum = require('./jepum');
const upload = require('./upload');
const download = require('./download');
const lguplus = require('./lguplus');

router.use('/books', books.routes());
router.use('/login', login.routes());
router.use('/site', site.routes());
router.use('/tree', tree.routes());
router.use('/jepum', jepum.routes());
router.use('/upload', upload.routes());
router.use('/download', download.routes());
router.use('/lguplus', lguplus.routes());

module.exports = router;
