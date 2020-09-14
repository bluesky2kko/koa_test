const KorRouter = require('koa-router');
const router = new KorRouter();

const ctrl = require('./books.ctrl');

router.get('/search', ctrl.get_search);        // 여러건
router.get('/', ctrl.get_query);        // 1건
router.get('/:cnt', ctrl.get_params);    // 10건씩 ...

// 1. 여러건 1번에 입력
router.post('/multiInsert', ctrl.post_multiInsert);
// 2. 1건만 입력
router.post('/', ctrl.post_insert);

// 1. PUT : 자원의 전체 교체 (싱글용)
router.put('/', ctrl.put_update);
// 2. PATCH : 자원의 부분 교체 (싱글용)
router.patch('/', ctrl.patch_update);
// 3. UPDATE ... SELECT ...

// 싱글 & 멀티
router.delete('/', ctrl.delete);

module.exports = router;
