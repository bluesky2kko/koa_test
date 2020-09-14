export default function ({ store, redirect, route }) {
    //
    console.log("route.path => " + route.path)

    // 유저가 권한이 없다면
    if (route.path != '/login' && store.state.authenticated==false) {
        return redirect('/login')
    }
  }