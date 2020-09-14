const KorRouter = require('koa-router');
const router = new KorRouter();

const ctrl = require('./jepum.ctrl');

router.get('/search', ctrl.get_search); // 여러건 조회
router.get('/', ctrl.get_query);        // 1건 조회

// 1건만 입력
router.post('/', ctrl.post_insert);

// PUT : 자원의 전체 교체 (싱글용)
router.put('/', ctrl.put_update);

// 싱글 & 멀티
router.delete('/', ctrl.delete);


module.exports = router;
