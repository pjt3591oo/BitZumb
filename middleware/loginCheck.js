/**
 * Created by bagjeongtae on 2018. 2. 21..
 */
// export default function (context) {
//   // 사용자가 인증을 하지 않은 경우.
//   console.log(context.route.query.token)
//   if (!context.store.state.user.isLogin) {
//     return context.redirect('/sign/in')
//   }
// }
export default function ({ isServer, req, store, redirect} ) {
    let isLogin = false

    if (isServer) {
        if(req.user){
          isLogin = true
        }else{
          isLogin = false
        }
    } else {
        if(store.state.user.isLogin){
            isLogin = true
        }else{
            isLogin = false
        }
    }

    if(!isLogin) {
        return redirect('/sign/in')
    }
}