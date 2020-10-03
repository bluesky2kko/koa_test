const KorRouter = require('koa-router');
const router = new KorRouter();

const ctrl = require('./comm.ctrl');

// POST => "http://21cnkc.iptime.org:4000/api/comm/INQ/1?menu=login"

// GET => http://21cnkc.iptime.org:4000/api/comm/SM/1?menu=site&site_nm=%%
// GET => http://21cnkc.iptime.org:4000/api/comm/SM/2?menu=site&site_nm=%%
// 1 : comm, 2: site(테이블명)
router.get('/SM', ctrl.get_query);        // search 여러건
router.get('/S', ctrl.get_query);         // seek 1건
router.get('/Q', ctrl.get_query);         // inquiry 1건
//
router.post('/SM', ctrl.post_siud);       // search 여러건 => 조건검색 
router.post('/Q', ctrl.post_siud);        // inquiry 1건
//
//
router.post('/I', ctrl.post_siud);        // 1 건만 입력
router.put('/U', ctrl.post_siud);         // 1. PUT : 자원의 전체 교체 (싱글용)
router.patch('/U2', ctrl.post_siud);      // 2. PATCH : 자원의 부분 교체 (싱글용)
router.delete('/D', ctrl.post_siud);      // Single, Multi 동시처리 가능...
//
//
router.post('/MI', ctrl.post_multiInsert);     // 1. 여러건 1번에 입력
//router.get('/PROC', ctrl.get_proc);
//router.post('/PROC', ctrl.post_proc);
//
module.exports = router;
