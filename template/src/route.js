/**
 * Created by liangshan on 2017/11/5.
 */

function route (pathname) {
  if (pathname !== '/favicon.ico') {
    console.log('About to route a request for ' + pathname);
    let pathes = pathname.split('/')
    pathes.shift()
    console.log('pathes: ', pathes)
    let controller = require(`./${pathes[0]}/controller/${pathes[1]}.js`)
    console.log(new controller().indexAction())
  }
}
exports.route = route;
