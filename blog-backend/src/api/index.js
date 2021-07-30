const Router = require('koa-router');
const posts = require('./posts');

const api = new Router();

api.use('/posts', posts.routes());

// 라우터를 내보냄
module.exports = api;

/**
 * 
ctx 는 Context
- 웹 요청과 응답에 관한 정보를 가지고 있음.
next 
- next 는 현재 처리 중인 미들웨어의 다음 미들웨어를 호출 하는 함수
 */
