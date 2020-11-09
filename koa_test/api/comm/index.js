const KorRouter = require('koa-router');
const router = new KorRouter();

const ctrl = require('./comm.ctrl');

// POST => "http://21cnkc.iptime.org:4000/api/comm/INQ/1?menu=login"

// GET => http://21cnkc.iptime.org:4000/api/comm/SM/1?menu=site&site_nm=%%
// GET => http://21cnkc.iptime.org:4000/api/comm/SM/2?menu=site&site_nm=%%
// 1 : comm, 2: site(테이블명)
router.get('/SM', ctrl.comm_siud);        // search 여러건
router.get('/S', ctrl.comm_siud);         // seek 1건
router.get('/Q', ctrl.comm_siud);         // inquiry 1건
router.get('/Q2', ctrl.comm_siud);        // inquiry2 1건
//
router.post('/SM', ctrl.comm_siud);       // search 여러건 => 조건검색 
router.post('/Q', ctrl.comm_siud);        // inquiry 1건
router.post('/I', ctrl.comm_siud);        // 1 건만 입력
router.post('/U', ctrl.comm_siud);        //
router.post('/U2', ctrl.comm_siud);       //
router.post('/D', ctrl.comm_siud);        // Single, Multi 동시처리 가능...
//
//router.put('/U', ctrl.comm_siud);         // 1. PUT : 자원의 전체 교체 (싱글용)
//router.patch('/U2', ctrl.comm_siud);      // 2. PATCH : 자원의 부분 교체 (싱글용)
//router.delete('/D', ctrl.comm_siud);      // Single, Multi 동시처리 가능...
//
router.post('/MI', ctrl.post_multiInsert);     // 1. 여러건 1번에 입력
//
module.exports = router;
