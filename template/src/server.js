/**
 * Created by liangshan on 2017/11/5.
 */
const http = require('http');
const url = require('url');
const path = require('path')
// const util = require('util');
const lsUtil = require('./urlParser');
const config = {
  port: '8010'
}

function start (route) {
  function onRequest (request, response) {
    let pathname = url.parse(request.url).pathname;
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    // response.write('Request for ' + pathname + ' received.\n');
    // console.log('Request for ' + pathname + ' received.\n');
    // response.write(JSON.stringify(url.parse(request.url))+ '\n');
    route(pathname);
    // response.write(process.cwd() + '\n');
    // response.write(process.version + '\n');
    // response.write(util.inspect(url.parse(request.url, true)));
    // response.write(lsUtil.parser(request.headers) + '\n');
    response.write('5\n');
    // console.log('....', path.resolve('./'))
    response.end('Hello world\n');
  }

  http.createServer(onRequest).listen(config.port);

  console.log(`服务已经启动：http://127.0.0.1:${config.port}`);
}

exports.start = start;
