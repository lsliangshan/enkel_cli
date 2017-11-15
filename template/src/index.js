/**
 * Created by liangshan on 2017/11/5.
 */
// const http = require('http');
// const events = require('events');
// const eventEmitter = new events.EventEmitter();
//
// const config = {
//   port: 8030
// }
//
// let connectHandler = function connected (response) {
//   response.write('连接成功\n')
//
//   eventEmitter.emit('data_received', response);
// }
// eventEmitter.on('connection', connectHandler)
// eventEmitter.on('data_received', function (response) {
//   response.write('数据接收成功\n');
// });
//
// http.createServer((request, response) => {
//   eventEmitter.emit('connection', response);
//
//   response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
//   response.write('Hello world2\n');
//
// }).listen(config.port);
//
//
// console.log('服务已经启动：http:127.0.0.1:' + config.port);

// let server = require('./server');
// let route = require('./route');
// server.start(route.route)

// function test () {
//   return new Promise((resolve, reject) => {
//     setTimeout(function () {
//       console.log('...................')
//       resolve('finish')
//     }, 4000)
//   })
// }
// async function test2() {
//   const result = await test()
//   console.log("...4....", result)
// }
// test2();

const path = require('path');
const ls = require('enkel');
const config = require('./config/config');

console.log('......', path.resolve(__dirname, '../'))

const instance = new ls({
  root_path: path.resolve(__dirname, '../'),
  app_path: __dirname,
  config: config
});

instance.run();
