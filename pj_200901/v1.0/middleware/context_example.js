/*
미들웨어
미들웨어를 사용하면 페이지나 페이지 그룹을 렌더링하기 전에 실행할 사용자 지정함수를 정의할 수 있습니다.

모든 미들웨어는 middleware/ 디렉토리에 있어야합니다. 파일 이름은 곧 미들웨어의 이름이 됩니다. (예를 들어 middleware/auth.js는 auth 미들웨어가 됩니다.) 직접적으로 함수를 사용하는 것으로 페이지에 특화된 미들웨어를 여러분은 정의할 수있습니다. 익명 미들웨어를 참조해주세요.

미들웨어는 context를 첫 인자로 전달받습니다:

유니버셜 모드에서는, 
 - 미들웨어는 서버 측에서 한 번 호출됩니다(Nuxt 앱의 첫 리퀘스트 혹은 새로 고침 시) 
 - 그리고 클라이언트 측에서 이후의 라우팅을 담당합니다. 

SPA 모드에서는, 
 - 미들웨어는 처음 리퀘스트 시 클라이언트 측에서 호출되고 
 - 이후의 라우팅시에 호출됩니다.
*/

export default function (context) {
    // context.userAgent = process.server
    //   ? context.req.headers['user-agent']
    //   : navigator.userAgent
    //console.log("=== context ===")
    //console.log(context)
    console.log("=== context from ===")
    console.log(context.from)       // 호출한 곳 라우트

    console.log("=== context route ===")
    console.log(context.route)      // 현재 라우트


}

